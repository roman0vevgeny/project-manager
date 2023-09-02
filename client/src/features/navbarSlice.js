import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    showNavbar: true,
  },
  reducers: {
    toggleNavbar: (state) => {
      state.showNavbar = !state.showNavbar
    },
  },
})

export const { toggleNavbar } = navbarSlice.actions
export default navbarSlice.reducer
