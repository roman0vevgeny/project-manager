import React from 'react'
import styles from './TagSecond.module.scss'
import Delete from '../svgs/Delete'
import SmallTag from '../svgs/SmallTag'

// const capitalize = (string) => {
//   return string.toUpperCase()
// }

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const TagSecond = ({
  tagName,
  color,
  deleteTag,
  onDelete,
  checked,
  isDragging,
}) => {
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
      <div className='mr-[2px]'>
        <SmallTag />
      </div>
      <p>{capitalizeFirstLetter(tagName)}</p>
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

export default TagSecond
