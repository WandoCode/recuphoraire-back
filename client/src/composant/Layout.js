import Container from 'react-bootstrap/Container'

function Layout(props) {
  const title = props.title || 'Horaire Delta'
  return (
    <Container>
      <header>
        <h1>{title}</h1>
        <nav></nav>
      </header>
      <main>{props.children}</main>
    </Container>
  )
}

export default Layout
