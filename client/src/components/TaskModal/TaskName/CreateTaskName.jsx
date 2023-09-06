import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Edit from '../../svgs/Edit'
import styles from './CreateTaskName.module.scss'
import ModalButton from '../../Button/ModalButton'

const CreateTaskName = ({ name, setName }) => {
  const inputRef = useRef(null)

  const [text, setText] = useState(name || '')

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
      inputRef.current.blur()
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
    <div className='flex flex-row justify-between mx-2 items-start mt-2 mb-5'>
      <div
        placeholder={name}
        ref={inputRef}
        contentEditable='true'
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={text === '' ? `${styles.input} bg-redTag` : styles.input}
      />
      {/* <div className='flex flex-row mt-1'>
        <ModalButton svg={<Edit />} onClick={handleFocus} />
      </div> */}
    </div>
  )
}

export default CreateTaskName
