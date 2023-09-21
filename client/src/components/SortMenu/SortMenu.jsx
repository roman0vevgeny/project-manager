import React, { useRef, useState } from 'react'
import styles from './SortMenu.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SortMenu = ({ name, onSortChange, onClose }) => {
  const [text, setText] = useState(name)

  const handleChange = (e) => {
    setText(e.target.value)
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

  const items = [
    { id: 1, name: 'Sort by name' },
    { id: 2, name: 'Sort by date' },
    { id: 3, name: 'Sort by priority' },
    { id: 4, name: 'Sort by status' },
  ]

  return (
    <div className='flex flex-col w-fit mt-[1px] bg-mainBg text-start rounded-b-md overflow-hidden transition-all duration-200 ease-in-out max-h-screen opacity-100 rounded-[5px]'>
      <ul className='py-1 w-fit transition-all duration-200 ease-in-out'>
        {items.map((item) => (
          <li
            key={item.id}
            className='text-grayHover hover:bg-gray cursor-pointer text-12 py-1 px-2 w-full'
            onClick={() => {
              onSortChange(item.name)
              onClose()
            }}>
            <span className='text-14 truncate'>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SortMenu
