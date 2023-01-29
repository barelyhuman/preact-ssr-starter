import { h } from "preact";
import { extractCss, setup } from "goober";

setup(h);

export default function BaseLayout({ children }) {
  return (
    <html>
      <head>
        <style>{extractCss()}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
