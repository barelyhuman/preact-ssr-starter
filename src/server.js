import { app } from './app'

app.engine.loadModules().onReady(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`up on ${PORT}`)
  })
})
