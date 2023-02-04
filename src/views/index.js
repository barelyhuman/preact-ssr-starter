import * as Yup from 'yup'
import PageTitle from '../components/PageTitle'
import BaseLayout from '../layouts/BaseLayout'
import ErrorContainer from '../components/ErrorContainer'
import { validationErrorToObj } from '../lib/error'

export function Page({ errors }) {
  return (
    <BaseLayout>
      <PageTitle subTitle={'Let\'s get you logged in'}>Login</PageTitle>
      <form action="/" method="POST">
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            defaultValue={errors?.email.value}
            aria-invalid={errors?.email.invalid}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            defaultValue={errors?.password.value}
            aria-invalid={errors?.password.invalid}
          />
        </div>
        <ErrorContainer errors={errors} />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </BaseLayout>
  )
}

export function get() {
  return {
    message: 'Hello from index',
  }
}

const validator = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export async function post(req, res) {
  const errors = await validator
    .validate(req.body, {
      abortEarly: false,
    })
    .catch(x => x)

  if (errors instanceof Error)
    return { errors: validationErrorToObj(errors) }

  res.redirect('/dashboard')
}
