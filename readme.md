# preact-ssr-starter

> **Note**: This is not official or supported by the official preact team

## Why?

It's the combination of all the ideas and tiny tools I've been working on.

- httpengine (a smaller version of that is a part of this codebase)
- typeable (a on the fly type generator for objects)

The entire point is to keep it very simple for things where the tooling is not
coupled to a framework and instead be fixable by yourself if needed. Hence the
inline existence of both the routing engine and view engine.

It uses webpack to handle the development and build work, it might be a little
slower

## Highlights

- Loosely coupled
- File/Folder based routing
- Pure and Simple SSR, no magic, it's all DIY[^1]
- Preact
- GooberJS

[^1]:
    other than the auto-generated types in `app.d.ts` which is handled by a
    subset library, and can be disabled, but in a full fledged app where you
    might add in helpers for email etc, it's good to have some form of
    intellisense.

The entire thing is based on tools that can be curated and used with anything that you already use. You might not need 
this starter altogether considering all the options you have today. Astro, nextjs but lately, or more specifically while writing and fixing 
tillwhen I realised that no matter how much the project is maintained if it's a big complex blob then the breaking changes pushes you back. 

Example, 
It's not preact's job to support next, nor is it's next's job to make sure preact works with their framework but I've gotten used to 
having it as the view layer for my projects and instead of re-writing the whole app I settled to just upgrading next to 13 and working 
with react. 

This is where this repo comes into picture. Frameworks are great, getting tied down to them, not so much (At least for me). 

## Usage

1. Clone the repo.
2. Install the deps

```sh
# install yarn if you don't have it
npm i -g yarn
yarn install
```

3. run the `dev` and `watch` command for the dev server

```sh
yarn watch
yarn dev
```

4. run the `build` command to create a production build

```sh
yarn build
```

5. run the `start` command for running the production build

```sh
yarn start
```

## Troubleshooting

#### `Could not resolve "../manifest.gen.js"`

Rollup will stop bundling if this file isn't found even though it's a dynamic
import, this was avoidable with webpack but then webpack requires configuration
which would get hard to maintain over time,so it's easier to just add this file.

Just create a `manifest.gen.js` file in the `src` folder. if on linux, run this
from the root of the project

```sh
$ touch src/manifest.gen.ts
```

[MIT](/LICENSE)
