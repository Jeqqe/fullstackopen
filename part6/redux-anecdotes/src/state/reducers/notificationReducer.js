const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = (message, delay) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message },
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, delay * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}

export default reducer
