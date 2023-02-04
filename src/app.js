import { createTypeable } from '@barelyhuman/typeable'
import express from 'express'
import bodyParser from 'body-parser'
import Engine from './engine/engine'
import modules from './modules'

const expressApp = express()
const router = new express.Router()
const _app = createTypeable(expressApp, {
  rootInterfaceName: 'App',
  outfile: 'app.d.ts',
})

expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())

const engine = new Engine({
  modules,
  initializer() {
    _app.$router = router
    return _app
  },
  options: {
    currentDir: __dirname,
    env: {
      NODE_ENV: process.env.NODE_ENV,
    },
  },
})

/**
 * @type {import("../app").App}
 */

export const app = engine.app

engine.onReady(() => {
  app.use(router)
})
