import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action) {
      state.push(action.payload)
    },

    deleteProject(state, action) {
      const newProjects = state.filter(
        (project) => project.id !== action.payload
      )
      return newProjects
    },

    updateProjectName(state, action) {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      )
      if (index > -1) {
        state[index].name = action.payload.name
      }
    },

    addTaskToProject(state, action) {
      const { projectId, taskId } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.tasks.push(taskId)
      }
    },

    removeTaskFromProject(state, action) {
      const { projectId, taskId } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.tasks = project.tasks.filter((id) => id !== taskId)
      }
    },

    updateProjectsOrder(state, action) {
      state.splice(0, state.length, ...action.payload.projects)
    },

    updateTasksInProject(state, action) {
      const { projectId, tasks } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.tasks = tasks
      }
    },
  },
})

export default projectSlice.reducer

export const {
  addProject,
  deleteProject,
  updateProjectName,
  removeProjectFromTasks,
  addTaskToProject,
  removeTaskFromProject,
  toggleTaskInProject,
  updateProjectsOrder,
  updateTasksInProject,
} = projectSlice.actions
