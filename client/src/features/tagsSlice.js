import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action) {
      state.push(action.payload)
    },

    deleteTag(state, action) {
      const newTags = state.filter((tag) => tag.id !== action.payload)
      return newTags
    },

    updateTagName(state, action) {
      const index = state.findIndex((tag) => tag.id === action.payload.id)
      if (index > -1) {
        state[index].name = action.payload.name
      }
    },

    updateTagColor(state, action) {
      const index = state.findIndex((tag) => tag.id === action.payload.id)
      if (index > -1) {
        state[index].color = action.payload.color
      }
    },

    // updateTagsOrder(state, action) {
    //   state = action.payload.tags
    // },

    updateTagsOrder(state, action) {
      state.splice(0, state.length, ...action.payload.tags)
    },
  },
})

export default tagsSlice.reducer

export const {
  addTag,
  deleteTag,
  updateTagName,
  updateTagColor,
  updateTagsOrder,
} = tagsSlice.actions
