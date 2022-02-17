import { useQuery } from '@apollo/client'
import { ALL_BOOKS_WITHOUT_GENRES } from '../queries/bookQuery'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS_WITHOUT_GENRES)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading authors...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
