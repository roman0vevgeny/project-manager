import React, { useRef, useEffect } from 'react'
import Edit from '../../svgs/Edit'
import styles from './TaskNameModal.module.scss'
import ModalButton from '../../Button/ModalButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskName } from '../../../features/tasksSlice'

const TaskNameModal = ({ id, checked }) => {
  const name = useSelector(
    (state) => state.tasks.tasks.find((t) => t.id === id).name
  )

  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const handleFocus = () => {
    inputRef.current.focus()

    const range = document.createRange()
    range.selectNodeContents(inputRef.current)
    range.collapse(false)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    if (inputRef.current.textContent === 'Untitled') {
      inputRef.current.textContent = ''
    }
  }

  const handleBlur = () => {
    const newText = inputRef.current.textContent.trim()
    if (!newText) {
      inputRef.current.textContent = name
    } else if (newText !== name) {
      dispatch(updateTaskName({ id, name: newText }))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      inputRef.current.blur()
    }
  }

  useEffect(() => {
    inputRef.current.textContent = name || 'Untitled'
  }, [name])

  return (
    <div className='flex flex-row justify-between mx-2 items-start my-2'>
      <div
        className={styles.input}
        placeholder={name}
        ref={inputRef}
        contentEditable='true'
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />

      {/* {!checked && (
        <div className='flex flex-row mt-1'>
          <ModalButton svg={<Edit />} onClick={handleFocus} />
        </div>
      )} */}
    </div>
  )
}

export default TaskNameModal
