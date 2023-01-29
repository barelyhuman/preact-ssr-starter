import { pipe } from "@barelyhuman/pipe";
import { join } from "path";
import { h } from "preact";
import preactRenderToString from "preact-render-to-string";
import glob from "tiny-glob";

export default async function (app) {
  const viewsDir = join(app.currentDir, "views");

  const pagePaths = await glob(`${viewsDir}/**/*.{js}`, {
    filesOnly: true,
    absolute: true,
  });

  const register = async (viewPath) => {
    viewPath = viewPath.replace(viewsDir, "../views");

    let modToImport = await import(viewPath);
    modToImport = modToImport.default || modToImport;

    const params = viewPath.matchAll(/\[\w+\]/g);

    let route = viewPath.replace(/^\.\.\/views/, "");

    for (let i of params) {
      route = route.replace(
        i[0],
        ":" + i[0].replace(/^\[/, "").replace(/\]$/, "")
      );
    }

    route = route.replace(/\.js$/, "");
    route = route.replace(/index$/, "");

    if (modToImport.get) {
      app.$router.get(route, async (req, res) => {
        const data = await modToImport.get(req, res);
        res.setHeader("content-type", "text/html");
        res.write(preactRenderToString(h(modToImport.Page, { ...data })));
        res.end();
      });
    }
  };

  await pipe(pagePaths)
    .map(register)
    .to((x) => Promise.all(x))
    .run();
}
