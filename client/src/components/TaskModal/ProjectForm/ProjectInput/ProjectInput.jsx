import React, { useRef } from 'react'
import styles from '../../TagForm/TagInput/TagInput.module.scss'
import Close from '../../../svgs/Close'

const ProjectInput = ({ name, onNameChange }) => {
  const inputRef = useRef(null)

  const handleClearInput = () => {
    onNameChange('')
    inputRef.current.value = ''
  }

  return (
    <div className='relative flex h-fit items-center w-fit'>
      <input
        className={styles.input}
        placeholder='Enter a new project'
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

export default ProjectInput
