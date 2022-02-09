import {
  addBlogLikeToDatabase,
  addBlogCommentToDatabase,
  addNewBlogToDatabase,
  getAllBlogsFromDatabase,
  removeBlogFromDatabase,
} from '../../../services/blogService'
import * as actions from './actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.SET_BLOGS:
      return action.data
    case actions.ALL_BLOGS:
      return state
    case actions.NEW_BLOG:
      return [...state, action.data]
    case actions.REMOVE_BLOG:
      return state.filter((blog) => blog.id !== action.data.id)
    case actions.ADD_BLOG_LIKE:
      return state.map((blog) => {
        if (blog.id === action.data.id) {
          return { ...blog, likes: blog.likes + 1 }
        }
        return blog
      })
    case actions.ADD_BLOG_COMMENT:
      return state.map((blog) => {
        if (blog.id === action.data.blog.id) {
          return { ...blog, comments: [...blog.comments, action.data.comment] }
        }
        return blog
      })
    default:
      return state
  }
}

export const loadBlogs = () => async (dispatch) => {
  const blogs = await getAllBlogsFromDatabase()
  dispatch(actions.setBlogs(blogs))
}

export const addNewBlog = (blog) => async (dispatch) => {
  const newBlog = await addNewBlogToDatabase(blog)
  dispatch(actions.addBlog(newBlog.data))
}

export const removeBlog = (blog) => async (dispatch) => {
  await removeBlogFromDatabase(blog)
  dispatch(actions.removeBlog(blog))
}

export const addLikeToBlog = (blog) => async (dispatch) => {
  const updatedBlog = await addBlogLikeToDatabase(blog)
  dispatch(actions.addLikeToBlog(updatedBlog.data))
}

export const addCommentToBlog = (blog, comment) => async (dispatch) => {
  await addBlogCommentToDatabase(blog, comment)
  dispatch(actions.addCommentToBlog(blog, comment))
}

export default reducer
