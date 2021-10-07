import anecdoteService from '../../services/anecdotes'

const sortByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => (a.votes <= b.votes ? 1 : -1))
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return sortByVotes(action.data)
        case 'ADD_VOTE':
            const id = action.data.id
            const newAnecdote = action.data
            return sortByVotes(
                state.map((anecdote) =>
                    anecdote.id === id ? newAnecdote : anecdote
                )
            )
        case 'ADD_ANECDOTE':
            return [...state, action.data]
        default:
            return state
    }
}

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export const addVote = (anecdote) => {
    return async (dispatch) => {
        const data = await anecdoteService.addVoteToAnecdote(anecdote)
        dispatch({
            type: 'ADD_VOTE',
            data: data,
        })
    }
}

export const addAnecdote = (value) => {
    return async (dispatch) => {
        const data = await anecdoteService.createNew(value)
        dispatch({
            type: 'ADD_ANECDOTE',
            data: data,
        })
    }
}

export default reducer
