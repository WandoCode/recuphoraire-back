exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  console.log(req.body)
  console.log(username, password)
  if (username === 'techdel' && password === 'chirec') {
    res.json({ authenticate: 'true' })
  } else {
    res.json({ authenticate: 'false' })
  }
}
