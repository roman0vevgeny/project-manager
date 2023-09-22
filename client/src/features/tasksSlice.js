import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: 1,
      checked: false,
      name: 'Первая задача с очень длинным текстом',
      description: '<p>Описание первой задачи</p>',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      expirationDate: null,
      status: 'todo',
      documents: [],
      subtasks: [
        { id: 1, name: 'Подзадача 1', checked: false },
        { id: 2, name: 'Подзадача 2', checked: false },
      ],
      favorite: false,
      tags: [],
      projects: [],
      priority: null,
    },
    {
      id: 8,
      checked: false,
      name: 'Вторая задача',
      description: '<p>Короткое описание про важность заджач</p>',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      expirationDate: '2023-09-16T21:00:00.000Z',
      status: 'todo',
      subtasks: [],
      documents: [],
      favorite: false,
      tags: [],
      projects: [],
      priority: null,
    },
    {
      id: 3,
      checked: false,
      name: 'Новая задача',
      description: '<p>С каким-то коротким описанием</p>',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      expirationDate: null,
      status: 'todo',
      subtasks: [
        { id: 1, name: 'Первая подзадача', checked: false },
        { id: 2, name: 'Вторая подзадача', checked: false },
      ],
      favorite: false,
      tags: [],
      documents: [],
      projects: [],
      priority: null,
    },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        ...action.payload,
        creationDate: new Date().toLocaleString('us-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        expirationDate: action.payload.expirationDate,
        // status: action.payload.status,
      })
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },

    updateTaskExpirationDate(state, action) {
      const { id, expirationDate } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.expirationDate = expirationDate
      }
    },

    updateTaskName(state, action) {
      const { id, name } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.name = name
      }
    },

    updateTaskDescription(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].description = action.payload.description
      }
    },

    addTaskTag(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].tags.push(action.payload.tagId)
      }
    },

    deleteTaskTag(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        const newTags = state.tasks[index].tags.filter(
          (tagId) => tagId !== action.payload.tagId
        )
        state.tasks[index].tags = newTags
      }
    },

    addTaskSubtask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].subtasks.push(action.payload.subtask)
      }
    },

    deleteTaskSubtask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].subtasks = state.tasks[index].subtasks.filter(
          (subtask) => subtask.id !== action.payload.subtaskId
        )
      }
    },

    updateTaskSubtaskName(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        const subtaskIndex = state.tasks[index].subtasks.findIndex(
          (subtask) => subtask.id === action.payload.subtaskId
        )
        if (subtaskIndex > -1) {
          const newSubtaskName = action.payload.subtaskName
          state.tasks[index].subtasks[subtaskIndex].name = newSubtaskName
        }
      }
    },

    updateTaskSubtaskChecked(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        const subtaskIndex = state.tasks[index].subtasks.findIndex(
          (subtask) => subtask.id === action.payload.subtaskId
        )
        if (subtaskIndex > -1) {
          state.tasks[index].subtasks[subtaskIndex].checked =
            action.payload.checked
        }
      }
    },

    updateTaskChecked(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload)
      if (index > -1) {
        state.tasks[index].checked = !state.tasks[index].checked
      }
    },

    updateTaskIsFavorite(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].favorite = action.payload.favorite
      }
    },

    updateTask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index] = action.payload
      }
    },
    updateTaskTags(state, action) {
      const { id, tags } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.tags = tags
      }
    },
    updateTaskSubtasks(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].subtasks = action.payload.subtasks
      }
    },

    addTaskProject(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        state.tasks[index].projects.push(action.payload.projectId)
      }
    },

    deleteTaskProject(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index > -1) {
        const newProjects = state.tasks[index].projects.reduce(
          (acc, projectId) => {
            if (projectId !== action.payload.projectId) {
              acc.push(projectId)
            }
            return acc
          },
          []
        )
        return {
          ...state,
          tasks: [
            ...state.tasks.slice(0, index),
            { ...state.tasks[index], projects: newProjects },
            ...state.tasks.slice(index + 1),
          ],
        }
      }
    },

    updateTaskProjects(state, action) {
      const { id, projects } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.projects = projects
      }
    },

    updateTasksOrder(state, action) {
      state.tasks = action.payload.tasks
    },

    setTaskPriority: (state, action) => {
      const { id, priority } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.priority = priority
      }
    },

    updateTaskStatus(state, action) {
      const { id, status } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.status = status
      }
    },

    updateTaskDocuments(state, action) {
      const { id, documents } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.documents = documents
      }
    },

    addDocument(state, action) {
      const { id, document } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.documents.push(document)
      }
    },

    // updateTodoTasks(state, action) {
    //   const { tasks } = action.payload
    //   state.tasks = state.tasks.map((task) => {
    //     if (tasks.some((newTask) => newTask.id === task.id)) {
    //       return tasks.find((newTask) => newTask.id === task.id)
    //     }
    //     return task
    //   })
    // },

    // updateProgressTasks(state, action) {
    //   const { tasks } = action.payload
    //   state.tasks = state.tasks.map((task) => {
    //     if (tasks.some((newTask) => newTask.id === task.id)) {
    //       return tasks.find((newTask) => newTask.id === task.id)
    //     }
    //     return task
    //   })
    // },

    // updateDoneTasks(state, action) {
    //   const { tasks } = action.payload
    //   state.tasks = state.tasks.map((task) => {
    //     if (tasks.some((newTask) => newTask.id === task.id)) {
    //       return tasks.find((newTask) => newTask.id === task.id)
    //     }
    //     return task
    //   })
    // },
  },
})

export default tasksSlice.reducer

export const {
  addTask,
  deleteTask,
  updateTaskName,
  updateTaskDescription,
  addTaskTag,
  deleteTaskTag,
  addTaskSubtask,
  deleteTaskSubtask,
  updateTaskSubtaskName,
  updateTaskSubtaskChecked,
  updateTaskExpirationDate,
  updateTaskChecked,
  updateTaskIsFavorite,
  updateTask,
  updateTaskTags,
  updateTaskSubtasks,
  updateTaskProjects,
  addTaskProject,
  deleteTaskProject,
  updateTasksOrder,
  setTaskPriority,
  updateTaskStatus,
  updateTaskDocuments,
  addDocument,
  // updateTodoTasks,
  // updateProgressTasks,
  // updateDoneTasks,
} = tasksSlice.actions
