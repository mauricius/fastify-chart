'use strict'

const http = require('http')

let handleRequest = null

const serverFactory = (handler, opts) => {
  handleRequest = handler

  return http.createServer()
}

const app = require('./app')({
  serverFactory,
  logger: process.env.NODE_ENV === 'development'
})

exports.fastifyChart = (req, res) => {
  app.ready(err => {
    if (err) throw err
    handleRequest(req, res)
  })
}
