import { useQuery } from '@apollo/client'
import { USER_RECOMMENDATIONS } from '../queries/userQuery'

const Recommendations = ({ show }) => {
  const result = useQuery(USER_RECOMMENDATIONS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading recommendations...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>patterns</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.recommendedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
