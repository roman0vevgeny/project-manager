import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = [
  {
    id: '111',
    name: 'To-do',
    tasks: [],
    status: 111,
  },
  {
    id: '222',
    name: 'In progress',
    tasks: [],
    status: null,
  },
  {
    id: '333',
    name: 'Another',
    tasks: [],
    status: null,
  },
  {
    id: '444',
    name: 'More sections',
    tasks: [],
    status: null,
  },
  {
    id: '555',
    name: 'Done',
    tasks: [],
    status: null,
  },
  { id: uuid(), name: 'On hold', tasks: [], status: null },
]

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection(state, action) {
      state.push({
        ...action.payload,
        id: action.payload.id,
        name: action.payload.name,
        tasks: action.payload.tasks,
        status: null,
      })
    },

    updateSectionName(state, action) {
      const { sectionId, name } = action.payload
      const section = state.find((section) => section.id === sectionId)
      if (section) {
        section.name = name
      }
    },

    updateSectionStatus(state, action) {
      const { sectionId, statusId } = action.payload
      console.log('action.payload updateSectionStatus: ', action.payload)
      const section = state.find((section) => section.id === sectionId)
      if (section) {
        section.status = statusId
      }
    },

    addTaskToSection(state, action) {
      const { sectionId, taskId } = action.payload
      const section = state.find((section) => section.id === sectionId)
      if (section) {
        section.tasks.push(taskId)
      }
    },

    removeTaskFromSection(state, action) {
      const { sectionId, taskId } = action.payload
      const section = state.find((section) => section.id === sectionId)
      if (section) {
        section.tasks = section.tasks.filter((task) => task !== taskId)
      }
    },

    updateTaskOrder(state, action) {
      const { sectionId, sourceIndex, destinationIndex } = action.payload
      const section = state.find((section) => section.id === sectionId)
      if (section) {
        const [removed] = section.tasks.splice(sourceIndex, 1)
        section.tasks.splice(destinationIndex, 0, removed)
      }
    },

    updateSectionsOrder(state, action) {
      const { sourceIndex, destinationIndex } = action.payload
      const newSections = [...state]
      const [removed] = newSections.splice(sourceIndex, 1)
      newSections.splice(destinationIndex, 0, removed)
      return newSections
    },

    deleteSection(state, action) {
      const newSections = state.filter(
        (section) => section.id !== action.payload
      )
      return newSections
    },

    moveTaskBetweenSections(state, action) {
      const {
        sourceSectionId,
        destinationSectionId,
        taskId,
        destinationIndex,
      } = action.payload
      const moveTask = (sectionId) => {
        const section = state.find((section) => section.id === sectionId)
        if (section) {
          const taskIndex = section.tasks.indexOf(taskId)
          if (taskIndex !== -1) {
            section.tasks.splice(taskIndex, 1)
          }
        }
      }
      const insertTask = (sectionId) => {
        const section = state.find((section) => section.id === sectionId)
        if (section) {
          section.tasks.splice(destinationIndex, 0, taskId)
        }
      }
      moveTask(sourceSectionId)
      insertTask(destinationSectionId)
    },
  },
})

export default sectionSlice.reducer

export const {
  addSection,
  updateSectionName,
  updateSectionStatus,
  addTaskToSection,
  removeTaskFromSection,
  updateTaskOrder,
  updateSectionsOrder,
  deleteSection,
  moveTaskBetweenSections,
} = sectionSlice.actions
