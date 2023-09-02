export const selectTaskById = (state, taskId) => {
  const task = state.tasks.tasks.find((task) => task.id === taskId)
  // console.log('Selected task:', task)
  return task
}
