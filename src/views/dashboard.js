import PageTitle from '../components/PageTitle'
import BaseLayout from '../layouts/BaseLayout'

export function Page({ message }) {
  return (
    <BaseLayout>
      <PageTitle subTitle="what's up humans">Dashboard</PageTitle>
      <p>Something</p>
    </BaseLayout>
  )
}

export function get(req) {
  const { name } = req.params
  return {
    message: `${name}`,
  }
}
