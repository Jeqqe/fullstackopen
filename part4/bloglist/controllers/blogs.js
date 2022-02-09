const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: 'invalid access, you are not the owner of this content',
    })
  }

  blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  const body = request.body

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: 'invalid access, you are not the owner of this content',
    })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(updatedBlog)
})

blogsRouter.put('/:id/likes', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.likes += 1

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  blog.comments = [...blog.comments, body.newComment]

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter
