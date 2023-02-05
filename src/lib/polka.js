import polka from 'polka'

const Polka = polka().constructor

const polkaApp = new Polka()

polkaApp.listen = polkaApp.listen.bind(polkaApp)
polkaApp.use = polkaApp.use.bind(polkaApp)
polkaApp.add = polkaApp.add.bind(polkaApp)
polkaApp.handler = polkaApp.handler.bind(polkaApp)
polkaApp.get = polkaApp.get.bind(polkaApp)
polkaApp.post = polkaApp.post.bind(polkaApp)

export default polkaApp
