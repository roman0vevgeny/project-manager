import './App.scss'
import { ThemeProvider } from './context/ThemeContext'
import router from './pages/Router'
import { RouterProvider } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import LoadingScreen from './pages/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const removeLoader = () => setLoading(false)
  //   window.addEventListener('load', removeLoader)
  //   return () => window.removeEventListener('load', removeLoader)
  // }, [])

  useEffect(() => {
    const removeLoader = () => setLoading(false)
    const loadPromise = new Promise((resolve) => {
      window.addEventListener('load', resolve)
    })
    const timerPromise = new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    Promise.all([loadPromise, timerPromise]).then(removeLoader)
    return () => {
      window.removeEventListener('load', removeLoader)
      clearTimeout(timerPromise)
    }
  }, [])

  return (
    <>
      <ThemeProvider>
        {loading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </ThemeProvider>
    </>
  )
}

export default App
