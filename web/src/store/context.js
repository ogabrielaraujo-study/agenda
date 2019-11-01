import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

export const Provider = ({ children }) => {
  const initialState = {}

  const localState = JSON.parse(localStorage.getItem('@session'))
  const [session, setSession] = useState(localState || initialState)

  useEffect(() => {
    if (Object.entries(session).length === 0) {
      localStorage.setItem('@session', JSON.stringify(initialState))
    } else {
      localStorage.setItem('@session', JSON.stringify(session))
    }
  }, [session, initialState])

  return (
    <Context.Provider value={[session, setSession]}>
      {children}
    </Context.Provider>
  )
}
