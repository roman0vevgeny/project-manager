import React, { useRef, useState } from 'react'
import CreateButton from '../Button/CreateButton'
import Button from '../Button/Button'
import Edit from '../svgs/Edit'
import styles from './SectionName.module.scss'
import Sort from '../svgs/Sort'
import DropdownModal from '../Modal/DropdownModal'
import SortMenu from '../SortMenu/SortMenu'
import SortItem from '../SortItem/SortItem'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionName = ({ name, editable }) => {
  const [text, setText] = useState(name)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const [sortType, setSortType] = useState(null)

  const handleSortChange = (type) => {
    setSortType(type)
  }

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

  const handleToggleModal = () => {
    setOpen((prev) => !prev)
  }

  const handleCloseModal = () => {
    setOpen(false)
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
        {sortType && (
          <SortItem sortType={sortType} onDelete={() => setSortType(null)} />
        )}
        <div className='relative flex flex-row'>
          <Button svgLeft={<Sort />} onClick={handleToggleModal} />
          <DropdownModal
            children={
              <SortMenu
                onSortChange={handleSortChange}
                onClose={handleCloseModal}
              />
            }
            open={open}
            onClose={handleCloseModal}
          />
        </div>
      </div>
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionName
