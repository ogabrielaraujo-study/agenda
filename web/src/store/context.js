import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

export const Provider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem('@session'))
  const [session, setSession] = useState(localState || {})

  useEffect(() => {
    localStorage.setItem('@session', JSON.stringify(session))
  }, [session])

  return (
    <Context.Provider value={[session, setSession]}>
      {children}
    </Context.Provider>
  )
}
