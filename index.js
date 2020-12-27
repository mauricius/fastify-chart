'use strict'

const http = require('http')
const Fastify = require('fastify')

let handleRequest = null

const serverFactory = (handler, opts) => {
  handleRequest = handler

  return http.createServer()
}

const app = Fastify({
  serverFactory,
  logger: true
})

app.register(require('./routes.js'))

exports.fastifyChart = (req, res) => {
  app.ready(err => {
    if (err) throw err
    handleRequest(req, res)
  })
}
