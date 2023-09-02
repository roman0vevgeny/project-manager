export const isToday = (expirationDate, checked) => {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  today.setMinutes(today.getMinutes() - offset)
  const todayString = today.toISOString().slice(0, 10)
  const expirationDateObject = new Date(expirationDate)
  expirationDateObject.setMinutes(expirationDateObject.getMinutes() - offset)
  const expirationDateString = expirationDateObject.toISOString().slice(0, 10)
  if (expirationDate) {
    return expirationDateString === todayString
  } else {
    return true
  }
}
