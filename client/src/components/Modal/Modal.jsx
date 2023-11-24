import React, { useEffect } from 'react'
import styles from './Modal.module.scss'

const Modal = ({ open, onClose, children, fit }) => {
  // console.log('children modal: ', children)
  useEffect(() => {
    const handleEscapePress = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) {
    return null
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={!fit ? styles.modal : styles.fit}>{children}</div>
    </div>
  )
}

export default Modal
