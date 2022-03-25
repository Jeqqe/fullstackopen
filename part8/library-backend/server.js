require('dotenv').config()
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')

const Book = require('./schemas/book')
const Author = require('./schemas/author')
const User = require('./schemas/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SOME_KEY'

console.log('connecting to', process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String!]): [Book!]!
    recommendedBooks: [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const bookAmount = await Book.count()
      return bookAmount
    },
    authorCount: async () => {
      const authorAmount = await Author.count()
      return authorAmount
    },
    allBooks: async (root, args) => {
      let resultBooks = await Book.find({}).populate('author')
      resultBooks = resultBooks.filter((book) => book.author !== null)

      if (args.author) {
        resultBooks = resultBooks.filter(
          (book) => book.author.name === args.author
        )
      }

      if (args.genres) {
        resultBooks = resultBooks.filter((book) =>
          book.genres.some((genres) => genres.includes(args.genres))
        )
      }

      return resultBooks
    },
    recommendedBooks: async (root, args, context) => {
      const user = context.currentUser
      const userGenres = user.favoriteGenre

      let resultBooks = await Book.find({}).populate('author')
      resultBooks = resultBooks.filter((book) => book.author !== null)

      resultBooks = resultBooks.filter((book) =>
        book.genres.some((genres) => genres.includes(userGenres))
      )

      return resultBooks
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => {
      let genres = []
      const allBooks = await Book.find({})
      allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) genres.push(genre)
        })
      })
      return genres
    },
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(`You must be logged in to add new books.`)
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        if (args.author.length < 4) {
          throw new UserInputError(
            `Author name must be longer than 3 characters.`
          )
        }
        author = new Author({ name: args.author, id: uuid() })
      }

      const book = new Book({ ...args, author: author, id: uuid() })
      const foundBook = await Book.findOne({ title: args.title })

      if (foundBook) {
        throw new UserInputError(
          `Book title must be unique. ${args.title} already exists.`
        )
      }

      if (args.title.length < 2) {
        throw new UserInputError(`Book title must be longer than 1 character.`)
      }

      try {
        await book.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(`You must be logged in to edit authors.`)
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
