var express = require('express')
const sheetsController = require('../controllers/sheetsController.js')

var router = express.Router()

/* GET home page. */
router.get('/all_datas', sheetsController.getAll)

module.exports = router
