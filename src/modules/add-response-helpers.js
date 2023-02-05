export default function (app) {
  app.server.use((_, res, next) => {
    res.redirect = function (url) {
      res.writeHead(302, {
        Location: url,
        // add other headers here...
      })
      res.end()
    }
    next()
  })
}
