import React, { useRef, useState } from 'react'
import CreateButton from '../Button/CreateButton'
import Button from '../Button/Button'
import Edit from '../svgs/Edit'
import styles from './SectionName.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionName = ({ name, editable }) => {
  const [text, setText] = useState(name)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleFocus = () => {
    inputRef.current.focus()
  }

  const handleMouseDown = (e) => {
    if (!editable) {
      e.preventDefault()
    }
    return
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
    }
  }

  const handleBlur = () => {
    if (text.trim() === '') {
      setText(name)
    }
  }

  return (
    <div className=''>
      <div className='flex flex-row justify-between mx-2 items-center mb-2'>
        <input
          className={styles.input}
          placeholder={name}
          value={capitalizeFirstLetter(text)}
          ref={inputRef}
          onChange={handleChange}
          readOnly={!editable}
          tabIndex={!editable ? -1 : undefined}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <div className='flex flex-row'>
          {editable && <Button svgLeft={<Edit />} onClick={handleFocus} />}
        </div>
      </div>
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionName
