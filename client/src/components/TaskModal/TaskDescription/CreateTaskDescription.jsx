import React, { useRef, useEffect, useState } from 'react'
import Edit from '../../svgs/Edit'
import styles from './TaskDescription.module.scss'
import ModalButton from '../../Button/ModalButton'

const CreateTaskDescription = ({ description, setDescription }) => {
  const inputRef = useRef(null)

  const [localDescription, setLocalDescription] = useState(
    description || '+ Add a description'
  )

  const handleFocus = () => {
    inputRef.current.focus()

    const range = document.createRange()
    range.selectNodeContents(inputRef.current)
    range.collapse(false)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleBlur = () => {
    const newText = inputRef.current.textContent.trim()
    if (newText !== description) {
      setDescription(newText)
    } else if (newText === '') {
      setLocalDescription('+ Add a description')
    }
  }

  const handleClearInput = () => {
    if (inputRef.current.textContent === '+ Add a description') {
      setLocalDescription('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      inputRef.current.blur()
    }
  }

  useEffect(() => {
    inputRef.current.textContent = localDescription
  }, [localDescription])

  useEffect(() => {
    setLocalDescription(description || '+ Add a description')
  }, [description])

  return (
    <div className='flex flex-col justify-between mx-2 items-start my-2 w-full'>
      <div
        className={
          localDescription === '+ Add a description'
            ? styles.inputGray
            : styles.input
        }
        placeholder={description}
        ref={inputRef}
        contentEditable='true'
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onClick={handleClearInput}
        onFocus={handleClearInput}
      />
      <div className='flex flex-row mt-1'>
        <ModalButton svg={<Edit />} onClick={handleFocus} />
      </div>
    </div>
  )
}

export default CreateTaskDescription
