import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Layout from './Layout'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginForm(props) {
  let navigate = useNavigate()
  const { logIn } = useContext(AuthContext)

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:5050/users/login', {
      username: username,
      password: password,
    })

    const loginIsOk = res.data.authenticate
    if (loginIsOk === 'true') {
      logIn(username)
      navigate('/')
    }
  }

  return (
    <Layout title="Login">
      <Container>
        <div className=" row justify-content-center">
          <Form className="col-4" onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" onChange={handleUsername} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" onChange={handlePassword} />
            </Form.Group>
            <Form.Group>
              <Form.Control type="submit" />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </Layout>
  )
}

export default LoginForm
