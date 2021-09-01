const listHelper = require('../utils/list_helper')
const [emptyBlog, oneBlog, multipleBlogs] = [
    listHelper.emptyBlog,
    listHelper.oneBlog,
    listHelper.multipleBlogs,
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('favorite', () => {
    test('of empty list', () => {
        const result = listHelper.favoriteBlog(emptyBlog)
        expect(result).toEqual('none')
    })

    test('of one blog item', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of bigger list', () => {
        const result = listHelper.favoriteBlog(multipleBlogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
})

describe('most popular', () => {
    test('of empty list', () => {
        const result = listHelper.mostBlogs(emptyBlog)
        expect(result).toEqual('none')
    })

    test('of one blog item', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })

    test('of bigger list', () => {
        const result = listHelper.mostBlogs(multipleBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})

describe('most likes', () => {
    test('of empty list', () => {
        const result = listHelper.mostLikes(emptyBlog)
        expect(result).toEqual('none')
    })

    test('of one blog item', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of bigger list', () => {
        const result = listHelper.mostLikes(multipleBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})

describe('total likes', () => {
    test('of empty list', () => {
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })

    test('of one blog item', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(5)
    })

    test('of bigger list is calculated right', () => {
        const result = listHelper.totalLikes(multipleBlogs)
        expect(result).toBe(36)
    })
})
