import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

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
      }
    ]
  }
])

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider  client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)