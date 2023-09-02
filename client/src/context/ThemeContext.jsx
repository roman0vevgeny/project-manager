import React, { createContext, useEffect, useState } from 'react'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) {
      return 'light'
    }
  }
  return 'dark'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = (theme) => {
    const root = window.document.documentElement
    const isLight = theme === 'light'

    root.classList.remove(isLight ? 'dark' : 'light')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
