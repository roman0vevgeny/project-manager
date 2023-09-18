import React, { useState, useRef, useEffect } from 'react'
// import Edit from '../../../svgs/Edit'
import styles from './Subtask.module.scss'
import Close from '../../../svgs/Close'
import ModalButton from '../../../Button/ModalButton'
import Transform from '../../../svgs/Transform'

const Subtask = ({ subtask, onDelete, onChange, checked, onTransform }) => {
  const [text, setText] = useState(subtask.name)
  const [prevText, setPrevText] = useState(subtask.name)
  const inputRef = useRef(null)

  const [hovered, setHovered] = useState(false)

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
    if (text.trim() === '') {
      setText(prevText)
    }
    onChange(subtask.id, text)

    setHovered(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      inputRef.current.blur()
      onChange(subtask.id, text)
    }
  }

  const handleInput = () => {
    setText(inputRef.current.textContent)
  }

  useEffect(() => {
    inputRef.current.textContent = text
  }, [text])

  useEffect(() => {
    setPrevText(subtask.name)
    setText(subtask.name)
  }, [subtask])

  return (
    <div
      className='flex flex-row justify-between items-start w-full mt-[1px]'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        className={
          (checked ? styles.inputChecked : styles.input) +
          ' ' +
          (subtask.checked ? styles.inputChecked : styles.input)
        }
        placeholder={subtask}
        ref={inputRef}
        contentEditable='true'
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onInput={handleInput}
        onFocus={() => setHovered(true)}
      />
      {!checked && (
        <div className='flex'>
          {(hovered || inputRef.current === document.activeElement) && (
            <div className='flex flex-row mt-[1px]'>
              <ModalButton svg={<Transform />} onClick={onTransform} />
            </div>
          )}
          {(hovered || inputRef.current === document.activeElement) && (
            <div className='flex flex-row mt-[1px] hover:bg-redBg hover:text-redTag'>
              <ModalButton svg={<Close />} onClick={onDelete} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Subtask
