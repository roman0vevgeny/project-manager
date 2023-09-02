import React from 'react'
import styles from './Tag.module.scss'
import Delete from '../svgs/Delete'

const capitalize = (string) => {
  return string.toUpperCase()
}

const Tag = ({ tagName, color, deleteTag, onDelete, checked, isDragging }) => {
  const getTagType = (color) => {
    switch (color) {
      case 'red':
        return 'red'
      case 'blue':
        return 'blue'
      case 'green':
        return 'green'
      case 'yellow':
        return 'yellow'
      case 'purple':
        return 'purple'
      case 'sea':
        return 'sea'
      case 'gray':
        return 'gray'
      case 'pink':
        return 'pink'
      default:
        return 'gray'
    }
  }

  const tagType = getTagType(color)

  return (
    <div
      className={
        (!checked ? `${styles.tagBg} ${styles[tagType]}` : styles.tagBg) +
        ' ' +
        (isDragging ? 'shadow-md' : '')
      }>
      <p>{typeof tagName === 'string' ? capitalize(tagName) : tagName}</p>
      {deleteTag && (
        <div
          className={`${styles.tagBg} ${styles[tagType]} ${styles.delete}`}
          onClick={onDelete}>
          <Delete />
        </div>
      )}
    </div>
  )
}

export default Tag
