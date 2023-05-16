/* eslint-disable linebreak-style */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './NotificationContext'
import { BrowserRouter as Router } from 'react-router-dom'

store.subscribe(() => {
  console.log(store.getState())
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
  </React.StrictMode>
)
