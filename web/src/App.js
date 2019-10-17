import React from 'react'

import { Provider } from './store/context'

import { Router } from 'react-router-dom'
import Routes from './routes'
import history from './services/history'

import GlobalStyle from './styles/global'

export default function App() {
  return (
    <Provider>
      <Router history={history}>
        <Routes />

        <GlobalStyle />
      </Router>
    </Provider>
  )
}
