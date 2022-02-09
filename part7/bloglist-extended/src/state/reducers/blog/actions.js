export const SET_BLOGS = 'SET_BLOGS'
export const ALL_BLOGS = 'ALL_BLOGS'
export const NEW_BLOG = 'NEW_BLOG'
export const REMOVE_BLOG = 'REMOVE_BLOG'
export const ADD_BLOG_LIKE = 'ADD_BLOG_LIKE'
export const ADD_BLOG_COMMENT = 'ADD_BLOG_COMMENT'

export const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  data: blogs,
})

export const getBlogs = () => ({
  type: ALL_BLOGS,
})

export const addBlog = (blog) => ({
  type: NEW_BLOG,
  data: blog,
})

export const removeBlog = (blog) => ({
  type: REMOVE_BLOG,
  data: blog,
})

export const addLikeToBlog = (blog) => ({
  type: ADD_BLOG_LIKE,
  data: blog,
})

export const addCommentToBlog = (blog, comment) => ({
  type: ADD_BLOG_COMMENT,
  data: { blog, comment },
})
