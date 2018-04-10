import React from 'react'
import ReactDOM from 'react-dom'
import App from './layout'

let __DATA = {}
if (process.env.NODE_ENV !== 'production') {
  const data = require('@data').default
  __DATA = data
}

ReactDOM.render(
  <App data={__DATA}/>,
  document.getElementById('app'),
)
