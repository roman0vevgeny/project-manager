import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = [
  {
    id: uuid(),
    name: 'Instructions',
    icon: 'case',
    sections: ['111', '222', '333', '444', '555'],
  },
  {
    id: uuid(),
    name: 'Development',
    icon: 'case',
    sections: [],
  },
]

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action) {
      state.push({
        ...action.payload,
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

    addSectionToProject(state, action) {
      const { projectId, sectionId } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.sections.push(sectionId)
      }
    },

    updateProjectSections(state, action) {
      const { projectId, sections } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.sections = sections
      }
    },

    deleteSectionFromProject(state, action) {
      const { projectId, sectionId } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.sections = project.sections.filter(
          (section) => section !== sectionId
        )
      }
    },

    updateSectionsOrder(state, action) {
      const { projectId, sections } = action.payload
      console.log('action.payload updateSectionsOrder: ', action.payload)
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.sections = sections
        // project.sections.splice(0, project.sections.length, ...sections)
      }
    },

    // updateSectionsOrder(state, action) {
    //   const { projectId, sourceIndex, destinationIndex } = action.payload
    //   const project = state.find((project) => project.id === projectId)
    //   if (project) {
    //     const [removed] = project.sections.splice(sourceIndex, 1)
    //     project.sections.splice(destinationIndex, 0, removed)
    //   }
    // },

    // Add a reducer for moving a section between different projects
    moveSectionBetweenProjects(state, action) {
      const {
        sourceProjectId,
        destinationProjectId,
        sectionId,
        destinationIndex,
      } = action.payload
      // Use the immer's produce function to write mutating code
      state = produce(state, (draft) => {
        // Find the source and destination projects by their id
        const sourceProject = draft.find(
          (project) => project.id === sourceProjectId
        )
        const destinationProject = draft.find(
          (project) => project.id === destinationProjectId
        )
        // Remove the section from the source project
        sourceProject.sections = sourceProject.sections.filter(
          (section) => section !== sectionId
        )
        // Insert the section to the destination project
        destinationProject.sections.splice(destinationIndex, 0, sectionId)
      })
      return state
    },

    updateProjectIcon(state, action) {
      const { projectId, icon } = action.payload
      const project = state.find((project) => project.id === projectId)
      if (project) {
        project.icon = icon
      }
    },

    // updateProjectsOrder(state, action) {
    //   state.splice(0, state.length, ...action.payload.projects)
    // },

    updateProjectsOrder(state, action) {
      const { sourceIndex, destinationIndex } = action.payload

      const newProjects = [...state]

      const [removed] = newProjects.splice(sourceIndex, 1)
      newProjects.splice(destinationIndex, 0, removed)

      return newProjects
    },
  },
})

export default projectSlice.reducer

export const {
  addProject,
  deleteProject,
  updateProjectName,
  addSectionToProject,
  deleteSectionFromProject,
  updateSectionsOrder,
  updateProjectSections,
  moveSectionBetweenProjects,
  updateProjectIcon,
  updateProjectsOrder,
} = projectSlice.actions

// const initialState = [
//   {
//     donetasks: [],
//     icon: 'case',
//     id: '1698044668160',
//     name: 'Новый',
//     progresstasks: [],
//     tasks: [],
//     todotasks: [],
//   },
//   {
//     donetasks: [],
//     icon: 'case',
//     id: '1698044668380',
//     name: 'Дополнительный',
//     progresstasks: [],
//     tasks: [],
//     todotasks: [],
//   },
// ]

// const projectSlice = createSlice({
//   name: 'projects',
//   initialState,
//   reducers: {
//     addProject(state, action) {
//       state.push({
//         ...action.payload,
//         todotasks: [],
//         progresstasks: [],
//         donetasks: [],
//       })
//     },

//     deleteProject(state, action) {
//       const newProjects = state.filter(
//         (project) => project.id !== action.payload
//       )
//       return newProjects
//     },

//     updateProjectName(state, action) {
//       const index = state.findIndex(
//         (project) => project.id === action.payload.id
//       )
//       if (index > -1) {
//         state[index].name = action.payload.name
//       }
//     },

//     addTaskToProject(state, action) {
//       const { projectId, taskId } = action.payload
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.tasks.push(taskId)
//         // project.todotasks.push(taskId)
//       }
//     },

//     removeTaskFromProject(state, action) {
//       const { projectId, taskId } = action.payload
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.tasks = project.tasks.filter((id) => id !== taskId)
//         project.todotasks = project.todotasks.filter((id) => id !== taskId)
//         project.progresstasks = project.progresstasks.filter(
//           (id) => id !== taskId
//         )
//         project.donetasks = project.donetasks.filter((id) => id !== taskId)
//       }
//     },

//     updateProjectsOrder(state, action) {
//       state.splice(0, state.length, ...action.payload.projects)
//     },

//     updateTasksInProject(state, action) {
//       const { projectId, tasks } = action.payload
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.tasks = tasks
//       }
//     },

//     updateAllTasksInProject(state, action) {
//       const { projectId, tasks } = action.payload
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.tasks = tasks
//         project.todotasks = tasks.filter(
//           (taskId) =>
//             state.tasks.tasks.find((task) => task.id === taskId).status ===
//             'todo'
//         )
//         project.progresstasks = tasks.filter(
//           (taskId) =>
//             state.tasks.tasks.find((task) => task.id === taskId).status ===
//             'inprogress'
//         )
//         project.donetasks = tasks.filter(
//           (taskId) =>
//             state.tasks.tasks.find((task) => task.id === taskId).status ===
//             'done'
//         )
//       }
//     },

//     updateTodoTasksInProject(state, action) {
//       const { projectId, tasks } = action.payload
//       console.log('action.payload updateTodoTasksInProject: ', action.payload)
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.todotasks = tasks
//       }
//     },

//     updateProgressTasksInProject(state, action) {
//       const { projectId, tasks } = action.payload
//       console.log(
//         'action.payload updateProgressTasksInProject: ',
//         action.payload
//       )
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.progresstasks = tasks
//       }
//     },

//     updateDoneTasksInProject(state, action) {
//       const { projectId, tasks } = action.payload
//       console.log('action.payload updateDoneTasksInProject: ', action.payload)
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.donetasks = tasks
//       }
//     },

//     updateProjectIcon(state, action) {
//       const { projectId, icon } = action.payload
//       const project = state.find((project) => project.id === projectId)
//       if (project) {
//         project.icon = icon
//       }
//     },
//   },
// })

// export default projectSlice.reducer

// export const {
//   addProject,
//   deleteProject,
//   updateProjectName,
//   removeProjectFromTasks,
//   addTaskToProject,
//   removeTaskFromProject,
//   toggleTaskInProject,
//   updateProjectsOrder,
//   updateTasksInProject,
//   updateAllTasksInProject,
//   updateTodoTasksInProject,
//   updateProgressTasksInProject,
//   updateDoneTasksInProject,
//   updateProjectIcon,
// } = projectSlice.actions
