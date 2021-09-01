const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
]

const validTesterBlog = async (userID) => {
    const blogs = await blogsInDb()
    return blogs.find((blog) => {
        if (JSON.stringify(blog.user) === JSON.stringify(userID)) {
            return blog
        }
    })
}

const newBlog = {
    title: 'Star patterns',
    author: 'Bob Williams',
    url: 'https://starpatterns.com/',
    likes: 2,
}

const missingLikesBlog = {
    title: 'Star patterns',
    author: 'Bob Williams',
    url: 'https://starpatterns.com/',
}

const missingTitleUrlBlog = {
    author: 'Bob Williams',
    likes: 2,
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

module.exports = {
    initialBlogs,
    validTesterBlog,
    newBlog,
    missingLikesBlog,
    missingTitleUrlBlog,
    blogsInDb,
    usersInDb,
}
