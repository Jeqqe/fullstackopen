const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs,
    newBlog,
    missingLikesBlog,
    missingTitleUrlBlog,
    blogsInDb,
}
