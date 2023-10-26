import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    donetasks: [],
    icon: 'case',
    id: '1698044668160',
    name: 'Новый',
    progresstasks: [],
    tasks: [],
    todotasks: [],
  },
  {
    donetasks: [],
    icon: 'case',
    id: '1698044668380',
    name: 'Дополнительный',
    progresstasks: [],
    tasks: [],
    todotasks: [],
  },
]

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action) {
      state.push({
        ...action.payload,
        todotasks: [],
        progresstasks: [],
        donetasks: [],
      })
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
        // project.todotasks.push(taskId)
      }
    },

    removeTaskFromProject(state, action) {
      const { projectId, taskId } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.tasks = project.tasks.filter((id) => id !== taskId)
        project.todotasks = project.todotasks.filter((id) => id !== taskId)
        project.progresstasks = project.progresstasks.filter(
          (id) => id !== taskId
        )
        project.donetasks = project.donetasks.filter((id) => id !== taskId)
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

    updateAllTasksInProject(state, action) {
      const { projectId, tasks } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.tasks = tasks
        project.todotasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'todo'
        )
        project.progresstasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'inprogress'
        )
        project.donetasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'done'
        )
      }
    },

    updateTodoTasksInProject(state, action) {
      const { projectId, tasks } = action.payload
      console.log('action.payload updateTodoTasksInProject: ', action.payload)
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.todotasks = tasks
      }
    },

    updateProgressTasksInProject(state, action) {
      const { projectId, tasks } = action.payload
      console.log(
        'action.payload updateProgressTasksInProject: ',
        action.payload
      )
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.progresstasks = tasks
      }
    },

    updateDoneTasksInProject(state, action) {
      const { projectId, tasks } = action.payload
      console.log('action.payload updateDoneTasksInProject: ', action.payload)
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.donetasks = tasks
      }
    },

    updateProjectIcon(state, action) {
      const { projectId, icon } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.icon = icon
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
  updateAllTasksInProject,
  updateTodoTasksInProject,
  updateProgressTasksInProject,
  updateDoneTasksInProject,
  updateProjectIcon,
} = projectSlice.actions
