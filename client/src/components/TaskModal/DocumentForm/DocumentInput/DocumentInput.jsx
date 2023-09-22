import React, { useRef, useLayoutEffect } from 'react'
import styles from '../../TagForm/TagInput/TagInput.module.scss'
import Close from '../../../svgs/Close'

const DocumentInput = ({ name, onNameChange }) => {
  const inputRef = useRef(null)

  const handleClearInput = () => {
    onNameChange('')
    inputRef.current.value = ''
  }

  useLayoutEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  return (
    <div className='relative flex h-fit items-center w-fit'>
      <input
        className={styles.input}
        placeholder='Enter a Google URL'
        onChange={(e) => onNameChange(e.target.value)}
        value={name}
        ref={inputRef}></input>
      <div className={styles.editBtn}>
        {name && (
          <button className={styles.close} onClick={handleClearInput}>
            <Close />
          </button>
        )}
      </div>
    </div>
  )
}

export default DocumentInput
