import * as actions from './actions'

const reducer = (state = null, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return action.data
    case actions.REMOVE_USER:
      return null
    default:
      return state
  }
}

export const setUser = (user) => async (dispatch) => {
  dispatch(actions.setUser(user))
}

export const removeUser = () => async (dispatch) => {
  dispatch(actions.removeUser())
}

export default reducer
