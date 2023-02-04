export function validationErrorToObj(errors) {
  const errorObj = {}
  Object.keys(errors.value).forEach((key) => {
    errorObj[key] = {
      invalid: false,
      value: errors.value[key],
    }
  })

  errors.inner.map((err) => {
    errorObj[err.path].invalid = true
    errorObj[err.path].errors = err.errors
  })

  return errorObj
}
