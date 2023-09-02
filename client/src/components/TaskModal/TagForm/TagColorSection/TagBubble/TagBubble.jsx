import React from 'react'
import styles from './TagBubble.module.scss'

const TagBubble = ({ color, onColorSelect, selected }) => {
  const getTagType = (color) => {
    switch (color) {
      case 'red':
        return 'red'
      case 'pink':
        return 'pink'
      case 'purple':
        return 'purple'
      case 'blue':
        return 'blue'
      case 'sea':
        return 'sea'
      case 'green':
        return 'green'
      case 'yellow':
        return 'yellow'
      case 'gray':
        return 'gray'
      default:
        return 'gray'
    }
  }

  const tagType = getTagType(color)
  const handleClick = () => {
    onColorSelect(color)
  }

  return (
    <div
      className={
        color
          ? `${styles.tagOuter} ${styles[`${tagType}Outer`]} ${
              selected ? styles.selected : ''
            }`
          : styles.tagOuter
      }
      onClick={handleClick}>
      <div
        className={
          color
            ? `${styles.tagInner} ${styles[`${tagType}Inner`]}`
            : styles.Inner
        }></div>
    </div>
  )
}

export default TagBubble
