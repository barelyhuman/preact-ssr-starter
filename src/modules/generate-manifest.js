import { join } from 'path'
import { promises as fs } from 'fs'
import glob from 'tiny-glob'

export default async function (app) {
  if (app.env.NODE_ENV !== 'development') return
  const viewsDir = join(__dirname, '..', 'src', 'views')

  const pagePaths = await glob(`${viewsDir}/**/*.{js}`, {
    filesOnly: true,
  })

  const manifestPath = join(__dirname, '..', 'src', 'manifest.gen.js')
  let manifest = `${pagePaths
    .map(
      (path, ind) => `import * as View${ind} from '.${path.replace('src', '')}'`
    )
    .join(';\n')}`

  manifest += `\n;export const paths = {${pagePaths
    .map((path, ind) => `"${path}":View${ind}`)
    .join(',\n')}}`

  const exists = await fs.access(manifestPath, fs.F_OK).catch(_ => false)

  if (exists) return

  await fs.writeFile(manifestPath, manifest, 'utf8')
}
