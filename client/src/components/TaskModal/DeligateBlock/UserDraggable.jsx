import React from 'react'
import styles from './UserDraggable.module.scss'
import { useNavigate } from 'react-router-dom'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const UserDraggable = ({ userName, isDragging, userId, userColor, tasks }) => {
  const navigate = useNavigate()

  const getUserBgColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blue
      case 'green':
        return styles.green
      case 'pink':
        return styles.pink
      case 'purple':
        return styles.purple
      case 'red':
        return styles.red
      case 'yellow':
        return styles.yellow
      case 'sea':
        return styles.sea
      case 'gray':
        return styles.gray
      default:
        return styles.blue
    }
  }

  const getUserTextColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blueText
      case 'green':
        return styles.greenText
      case 'pink':
        return styles.pinkText
      case 'purple':
        return styles.purpleText
      case 'red':
        return styles.redText
      case 'yellow':
        return styles.yellowText
      case 'sea':
        return styles.seaText
      case 'gray':
        return styles.grayText
      default:
        return styles.blueText
    }
  }

  const getUserFirstLetter = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div onClick={() => navigate(`/users/${userId}`)}>
      <div
        className={
          styles.main +
          ' ' +
          (isDragging
            ? 'shadow-lg bg-gray text-grayHover border-1 border-grayHover'
            : 'border-1 border-transparent border-b-borderMain')
        }>
        <div className='flex items-center'>
          <div
            className={
              styles.user +
              ' ' +
              getUserBgColor(userColor) +
              ' ' +
              getUserTextColor(userColor)
            }>
            {getUserFirstLetter(userName)}
          </div>
          <p className='leading-0'>{capitalizeFirstLetter(userName)}</p>
        </div>

        <div className='flex min-w-[15px] justify-center items-center'>
          {tasks}
        </div>
      </div>
    </div>
  )
}

export default UserDraggable
