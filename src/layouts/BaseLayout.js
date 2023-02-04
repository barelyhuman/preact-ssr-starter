import { h } from 'preact'
import { extractCss, setup } from 'goober'

setup(h)

export default function BaseLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{extractCss()}</style>
          <link rel="stylesheet" href="/pico.min.css" />
          <link rel="stylesheet" href="/global.css" />
        </head>
        <body>
          <main class="container">{children}</main>
        </body>
      </html>
    </>
  )
}
