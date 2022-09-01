const SpreadsheetFactory = require('../factory/GoogleSpreadsheet.js')

exports.getAll = async (req, res, next) => {
  const API_KEY = process.env.API_KEY
  const spreadsheetID = process.env.spreadsheetID

  try {
    const spreadsheet = await SpreadsheetFactory(API_KEY, spreadsheetID)
    await spreadsheet.init()
    const allSheets = await spreadsheet.loadValuesFromSpreadsheet()
    res.status(200).json(allSheets)
  } catch (err) {
    console.debug(err)
    res.status(500).send({ message: API_KEY })
  }
}
