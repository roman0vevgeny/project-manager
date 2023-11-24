import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [
    {
      id: 1,
      name: 'Evgeny',
      email: '01010101aa01010101@gmail.com',
      color: 'red',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'admin',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 2,
      name: 'Vladimir',
      email: 'test@gmail.com',
      color: 'green',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 3,
      name: 'Liliya',
      email: 'test@gmail.com',
      color: 'yellow',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 4,
      name: 'Andrew',
      email: 'test@gmail.com',
      color: 'purple',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 5,
      name: 'Roman',
      email: 'test@gmail.com',
      color: 'blue',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 6,
      name: 'Alexander',
      email: 'test@gmail.com',
      color: 'sea',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 7,
      name: 'Boris',
      email: 'test@gmail.com',
      color: 'pink',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
    {
      id: 8,
      name: 'Natalia',
      email: 'test@gmail.com',
      color: 'gray',
      photo: '',
      creationDate: new Date().toLocaleString('us-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: 'editor',
      tasks: [],
      projects: [],
      todotasks: [],
      progresstasks: [],
      donetasks: [],
    },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push({
        ...action.payload,
        id: Date.now(),
        creationDate: new Date().toLocaleString('us-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        tasks: [],
        todotasks: [],
        progresstasks: [],
        donetasks: [],
      })
    },

    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },

    updateUserName(state, action) {
      const { id, name } = action.payload
      const existingUser = state.users.find((user) => user.id === id)
      if (existingUser) {
        existingUser.name = name
      }
    },

    updateUserEmail(state, action) {
      const { id, email } = action.payload
      const existingUser = state.users.find((user) => user.id === id)
      if (existingUser) {
        existingUser.email = email
      }
    },

    addTaskToUser(state, action) {
      const { userId, taskId } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.tasks.push(taskId)
      }
      console.log('action.payload addTaskToUser: ', action.payload)
      console.log('user.tasks after addTaskToUser: ', user.tasks)
    },

    addTaskToUserTodoTasks(state, action) {
      const { userId, taskId } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.todotasks.push(taskId)
      }
      console.log('action.payload addTaskToUserTodoTasks: ', action.payload)
      console.log(
        'user.todotasks after addTaskToUserTodoTasks: ',
        user.todotasks
      )
    },

    addTaskToUserProgressTasks(state, action) {
      const { userId, taskId } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.progresstasks.push(taskId)
      }
      console.log('action.payload addTaskToUserProgressTasks: ', action.payload)
    },

    addTaskToUserDoneTasks(state, action) {
      const { userId, taskId } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.donetasks.push(taskId)
      }
      console.log('action.payload addTaskToUserDoneTasks: ', action.payload)
    },

    removeTaskFromUser(state, action) {
      const { userId, taskId } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.tasks = user.tasks.filter((id) => id !== taskId)
        user.todotasks = user.todotasks.filter((id) => id !== taskId)
        user.progresstasks = user.progresstasks.filter((id) => id !== taskId)
        user.donetasks = user.donetasks.filter((id) => id !== taskId)
      }
    },

    // updateUsersOrder(state, action) {
    //   state.users.splice(0, state.length, ...action.payload.users)
    // },

    // updateUsersOrder(state, action) {
    //   const { sourceIndex, destinationIndex } = action.payload
    //   const updatedUsers = [...state.users]
    //   const [movedUser] = updatedUsers.splice(sourceIndex, 1)
    //   updatedUsers.splice(destinationIndex, 0, movedUser)
    //   state.users = updatedUsers
    // },

    // updateUsersOrder(state, action) {
    //   const { sourceIndex, destinationIndex } = action.payload
    //   const newUsers = [...state]
    //   const [removed] = newUsers.splice(sourceIndex, 1)
    //   newUsers.splice(destinationIndex, 0, removed)
    //   return newUsers
    // },

    updateUsersOrder(state, action) {
      const { sourceIndex, destinationIndex } = action.payload
      const newUsers = [...state.users]
      const [removed] = newUsers.splice(sourceIndex, 1)
      newUsers.splice(destinationIndex, 0, removed)
      state.users = newUsers
      console.log('action.payload updateUsersOrder: ', action.payload)
    },

    updateTasksInUser(state, action) {
      const { userId, tasks } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user.tasks = tasks
      }
    },

    updateAllTasksInUser(state, action) {
      const { userId, tasks } = action.payload
      const user = state.find((user) => user.id === userId)
      if (user) {
        user.tasks = tasks
        user.todotasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'todo'
        )
        user.progresstasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'inprogress'
        )
        user.donetasks = tasks.filter(
          (taskId) =>
            state.tasks.tasks.find((task) => task.id === taskId).status ===
            'done'
        )
      }
    },

    updateTodoTasksInUser(state, action) {
      const { userId, tasks } = action.payload
      console.log('action.payload updateTodoTasksInUser: ', action.payload)
      const user = state.find((user) => user.id === userId)
      if (user) {
        user.todotasks = tasks
      }
    },

    updateProgressTasksInUser(state, action) {
      const { userId, tasks } = action.payload
      console.log('action.payload updateProgressTasksInUser: ', action.payload)
      const user = state.find((user) => user.id === userId)
      if (user) {
        user.progresstasks = tasks
      }
    },

    updateDoneTasksInUser(state, action) {
      const { userId, tasks } = action.payload
      console.log('action.payload updateDoneTasksInUser: ', action.payload)
      const user = state.find((user) => user.id === userId)
      if (user) {
        user.donetasks = tasks
      }
    },
  },
})

export default usersSlice.reducer

export const {
  addUser,
  deleteUser,
  updateUserName,
  updateUserEmail,
  addTaskToUser,
  removeTaskFromUser,
  updateUsersOrder,
  updateTasksInUser,
  updateAllTasksInUser,
  updateTodoTasksInUser,
  updateProgressTasksInUser,
  updateDoneTasksInUser,
  addTaskToUserTodoTasks,
  addTaskToUserProgressTasks,
  addTaskToUserDoneTasks,
} = usersSlice.actions
