'use strict'

module.exports = async function (fastify, opts) {
  fastify.register(require('./routes/home'))

  fastify.register(require('./routes/charts'))
}
