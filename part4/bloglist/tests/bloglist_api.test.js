const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let testUser
let initialLenght

beforeAll(async () => {
    await User.deleteMany({})

    const newUser = await api.post('/api/users').send({
        username: 'tester',
        name: 'tester',
        password: 'salainen',
    })

    const auth = await api.post('/api/login').send({
        username: 'tester',
        password: 'salainen',
    })

    newUser.body.token = 'bearer ' + auth.body.token
    testUser = newUser.body
})

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObject.map((blog) => blog.save())
    await Promise.all(promiseArray)

    await api
        .post('/api/blogs')
        .set('Authorization', testUser.token)
        .send(helper.newBlog)
        .expect(201)

    blogs = await helper.blogsInDb()
    initialLenght = blogs.length
})

describe('blog api tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialLenght)
    })

    test('the unique identifier property of the returned blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    describe('blog post creation', () => {
        test('successfully creates a new blog post', async () => {
            await api
                .post('/api/blogs')
                .set('Authorization', testUser.token)
                .send(helper.newBlog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialLenght + 1)
        })

        test('content of the blog post is saved correctly', async () => {
            const response = await api
                .post('/api/blogs')
                .set('Authorization', testUser.token)
                .send(helper.newBlog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(
                blogsAtEnd.some((blog) => blog.id === response.body.id)
            ).toBe(true)
        })

        test('likes property is missing, it will default to the value 0', async () => {
            const response = await api
                .post('/api/blogs')
                .set('Authorization', testUser.token)
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
                .set('Authorization', testUser.token)
                .send(helper.missingTitleUrlBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialLenght)
        })

        test('token is missing, responds 401 Unauthorized', async () => {
            await api.post('/api/blogs').send(helper.newBlog).expect(401)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialLenght)
        })
    })

    describe('blog post deletes', () => {
        test('successfully deletes a blog post', async () => {
            const blog = await helper.validTesterBlog(testUser.id)
            await api
                .delete(`/api/blogs/${blog.id}`)
                .set('Authorization', testUser.token)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialLenght - 1)
        })
    })

    describe('blog post updates', () => {
        test('successfully updates a blog post likes', async () => {
            const blog = await helper.validTesterBlog(testUser.id)
            const response = await api
                .put(`/api/blogs/${blog.id}`)
                .set('Authorization', testUser.token)
                .send({ likes: 10 })
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            expect(
                blogsAtEnd.find((blog) => blog.id === response.body.id).likes
            ).toBe(10)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
