import { createSelector } from 'reselect'

export const todayTasksSelector = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => {
    const today = new Date()
    const offset = today.getTimezoneOffset()
    today.setMinutes(today.getMinutes() - offset)
    const todayString = today.toISOString().slice(0, 10)

    return tasks.filter((task) => {
      if (task.expirationDate) {
        const expirationDateObject = new Date(task.expirationDate)
        expirationDateObject.setMinutes(
          expirationDateObject.getMinutes() - offset
        )
        const expirationDateString = expirationDateObject
          .toISOString()
          .slice(0, 10)

        return expirationDateString === todayString
      } else {
        return false
      }
    })
  }
)

export const expiredTasksSelector = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => {
    const today = new Date()
    const offset = today.getTimezoneOffset()
    today.setMinutes(today.getMinutes() + offset)
    today.setDate(today.getDate() - 1)
    const previousDate = +today

    return tasks.filter((task) => {
      if (task.expirationDate && task.checked === false) {
        const expirationDate = +new Date(task.expirationDate)
        return expirationDate + offset * 60 * 1000 < previousDate
      } else {
        return false
      }
    })
  }
)

// export const selectTaskById = createSelector(
//   (state, taskId) => ({ tasks: state.tasks.tasks, taskId }),
//   ({ tasks, taskId }) => {
//     const task = tasks.find((task) => task.id === taskId)
//     console.log('Selected task:', task)
//     return task
//   }
// )
