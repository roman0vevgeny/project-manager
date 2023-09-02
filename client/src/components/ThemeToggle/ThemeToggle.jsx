import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext.jsx'
import styles from './ThemeToggle.module.scss'
import Moon from '../svgs/Moon.jsx'
import Sunny from '../svgs/Sunny.jsx'

const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div className='flex'>
      {theme === 'dark' ? (
        <div
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={styles.main}>
          <Moon />
        </div>
      ) : (
        <div
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={styles.main}>
          <Sunny />
        </div>
      )}
    </div>
  )
}

export default ThemeToggleButton
