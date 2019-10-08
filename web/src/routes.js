import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import GlobalStyle from './styles/global'

import Welcome from './components/Welcome'
import Main from './components/Main'
import Error from './components/Error'

const account = false

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/agenda" component={Main} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>

      <GlobalStyle />
    </>
  )
}
