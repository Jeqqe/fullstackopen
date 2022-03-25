import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries/bookQuery'

const Books = (props) => {
  const [currentGenre, setCurrentGenre] = useState(null)

  let allGenresResult = useQuery(ALL_GENRES, {
    genres: [currentGenre],
  })

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      genres: currentGenre,
    },
  })

  if (!props.show) {
    return null
  }

  if (loading) return <div>Loading books...</div>
  if (error) console.log(error)

  if (allGenresResult.loading) {
    return <div>Loading genres...</div>
  }

  const selectGenre = (genre) => {
    setCurrentGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>patterns</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {data.allBooks.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {allGenresResult.data.allGenres.map((genre) => {
        return (
          <button key={genre} onClick={() => selectGenre(genre)}>
            {genre}
          </button>
        )
      })}
    </div>
  )
}

export default Books
