import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Welcome from './components/Welcome'
import Main from './components/Main'
import Error from './components/Error'

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
