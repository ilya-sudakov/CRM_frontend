const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, './resources/static/built')))

app.get('*/firebase-messaging-sw.js', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, './resources/templates/firebase-messaging-sw.js'),
  )
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './resources/static/built/index.html'))
})

module.exports = app
