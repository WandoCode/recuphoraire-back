import Form from 'react-bootstrap/Form'

function Select(props) {
  const orderedNames = props.names.sort()

  const options = orderedNames.map((name) => {
    return (
      <option value={name} key={name}>
        {name}
      </option>
    )
  })

  return (
    <Form.Select
      name="techno"
      id="techno"
      onChange={(e) => props.getName(e.target.value)}
    >
      {options}
    </Form.Select>
  )
}

export default Select
