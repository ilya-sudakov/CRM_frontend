import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import { App } from '../src/App.js'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration)
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err)
    })
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
