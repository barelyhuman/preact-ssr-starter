import viewEngine from './modules/view-engine'
import generateManifest from './modules/generate-manifest'
import addResponseHelpers from './modules/add-response-helpers'

export default function () {
  return [generateManifest, addResponseHelpers, viewEngine].filter(
    x => typeof x == 'function'
  )
}
