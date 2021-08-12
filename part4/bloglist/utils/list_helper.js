const { toPairs, reverse } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((prev, curr) => {
        return prev + curr.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 'none'

    const blog = blogs.reduce((prev, curr) => {
        return prev.likes >= curr.likes ? prev : curr
    })

    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 'none'

    const [author, blogAmount] = _(blogs)
        .countBy((blog) => blog.author)
        .toPairs()
        .sortBy((blog) => blog[1])
        .reverse()
        .value()[0]

    return {
        author,
        blogs: blogAmount,
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 'none'

    return _(blogs)
        .groupBy('author')
        .map((authorBlogs, author) => ({
            author: author,
            likes: _.sumBy(authorBlogs, 'likes'),
        }))
        .sortBy((author) => author.likes)
        .reverse()
        .value()[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
