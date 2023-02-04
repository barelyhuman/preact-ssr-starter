export function Page({ message }) {
  return <h1>{message}</h1>
}

export function get(req) {
  const { name } = req.params
  return {
    message: `${name}`,
  }
}
