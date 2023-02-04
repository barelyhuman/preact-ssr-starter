import { join } from 'path'
import { pipe } from '@barelyhuman/pipe'
import { h } from 'preact'
import preactRenderToString from 'preact-render-to-string'
import glob from 'tiny-glob'

export default async function (app) {
  const viewsDir = join(app.currentDir, 'views')

  const pagePaths = await glob(`${viewsDir}/**/*.{js}`, {
    filesOnly: true,
  })

  const register = async (viewPath) => {
    viewPath = viewPath.replace('src/views/', '')

    let modToImport = await import(`../views/${viewPath.replace('.js', '')}.js`)
    modToImport = modToImport.default || modToImport

    const params = viewPath.matchAll(/\[\w+\]/g)
    let route = viewPath

    for (const i of params) {
      route = route.replace(
        i[0],
        `:${i[0].replace(/^\[/, '').replace(/\]$/, '')}`,
      )
    }

    route = route.replace(/\.js$/, '')
    route = route.replace(/index$/, '')

    if (modToImport.get) {
      app.$router.get(`/${route}`, async (req, res) => {
        const data = await modToImport.get(req, res)
        res.setHeader('content-type', 'text/html')
        res.write(preactRenderToString(h(modToImport.Page, { ...data })))
        res.end()
      })
    }

    if (modToImport.post) {
      app.$router.post(route, async (req, res) => {
        const data = await modToImport.post(req, res)
        if (!data)
          return

        res.setHeader('content-type', 'text/html')
        res.write(preactRenderToString(h(modToImport.Page, { ...data })))
        res.end()
      })
    }
  }

  await pipe(pagePaths)
    .map(register)
    .to(x => Promise.all(x))
    .run()
}
