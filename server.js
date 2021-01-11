'use strict'

require('dotenv').config()

const server = require('./app')({
  logger: true
})

server.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    server.log.error(err.message)
    process.exit(1)
  }
})
