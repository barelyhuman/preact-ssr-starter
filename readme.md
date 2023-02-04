# preact-ssr-starter

> **Note**: This is not official or supported by the official preact team

## Why?

It's the combination of all the ideas and tiny tools I've been working on. 
- httpengine (a smaller version of that is a part of this codebase)
- typeable (a on the fly type generator for objects)

The entire point is to keep it very simple for things where the tooling is not coupled to a framework 
and instead be fixable by yourself if needed. Hence the inline existence of both the routing engine and view engine.

It uses webpack to handle the development and build work, it might be a little slower 

## Highlights 
- Loosely coupled 
- File/Folder based routing 
- Purely SSR 
- Preact 
- GooberJS


## Usage 

1. Clone the repo.
2. Install the deps 
```sh
# install yarn if you don't have it 
npm i -g yarn 
yarn install
```
3. run the `dev` command for the dev server 
```sh
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


[MIT](/LICENSE)
