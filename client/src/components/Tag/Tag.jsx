import React from 'react'
import styles from './Tag.module.scss'
import Delete from '../svgs/Delete'
import MediumTag from '../svgs/MediumTag'
import SmallTag from '../svgs/SmallTag'

// const capitalize = (string) => {
//   return string.toUpperCase()
// }

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
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
      <div className={`${styles.iconBg} ${styles[tagType]}`}>
        <SmallTag />
      </div>

      <p className='mr-[3px]'>
        {typeof tagName === 'string' ? capitalizeFirstLetter(tagName) : tagName}
      </p>
      {deleteTag && (
        <div
          className={`${styles[tagType]} ${styles.delete}`}
          onClick={onDelete}>
          <Delete />
        </div>
      )}
    </div>
  )
}

export default Tag
