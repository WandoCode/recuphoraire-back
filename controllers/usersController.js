exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (username === 'techdel' && password === 'chirec') {
    res.json({ authenticate: 'true' })
  } else {
    res.json({ authenticate: 'false' })
  }
}
