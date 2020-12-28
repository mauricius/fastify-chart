'use strict'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

const build = require('../app')

test('GET /', async () => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  const body = JSON.parse(response.body)

  assert.is(response.statusCode, 200)
  assert.is(body.success, true)
})

test('GET /chart - c is required', async () => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/chart'
  })

  const body = JSON.parse(response.body)

  assert.is(response.statusCode, 400)
  assert.is(body.message, "querystring should have required property 'c'")
})

test('GET /chart', async () => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/chart',
    query: {
      c: "{type: 'bar', data: { datasets: [{label: 'test', data: [50,60,70,180,190]}]}}"
    }
  })

  assert.is(response.statusCode, 200)
  assert.is(response.headers['content-type'], 'image/png')
  assert.is(response.headers['content-disposition'], 'inline; filename="filename.png')
})

test.run()
