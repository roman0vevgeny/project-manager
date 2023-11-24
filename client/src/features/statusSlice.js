import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = [
  { id: 111, name: 'To-do', icon: 'todo' },
  { id: uuid(), name: 'In progress', icon: 'progress' },
  { id: uuid(), name: 'Done', icon: 'done' },
  //   { id: uuid(), name: 'On hold', icon: 'parameters' },
  //   { id: uuid(), name: 'In place', icon: 'maps' },
  //   { id: uuid(), name: 'In transit', icon: 'circle' },
  //   { id: uuid(), name: 'In time', icon: 'time' },
  //   { id: uuid(), name: 'On pause', icon: 'pause' },
  //   { id: uuid(), name: 'Testing', icon: 'test' },
  //   { id: uuid(), name: 'In merge', icon: 'merge' },
  //   { id: uuid(), name: 'In review', icon: 'review' },
  //   { id: uuid(), name: 'In translation', icon: 'translate' },
  //   { id: uuid(), name: 'In discussion', icon: 'discuss' },
]

const statusSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    addStatus(state, action) {
      state.push({
        ...action.payload,
        id: uuid(),
        name: action.payload.name,
        icon: action.payload.icon,
      })
    },

    deleteStatus(state, action) {
      const newStatuses = state.filter((status) => status.id !== action.payload)
      return newStatuses
    },

    updateStatusIcon(state, action) {
      const { id, icon } = action.payload
      const status = state.find((status) => status.id === id)
      status.icon = icon
    },

    updateStatusName(state, action) {
      const { id, name } = action.payload
      const status = state.find((status) => status.id === id)
      status.name = name
    },

    // updateStatusesOrder(state, action) {
    //   state.splice(0, state.length, ...action.payload.statuses)
    // },

    updateStatusesOrder(state, action) {
      const { sourceIndex, destinationIndex } = action.payload

      const newStatuses = [...state]

      const [removed] = newStatuses.splice(sourceIndex, 1)
      newStatuses.splice(destinationIndex, 0, removed)

      return newStatuses
    },
  },
})

export default statusSlice.reducer

export const {
  addStatus,
  deleteStatus,
  updateStatusIcon,
  updateStatusName,
  updateStatusesOrder,
} = statusSlice.actions
