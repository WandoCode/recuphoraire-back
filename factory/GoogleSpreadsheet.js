const axios = require('axios')
const mockSpreadSheet = require('../test/mockSpreadsheet.json')
const mockAllSheets = require('../test/mockSheetsValues.json')

const SpreadsheetFactory = async (APIKey, spreadsheetId, rangeParam) => {
  let spreadsheet = []
  let range = rangeParam || 'A1:R55'

  const init = async () => {
    spreadsheet = await getAllSheets()
  }

  const getAllSheets = async () => {
    let datas = undefined
    if (process.env.DEV === 'true') {
      datas = mockSpreadSheet
      return datas
    } else {
      try {
        console.log(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${APIKey}`
        )
        const res = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${APIKey}`
        )
        datas = res.data
        return datas
      } catch (err) {
        throw new Error(err + 'at spreadsheet')
      }
    }
  }

  const loadValuesFromSpreadsheet = async () => {
    const sheetsTitle = getAllSheetsTitle()
    const allSheetsValues = await getAllSheetsValues(sheetsTitle, range)

    return allSheetsValues
  }

  const getAllSheetsTitle = () => {
    if (spreadsheet.length === 0) {
      console.error('Spreadsheet object not loaded. Unable to get sheets')
    }

    const sheets = spreadsheet.sheets
    const sheetsTitle = sheets.map((sheet) => {
      return sheet.properties.title
    })

    return sheetsTitle
  }

  const getOneSheetValues = async (sheetTitle, range) => {
    const res = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!${range}?key=${APIKey}`
    )
    const sheetValues = res.data
    return sheetValues
  }

  const getAllSheetsValues = async (sheetsTitle, range) => {
    let allSheetsValues = {}
    if (process.env.DEV === 'true') {
      allSheetsValues = mockAllSheets
    } else {
      for (const sheetTitle of sheetsTitle) {
        const sheetData = await getOneSheetValues(sheetTitle, range)
        const sheetValues = sheetData.values
        const formattedSheetValues = unmergeDates(sheetValues)
        allSheetsValues[sheetTitle] = formattedSheetValues
      }
    }

    return allSheetsValues
  }

  const unmergeDates = (sheetData) => {
    const dataCopy = [...sheetData]
    const colTitlesRow = dataCopy[0]
    let unmergedRow = ['']

    for (let i = 1; i <= colTitlesRow.length; i++) {
      const colValue = colTitlesRow[i]
      if (colValue === undefined || colValue === '') {
        unmergedRow.push(colTitlesRow[i - 1])
      } else {
        unmergedRow.push(colTitlesRow[i])
      }
    }
    dataCopy[0] = unmergedRow

    return dataCopy
  }

  return {
    init,
    loadValuesFromSpreadsheet,
  }
}

module.exports = SpreadsheetFactory
