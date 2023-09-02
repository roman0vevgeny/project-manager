import React from 'react'
import styles from './SubtaskInput.module.scss'
import Close from '../../../svgs/Close'

const SubtaskInput = ({ value, onChange, onSubmit, inputRef }) => {
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(e)
      handleClearInput()
    }
  }

  const handleClearInput = () => {
    inputRef.current.value = ''
  }

  return (
    <div className='relative flex flex-row justify-between ml-2 items-start my-2'>
      <input
        className={styles.input}
        type='text'
        value={value}
        placeholder='+ Add a subtask'
        onKeyUp={handleKeyUp}
        onChange={onChange}
        ref={inputRef}
      />
      {value.length > 0 && (
        <button className={styles.close} onClick={handleClearInput}>
          <Close />
        </button>
      )}
    </div>
  )
}

export default SubtaskInput
