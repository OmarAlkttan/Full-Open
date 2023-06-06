import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { TokenContext, TokenDispatchContext } from './providers/TokenProvider'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, BooksWithGenre } from './queries'
import { Toaster, toast } from 'react-hot-toast'
import { updateCache, updateGenreCache } from './utils/cache'

const App = () => {
  const token = useContext(TokenContext)
  const dispatch = useContext(TokenDispatchContext)
  const navigate = useNavigate()
  const client = useApolloClient()
  console.log('token', token)
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('data', data.data.bookAdded)
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateGenreCache(
        client.cache,
        { query: BooksWithGenre, vaiables: { genre: addedBook.genre } },
        addedBook
      )
      if (data.data)
        toast.success('new book added: ' + data.data.bookAdded.title, {
          duration: 3000,
        })
    },
  })

  const onLogout = () => {
    if (window.confirm('Are you sure you want to log out')) {
      dispatch({
        type: 'delete',
      })
      client.resetStore()
      navigate('/login')
    }
  }

  return (
    <div>
      <div>
        <Toaster></Toaster>
      </div>
      <div>
        <button>
          <Link to={'authors'} replace>
            authors
          </Link>
        </button>
        <button>
          <Link to={'books'} replace>
            books
          </Link>
        </button>
        {token ? (
          <>
            <button>
              <Link to={'newBook'} replace>
                add book
              </Link>
            </button>
            <button>
              <Link to={'recommend'} replace>
                recommend
              </Link>
            </button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button>
            <Link to={'login'} replace>
              login
            </Link>
          </button>
        )}
      </div>

      <Outlet />
    </div>
  )
}

export default App
