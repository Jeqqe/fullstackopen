import * as actions from './actions'

import { getAllUsersFromDatabase } from '../../../services/userService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.SET_ALL_USERS:
      return action.data
    default:
      return state
  }
}

export const loadUsers = () => async (dispatch) => {
  const allUsers = await getAllUsersFromDatabase()
  dispatch(actions.setAllUsers(allUsers))
}

export default reducer
