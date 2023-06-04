import React, { createContext, useReducer } from "react";

export const TokenContext = createContext(null);
export const TokenDispatchContext = createContext(null);

export function TokenProvider({ children }) {
  const [token, dispatch] = useReducer(
    tokenReducer,
    localStorage.getItem('token')
  );

  return (
    <TokenContext.Provider value={token}>
      <TokenDispatchContext.Provider value={dispatch}>
        {children}
      </TokenDispatchContext.Provider>
    </TokenContext.Provider>
  )
}

function tokenReducer(token, action) {
  switch (action.type) {
    case 'add': {
      localStorage.setItem('token', action.payload);
      return token = action.payload
    }
    case 'delete': {
      localStorage.clear();
      token = null
      break;
    }
    default: {
      throw Error('Unknown action ' + action.type);
    }
  }
}