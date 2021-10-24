import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../state/reducers/anecdoteReducer'
import { setNotification } from '../state/reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const handleNewAnecdote = async (event) => {
        event.preventDefault()
        const value = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.addAnecdote(value)
        props.setNotification(`New anecdote created: ${value}`, 5)
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification
  }
  
const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm
