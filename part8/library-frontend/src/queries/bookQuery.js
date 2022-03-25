import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query AllBooks($genres: [String!], $author: String) {
    allBooks(genres: $genres, author: $author) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        id
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
