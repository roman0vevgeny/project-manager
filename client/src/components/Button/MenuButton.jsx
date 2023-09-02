import React from 'react'
import styles from './MenuButton.module.scss'

const MenuButton = ({ svg, onClick }) => {
  return (
    <div className={styles.main} onClick={onClick}>
      {svg}
    </div>
  )
}

export default MenuButton
