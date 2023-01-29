import { app } from "./app";

app.engine.loadModules().onReady(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`up on ${PORT}`);
  });
});
