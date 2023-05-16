/* eslint-disable no-lone-blocks */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'create':
    return (state = {
      message: `blog ${action.payload} created`,
      cName: 'notify',
    })
  case 'like':
    return (state = {
      message: `blog ${action.payload} liked`,
      cName: 'notify',
    })
  case 'remove':
    return (state = {
      message: `blog ${action.payload} removed`,
      cName: 'notify',
    })
  case 'comment':
    return (state = {
      message: `blog ${action.payload} has new comment`,
      cName: 'notify',
    })
  case 'error':
    return (state = { message: action.payload, cName: 'error' })
  case 'clear':
    return (state = null)
  default:
    state = null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
