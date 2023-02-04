import { styled } from 'goober'

const Container = styled('div')`
  color: red;
  display: block;
  max-width: 250px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 6px;
`

const ListContainer = styled('ul')`
  color: inherit;
`

const ListContainerItem = styled('li')`
  color: inherit;
`

export default function ErrorContainer({ errors = {} }) {
  let _errors = []

  Object.keys(errors).forEach((key) => {
    _errors = _errors.concat(errors[key].errors).filter(x => x)
  })

  return (
    <Container>
      <ListContainer>
        {_errors.map((error) => {
          return <ListContainerItem>{error}</ListContainerItem>
        })}
      </ListContainer>
    </Container>
  )
}
