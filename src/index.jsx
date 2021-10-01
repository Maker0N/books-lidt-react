import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/extensions
import App from './components/App/App'
import store from './redux/store'

const target = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, target,
)
