import PageTitle from "../components/PageTitle";
import BaseLayout from "../layouts/BaseLayout";

export function Page({ message }) {
  return (
    <BaseLayout>
      <PageTitle>{message}</PageTitle>
    </BaseLayout>
  );
}

export function get(req, res) {
  return {
    message: `Hello from index`,
  };
}
