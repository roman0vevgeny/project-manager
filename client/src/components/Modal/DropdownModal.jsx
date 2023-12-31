import React, { useEffect } from 'react'
import styles from './DropdownModal.module.scss'

const DropdownModal = ({
  open,
  onClose,
  children,
  noBorder,
  stopPropagation,
  onEscapePress,
  icon,
  grid,
}) => {
  useEffect(() => {
    const handleEscapePress = (e) => {
      if (e.key === 'Escape') {
        onClose()
        if (stopPropagation) {
          e.stopPropagation()
        }
      }
    }

    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [onClose, stopPropagation])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) {
    return null
  }

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick}></div>
      <div
        className={
          icon
            ? styles.icon
            : grid
            ? styles.grid
            : !noBorder
            ? styles.modal
            : styles.modalNoBorder
        }>
        {children}
      </div>
    </>
  )
}

export default DropdownModal
