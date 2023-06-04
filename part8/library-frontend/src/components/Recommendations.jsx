import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BooksWithGenre, GET_USER } from '../queries'

const Recommendations = () => {
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [getUser] = useLazyQuery(GET_USER)
  const [getBooks] = useLazyQuery(BooksWithGenre)

  useEffect(() => {
    getUser().then((res) => {
      console.log(res.data)
      setUser(res.data.me)
      getBooks({
        variables: { genre: res.data.me.favoriteGenre },
      }).then((res) => {
        console.log('books by genre ' + res)
        if (res.data) setBooks(res.data.allBooks)
      })
    })
  }, [])
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{' '}
        <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>
          {user.favoriteGenre}
        </span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommendations
