const { nodeResolve } = require("@rollup/plugin-node-resolve");
const glob = require("tiny-glob");
const { join } = require("path");
const pkg = require("./package.json");
const esbuild = require("rollup-plugin-esbuild").default;
const { pipe } = require("@barelyhuman/pipe");

const getGlobs = ["./src/**/*.{js,jsx}"].map(async (x) => await glob(x));

const getConfig = (input, output, { isFile } = {}) => {
  return {
    input: [input],
    external: [Object.keys(pkg.dependencies)],
    plugins: [
      esbuild({
        platform: "node",
        target: "node14",
        jsx: "automatic",
        jsxFactory: "h",
        jsxImportSource: "preact",
        format: "cjs",
        tsconfig: "jsconfig.json",
        loaders: {
          ".js": "jsx",
        },
      }),
      nodeResolve({
        preferBuiltins: true,
      }),
    ],
    output: [
      isFile
        ? {
            file: output,
            format: "cjs",
            exports: "named",
            preserveModules: false,
          }
        : {
            dir: output,
            format: "cjs",
            exports: "named",
            preserveModules: true,
          },
    ],
  };
};

const build = async (entryPoint) => {
  const rootFolder = "src";

  let outFile = join(
    "dist",
    entryPoint.replace(new RegExp("^" + rootFolder), "")
  );

  outFile =
    (outFile.endsWith(".jsx") && outFile.replace(/\.jsx$/, ".js")) || outFile;

  return getConfig(entryPoint, outFile, { isFile: true });
};

module.exports = async function () {
  const items = await pipe(getGlobs)
    .to((x) => Promise.all(x))
    .to((d) => d.reduce((acc, item) => acc.concat(item), []))
    .to((globs) => Promise.all(globs.map(build)))
    .run();

  return [...items];
};
