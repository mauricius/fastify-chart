const packageJson = require('../package.json')

async function home (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return {
      success: true,
      name: packageJson.name,
      version: packageJson.version
    }
  })
}

module.exports = home
