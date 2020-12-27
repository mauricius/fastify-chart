'use strict'

require('dotenv').config()

const app = require('fastify')({
  logger: true,
  pluginTimeout: 10000
})

app.register(require('./routes.js'))

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    app.log.error(err.message)
    process.exit(1)
  }
})
