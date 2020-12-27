const { NodeVM } = require('vm2')

/**
 *
 * @param {string} untrusted
 */
function sanitize (untrusted) {
  try {
    const vm = new NodeVM({
      console: 'off',
      eval: false,
      wasm: false,
      sandbox: {
        Chart: require('chart.js')
      }
    })

    return vm.run(`module.exports = ${untrusted}`)
  } catch (err) {
    return new Error(`Invalid input\n${err}`)
  }
}

module.exports = sanitize
