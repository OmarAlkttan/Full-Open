import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, BooksWithGenre } from '../queries'

const Books = () => {
  const getAllBookData = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const getGenreData = useQuery(BooksWithGenre, { variables: { genre: genre } })
  const [genres, setGenres] = useState(new Set())
  const [genreFlag, setGenreFlag] = useState(false)

  console.log('genre', genre)
  console.log('genres', genres)

  useEffect(() => {
    if (getAllBookData.data) {
      const temp = new Set()
      getAllBookData.data.allBooks.map((book) =>
        book.genres.map((genre) => temp.add(genre))
      )
      setGenres(temp)
    }
  }, [getAllBookData.data])

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
          {!genreFlag
            ? getAllBookData.data &&
              getAllBookData.data.allBooks.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : getGenreData.data &&
              getGenreData.data.allBooks.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        <>
          {Array.from(genres).map((g) => {
            return (
              <button
                key={g}
                onClick={() => {
                  setGenre(g)
                  setGenreFlag(true)
                }}
              >
                {g}
              </button>
            )
          })}
          <button
            onClick={() => {
              setGenreFlag(false)
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
