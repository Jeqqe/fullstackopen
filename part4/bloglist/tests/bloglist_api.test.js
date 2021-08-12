const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObject.map((blog) => blog.save())
    await Promise.all(promiseArray)
})

describe('api tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property of the returned blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('successfully creates a new blog post', async () => {
        await api.post('/api/blogs').send(helper.newBlog).expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('content of the blog post is saved correctly', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toContainEqual(response.body)
    })

    test('likes property is missing, it will default to the value 0', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.missingLikesBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        expect(
            blogsAtEnd.find((blog) => blog.id === response.body.id).likes
        ).toBe(0)
    })

    test('title and url properties are missing, responds 400 Bad Request', async () => {
        await api
            .post('/api/blogs')
            .send(helper.missingTitleUrlBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
