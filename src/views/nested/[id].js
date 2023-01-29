export function Page({ message }) {
  return <h1>{message}</h1>;
}

export function get(req, res) {
  const { id } = req.params;
  return {
    message: `Hello ${id} + preact`,
  };
}
