import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'

import App from './App'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { TokenProvider } from './providers/TokenProvider'
import Recommendations from './components/Recommendations'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'authors',
        element: <Authors />
      },
      {
        path: 'books',
        element: <Books />
      },
      {
        path: 'newBook',
        element: <NewBook />
      },
      {
        path: 'recommend',
        element: <Recommendations />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </ApolloProvider>
)