import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'

import { BOOK_ADDED, ALL_BOOKS } from './queries/bookQuery'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

// function that takes care of manipulating cache
export const updateBooksCache = (cache, addedBook) => {
  const uniqByTitle = (books) => {
    let seen = new Set()
    return books.filter((book) => {
      let title = book.title
      return seen.has(title) ? false : seen.add(title)
    })
  }

  // Update all books cache
  cache.updateQuery(
    { query: ALL_BOOKS, variables: { genres: null } },
    (data) => {
      if (!data) return
      return {
        allBooks: uniqByTitle(data.allBooks.concat(addedBook)),
      }
    }
  )

  if (!addedBook.genres) return

  // Update genre specific cache
  addedBook.genres.forEach((genre) => {
    cache.updateQuery(
      { query: ALL_BOOKS, variables: { genres: genre } },
      (data) => {
        if (!data) return
        return { allBooks: data.allBooks.concat(addedBook) }
      }
    )
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)

      updateBooksCache(client.cache, addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <span>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Recommendations show={page === 'recommend'} />

      <BookForm show={page === 'add'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
