import { useMutation, useQuery } from '@apollo/client'
import React, { useRef, useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'
import { capitalizeFirstLetter } from '../utils/stringUtils'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  console.log('results:', result)
  const nameRef = useRef(null)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  const onUpdateAuthor = (event) => {
    event.preventDefault()
    console.log(
      'nameRef',
      nameRef !== null ? nameRef.current?.getValue()[0].value : nameRef
    )
    if (nameRef !== null) {
      updateAuthor({
        variables: {
          name: nameRef.current?.getValue()[0].value,
          setBornTo: Number(born),
        },
        refetchQueries: [{ query: ALL_AUTHORS }],
      })
    }
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      {result.loading && <div>Loading...</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!result.loading &&
            result.data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />
      <div>
        <form onSubmit={onUpdateAuthor}>
          <div style={{ width: '210px' }}>
            <label htmlFor="name">name</label>
            {/* <input type="text" name="name" id="name" value={name} onChange={(event) => {setName(event.target.value)}}/> */}
            <Select
              ref={nameRef}
              className="basic-single"
              classNamePrefix="select"
              defaultValue={
                result.data
                  ? {
                      value: result.data.allAuthors[0].name,
                      label: capitalizeFirstLetter(
                        result.data.allAuthors[0].name
                      ),
                    }
                  : null
              }
              name="name"
              options={
                result.data
                  ? result.data.allAuthors.map((author) => {
                      return {
                        value: author.name,
                        label: capitalizeFirstLetter(author.name),
                      }
                    })
                  : []
              }
            />
          </div>
          <div>
            <label htmlFor="born">born</label>
            <input
              type="number"
              name="born"
              id="born"
              value={born}
              onChange={(event) => {
                setBorn(event.target.value)
              }}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
