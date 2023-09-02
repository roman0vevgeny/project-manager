import React from 'react'
import styles from './ModalButton.module.scss'

const ModalButton = ({ svg, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {svg && svg}
    </button>
  )
}

export default ModalButton
