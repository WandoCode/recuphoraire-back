import GoogleSheet from './GoogleSheet.js'
import { formatHours, capitalizeFirstLetter, formatDate } from './helpers.js'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001/'

class DataManager {
  constructor() {
    this.holidays = {}
    this.formattedDatas = {}
    this.polyclinics = ['cavell', 'lmbt', 'cpl']
  }

  getRawDatasAllSheets = async () => {
    const datasRaw = await this.loadSheetsFromSpreadsheet()
    this.createStructuredDatas(datasRaw)
  }

  loadSheetsFromSpreadsheet = async () => {
    const res = await fetch(BASE_URL + 'sheets/all_datas')
    const allSheets = await res.json()
    return allSheets
  }

  /* Return index of a schedule with the same date, name and romm than the given newSchedule */
  getIndexOfScheduleToMerge = (name, newSchedule) => {
    const mergeHoursIndex = this.formattedDatas[name].findIndex((schedule) => {
      if (
        schedule.date.getTime() === newSchedule.date.getTime() &&
        schedule.room === newSchedule.room &&
        schedule.name === newSchedule.name
      ) {
        return true
      } else return false
    })

    return mergeHoursIndex
  }

  getMergedSchedules = (index, name, newSchedule) => {
    const scheduleA = this.formattedDatas[name][index]
    const scheduleB = newSchedule
    const mergedSchedule = {
      ...scheduleB,
      startHour: scheduleA.startHour,
      endHour: scheduleB.endHour,
    }

    return mergedSchedule
  }

  getNewSchedule = (name, cellArray, sheetModel, posX, posY) => {
    let room = ''
    let date = new Date(formatDate(sheetModel.getDate(posX)))
    const { startHour, endHour } = formatHours(sheetModel.getHours(posX, posY))

    if (cellArray.length === 1) {
      room = sheetModel.getLocation(posY)
    }

    if (cellArray.length === 2) {
      room = cellArray[1]
    }

    return { date, startHour, endHour, name, room }
  }

  getNewSchedulePolyclinic = (name, cellArray, sheetModel, posX) => {
    let room = cellArray[1]
    let date = new Date(formatDate(sheetModel.getDate(posX)))
    const startHour = cellArray[2] || ''
    const endHour = ''

    return { date, startHour, endHour, name, room }
  }

  addHoliday = (name, value) => {
    this.holidays[name]
      ? this.holidays[name].push(value)
      : (this.holidays[name] = [value])
  }

  addSchedule = (name, newSchedule) => {
    if (!this.formattedDatas[name]) {
      this.formattedDatas[name] = [newSchedule]
    } else {
      const index = this.getIndexOfScheduleToMerge(name, newSchedule)

      if (index === -1) {
        this.formattedDatas[name].push(newSchedule)
      } else {
        this.formattedDatas[name][index] = this.getMergedSchedules(
          index,
          name,
          newSchedule
        )
      }
    }
  }

  addPolyclinic = () => {}

  createStructuredDatas = (datasRaw) => {
    // Go through each util cells of all sheets
    for (const keyWeek in datasRaw) {
      const datasWeek = datasRaw[keyWeek]
      const sheetModel = GoogleSheet(datasWeek)

      for (let i = 3; i < 18; i++) {
        for (let j = 3; j < 50; j++) {
          const cellValue = sheetModel.getValueAtPos(i, j)

          if (cellValue && cellValue !== '') {
            const cellArray = cellValue.trim().split(' ')
            const name = capitalizeFirstLetter(cellArray[0].trim())

            if (cellArray.length > 2) {
              const testString = cellArray[1].toLowerCase()
              if (testString === 'out') {
                this.addHoliday(name, cellValue)
              }

              if (this.polyclinics.includes(testString)) {
                const newSchedule = this.getNewSchedulePolyclinic(
                  name,
                  cellArray,
                  sheetModel,
                  i
                )
                this.addSchedule(name, newSchedule)
              }
              continue
            }

            // Create a new schedule
            const newSchedule = this.getNewSchedule(
              name,
              cellArray,
              sheetModel,
              i,
              j
            )

            // Add schedule to results
            this.addSchedule(name, newSchedule)
          }
        }
      }
    }
  }
}
export default DataManager
