import viewEngine from './modules/view-engine'
import staticAssets from './modules/static-assets'

export default function () {
  return [viewEngine, staticAssets].filter(x => typeof x == 'function')
}
