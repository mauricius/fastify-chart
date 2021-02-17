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

app.addContentTypeParser('application/json', {}, (req, body, done) => {
  done(null, body.body);
});

exports.fastifyChart = (req, res) => {
  app.ready(err => {
    if (err) throw err
    handleRequest(req, res)
  })
}
