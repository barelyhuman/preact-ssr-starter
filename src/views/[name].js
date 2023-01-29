export function Page({ message }) {
  return <h1>{message}</h1>;
}

export function get(req, res) {
  const { name } = req.params;
  return {
    message: `Hello ${name} + preact`,
  };
}
