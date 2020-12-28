'use strict'

const fastify = require('fastify')

function build (opts = {}) {
  const app = fastify(opts)

  app.register(require('./routes.js'))

  return app
}

module.exports = build
