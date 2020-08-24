import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  )
}