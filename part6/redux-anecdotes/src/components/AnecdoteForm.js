import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../state/reducers/anecdoteReducer'
import { setNotification } from '../state/reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleNewAnecdote = async (event) => {
        event.preventDefault()
        const value = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(addAnecdote(value))
        dispatch(setNotification(`New anecdote created: ${value}`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
