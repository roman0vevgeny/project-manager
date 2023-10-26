import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasksSlice'
import tagsReducer from '../features/tagsSlice'
import navbarReducer from '../features/navbarSlice'
import projectsReducer from '../features/projectSlice'
import usersReducer from '../features/usersSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    tags: tagsReducer,
    navbar: navbarReducer,
    projects: projectsReducer,
    users: usersReducer,
  },
})
