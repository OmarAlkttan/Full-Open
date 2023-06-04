import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, BooksWithGenre } from '../queries'

const Books = () => {
  const [getAllBookData] = useLazyQuery(ALL_BOOKS)
  const [allBooks, setAllBooks] = useState([])
  const [getData] = useLazyQuery(BooksWithGenre)
  const [genres, setGenres] = useState(new Set())

  useEffect(() => {
    getAllBookData().then((res) => {
      console.log('res', res)
      setAllBooks(res.data.allBooks)
      const temp = new Set()
      res.data.allBooks.map((book) =>
        book.genres.map((genre) => temp.add(genre))
      )
      setGenres(temp)
    })
  }, [])

  return (
    <div>
      <h2>books</h2>
      {/* {result.loading && <div>Loading...</div>} */}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <>
          {Array.from(genres).map((genre) => {
            return (
              <button
                key={genre}
                onClick={() => {
                  getData({
                    variables: { genre: genre },
                  }).then((res) => {
                    console.log('books by genre ' + res)
                    if (res.data) setAllBooks(res.data.allBooks)
                  })
                }}
              >
                {genre}
              </button>
            )
          })}
          <button
            onClick={() => {
              getAllBookData().then((res) => {
                if (res.data) setAllBooks(res.data.allBooks)
              })
            }}
          >
            all genres
          </button>
        </>
      </div>
    </div>
  )
}

export default Books
