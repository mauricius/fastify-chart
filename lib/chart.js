const { CanvasRenderService } = require('chartjs-node-canvas')

/**
 *
 * @param {*} scales
 */
function applyScales (scales) {
  if (!scales) {
    return {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return scales
}

function render (width, height, backgroundColor, devicePixelRatio, untrustedChart) {
  let chart = null

  if (typeof untrustedChart === 'string') {
    chart = require('./sanitizer')(untrustedChart)
  } else {
    chart = untrustedChart
  }

  chart.options = chart.options || {}
  chart.plugins = []
  chart.options.devicePixelRatio = devicePixelRatio

  if (chart.type === 'bar') {
    chart.options.scales = applyScales(chart.options.scales)
  }

  chart.plugins.push({
    id: 'background',
    beforeDraw: chartInstance => {
      if (backgroundColor) {
        const { chart } = chartInstance
        const { ctx } = chart
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, chart.width, chart.height)
      }
    }
  })

  const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { })

  if (process.env.NODE_ENV === 'development') {
    console.log(chart)
  }

  return canvasRenderService.renderToBuffer(chart)
}

module.exports = {
  render
}
