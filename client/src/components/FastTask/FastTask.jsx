import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Edit from '../svgs/Edit'
import styles from './FastTask.module.scss'
import ModalButton from '../Button/ModalButton'

const FastTask = ({ onClose }) => {
  const [name, setName] = useState('')
  const [text, setText] = useState(name || '')
  const [task, setTask] = useState({
    id: Date.now(),
    name: '',
    description: '',
    tags: [],
    expirationDate: null,
    subtasks: [],
    checked: false,
    favorite: false,
    status: 'todo',
    projects: [],
    documents: [],
  })

  const inputRef = useRef(null)

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
    if (newText !== name) {
      setName(newText)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (task.name === '') {
        return
      } else {
        setTask({
          ...task,
          name: name,
        })
        setError(null)
        dispatch(addTask(task))
      }
    }
  }

  useEffect(() => {
    inputRef.current.textContent = text
  }, [text])

  useEffect(() => {
    setText(name || '')
  }, [name])

  useLayoutEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  return (
    <div className={styles.main}>
      <div className='flex justify-center items-start w-full rounded-[10px] mb-3'>
        <div
          placeholder={name}
          ref={inputRef}
          contentEditable='true'
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={text === '' ? `${styles.input} bg-gray` : styles.input}
        />
        <div className='w-[1px]'></div>
      </div>
      <div className='flex space-x-2 w-full mx-4'>
        <button className='flex text-14 items-center font-bold text-grayHover bg-gray pt-[4px] pb-[3px] px-2 rounded-[4px] justify-center'>
          {'Add task'}
        </button>
        <button
          className='flex items-center text-14 font-bold text-grayHover bg-gray pt-[4px] pb-[3px] px-2 rounded-[4px] justify-center'
          onClick={onClose}>
          {'Close'}
        </button>
      </div>
    </div>
  )
}

export default FastTask
