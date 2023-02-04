import { h } from 'preact'
import { extractCss, setup } from 'goober'
import globalCSS from '../static/global.css'
import picoCSS from '../static/pico.min.css'

setup(h)

export default function BaseLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`${globalCSS}`} />
          <link rel="stylesheet" href={`${picoCSS}`} />
          <style>{extractCss()}</style>
        </head>
        <body>
          <main class="container">{children}</main>
        </body>
        <script src="http://localhost:35729/livereload.js"></script>
      </html>
    </>
  )
}
