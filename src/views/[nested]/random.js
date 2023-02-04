export function Page({ message }) {
  return <h1>{message}</h1>
}

export function get(req) {
  const { nested } = req.params
  return {
    message: `Hello ${nested} + preact, from ${req.headers.host}`,
  }
}
