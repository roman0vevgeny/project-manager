const getTaskById = (state, id) => {
  const tasks = state.tasks.tasks
  return tasks.find((task) => task.id === id)
}

export { getTaskById }
