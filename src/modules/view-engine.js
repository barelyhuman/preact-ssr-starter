import { pipe } from '@barelyhuman/pipe'
import { h } from 'preact'
import preactRenderToString from 'preact-render-to-string'

/** @param {import("../../app").App} app */
export default async function (app) {
  const manifest = await import('../manifest.gen.js')
  const manifestPaths = manifest.paths

  const register = async viewPath => {
    const modToImport = manifestPaths[viewPath]

    viewPath = viewPath.replace('src/views/', '')

    const params = viewPath.matchAll(/\[\w+\]/g)
    let route = viewPath

    for (const i of params) {
      route = route.replace(
        i[0],
        `:${i[0].replace(/^\[/, '').replace(/\]$/, '')}`
      )
    }

    route = route.replace(/\.js$/, '')
    route = route.replace(/index$/, '')

    app.$router.get(`/${route}`, async (req, res) => {
      let data = {}
      if (modToImport.get) data = await modToImport.get(req, res)

      res.setHeader('content-type', 'text/html')
      res.write(preactRenderToString(h(modToImport.Page, { ...data })))
      res.end()
    })

    if (modToImport.post) {
      app.$router.post(`/${route}`, async (req, res) => {
        const data = await modToImport.post(req, res)
        if (!data) return

        res.setHeader('content-type', 'text/html')
        res.write(preactRenderToString(h(modToImport.Page, { ...data })))
        res.end()
      })
    }
  }

  await pipe(Object.keys(manifestPaths))
    .map(register)
    .to(x => Promise.all(x))
    .run()
}
