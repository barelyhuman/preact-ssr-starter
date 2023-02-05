import { createTypeable } from '@barelyhuman/typeable'
import bodyParser from 'body-parser'

import Engine from './engine/engine'
import polka from './lib/polka'
import modules from './modules'

const baseApp = {}

const _app = createTypeable(baseApp, {
  rootInterfaceName: 'App',
  outfile: 'app.d.ts',
})

polka.use(bodyParser.urlencoded({ extended: true }))
polka.use(bodyParser.json())

const engine = new Engine({
  modules,
  initializer() {
    _app.server = polka
    _app.$router = polka
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
