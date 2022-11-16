let nodemailer = require('nodemailer')

exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (username === 'techdel' && password === 'chirec') {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    let mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Horaire Delta',
      text: 'Nouvelle connexion!',
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    res.json({ authenticate: 'true' })
  } else {
    res.json({ authenticate: 'false' })
  }
}
