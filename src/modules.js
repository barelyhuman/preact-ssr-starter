import viewEngine from './modules/view-engine'
import staticAssets from './modules/static-assets'
import generateManifest from './modules/generate-manifest'

export default function () {
  return [generateManifest, staticAssets, viewEngine].filter(x => typeof x == 'function')
}
