'use strict'

const { render } = require('../lib/chart')

async function charts (instance, opts) {
  instance.route({
    method: 'GET',
    url: '/chart',
    schema: {
      querystring: require('../validation/querystring'),
      response: {
        200: {
          type: 'string'
        }
      }
    },
    handler: async (request, reply) => {
      const width = parseInt(request.query.width, 10)
      const height = parseInt(request.query.height, 10)
      const { c, bkg, dpr } = request.query

      try {
        const image = await render(width, height, bkg, dpr, c)

        reply
          .code(200)
          .header('Content-Type', 'image/png')
          .header('Content-Disposition', 'inline; filename="filename.png')
          .send(image)
      } catch (err) {
        reply
          .code(500)
          .send({
            error: err.message
          })
      }
    }
  })

  instance.route({
    method: 'POST',
    url: '/chart',
    schema: {
      body: require('../validation/body'),
      response: {
        200: {
          type: 'string'
        }
      }
    },
    handler: async (request, reply) => {
      const width = parseInt(request.body.width, 10)
      const height = parseInt(request.body.height, 10)
      const { c, bkg, dpr } = request.body

      try {
        const image = await render(width, height, bkg, dpr, c)

        reply
          .code(200)
          .header('Content-Type', 'image/png')
          .header('Content-Disposition', 'inline; filename="filename.png')
          .send(image)
      } catch (err) {
        reply
          .code(500)
          .send({
            error: err.message
          })
      }
    }
  })
}

module.exports = charts
