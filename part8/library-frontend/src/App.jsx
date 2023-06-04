import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { TokenContext, TokenDispatchContext } from './providers/TokenProvider'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const token = useContext(TokenContext)
  const dispatch = useContext(TokenDispatchContext)
  const navigate = useNavigate()
  const client = useApolloClient()
  console.log('token', token)

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
