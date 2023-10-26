import React, { useState, useEffect } from 'react'
import { Apply, Cancel } from '../UI/Icons'
import styles from './LinkModal.module.scss'

export default function LinkModal({
  show,
  onClose,
  href,
  onConfirm,
  onCancel,
}) {
  const [url, setUrl] = useState(href || '')

  useEffect(() => {
    setUrl(href || '')
  }, [href])

  const handleConfirm = () => {
    onConfirm(url)
    onClose()
  }

  const handleCancel = () => {
    onCancel()
    onClose()
  }

  return (
    <>
      {show && (
        <div className={styles.main}>
          <div className='flex'>
            <input
              className={styles.input}
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='https://'
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirm()
                  onClose()
                } else if (e.key === 'Escape') {
                  handleCancel()
                  onClose()
                }
              }}
            />
            <div className={styles.buttons}>
              <button onClick={handleConfirm} className={styles.menuButton}>
                {Apply()}
              </button>
              <button onClick={handleCancel} className={styles.menuButton}>
                {Cancel()}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
