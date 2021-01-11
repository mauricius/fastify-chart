module.exports = {
  type: 'object',
  required: ['c'],
  properties: {
    bkg: {
      type: 'string',
      enum: ['white', 'black', 'transparent'],
      default: 'white'
    },
    width: {
      type: 'integer',
      minimum: 300,
      maximum: process.env.CHART_MAX_WIDTH || 3000,
      default: 300
    },
    height: {
      type: 'integer',
      minimum: 200,
      maximum: process.env.CHART_MAX_HEIGHT || 3000,
      default: 300
    },
    dpr: {
      type: 'integer',
      minimum: 1,
      maximum: 2,
      default: 2
    },
    c: {
      type: 'object',
      required: ['type', 'data'],
      properties: {
        type: {
          type: 'string',
          enum: ['bar']
        },
        data: {
          type: 'object'
        }
      }
    }
  }
}
