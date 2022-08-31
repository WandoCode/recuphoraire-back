const countSpaceInString = (text) => {
  let count = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    count = char === ' ' ? count + 1 : count
  }
  return count
}

// Separe une string du type "xx xx" en 2 strings distinctes. le nombre d'espace entre les 2 parties xx est indeterminé
const formatHours = (hours) => {
  if (!hours) return { startHour: undefined, endHour: undefined }
  else {
    const trimmedHours = hours.trim()
    const nbrSpace = countSpaceInString(trimmedHours)
    const splitRef = ' '.repeat(nbrSpace)
    const start = trimmedHours.split(splitRef)[0]
    const end = trimmedHours.split(splitRef)[1]

    return { startHour: start, endHour: end }
  }
}

const capitalizeFirstLetter = (text) => {
  return text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
}

const formatDate = (dateString) => {
  const splittedDate = dateString.split('-')
  return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
}

export { formatHours, capitalizeFirstLetter, formatDate }
