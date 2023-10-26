import React, { useRef, useEffect, useState } from 'react'
import styles from './FastTask.module.scss'
import { useDispatch } from 'react-redux'
import { addFastTask } from '../../features/tasksSlice'
// import Editor from '../Editor/Editor'

const FastTask = ({ onClose, onChange }) => {
  const [name, setName] = useState('')
  const [task, setTask] = useState({
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
    users: [],
  })

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.focus()
    if (inputRef.current.textContent === 'Task Name') {
      inputRef.current.textContent = ''
    }

    const range = document.createRange()
    range.selectNodeContents(inputRef.current)
    range.collapse(false)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleBlur = () => {
    const newText = inputRef.current.textContent.trim()
    if (!newText || newText === '') {
      setName('Task Name')
    }
    if (newText !== name) {
      setName(newText)
      setTask({
        ...task,
        name: newText,
      })
    } else {
      setTask({
        ...task,
        name: name,
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newText = inputRef.current.textContent.trim()
      if (!newText || newText === '') {
        return
      } else {
        const newTask = {
          ...task,
          name: newText,
        }
        dispatch(addFastTask(newTask))
      }
      setName('')
      inputRef.current.textContent = ''
    }
  }

  const handleClick = () => {
    const newText = inputRef.current.textContent.trim()
    if (!newText || newText === '' || newText === 'Task Name') {
      return
    } else {
      const newTask = {
        ...task,
        name: newText,
      }
      dispatch(addFastTask(newTask))
    }
    setName('')
    inputRef.current.textContent = ''
  }

  useEffect(() => {
    inputRef.current.textContent = name
  }, [name])

  useEffect(() => {
    setName(name || '')
  }, [name])

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  return (
    <div className={styles.main}>
      <div className='flex justify-center items-start w-full rounded-[10px] mb-3'>
        {/* <div
          placeholder={name}
          ref={inputRef}
          contentEditable='true'
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input}
        /> */}
        {/* <Editor /> */}
        <div className='w-[1px]'></div>
      </div>
      <div className='flex space-x-2 w-full mx-4'>
        <button
          className='flex text-14 items-center font-bold text-grayHover bg-gray pt-[4px] pb-[3px] px-2 rounded-[4px] justify-center'
          onClick={handleClick}>
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
