import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Main from './pages/Main'
import Error from './pages/Error'

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/agenda" component={Main} />
        <Route component={Error} />
      </Switch>
    </>
  )
}
