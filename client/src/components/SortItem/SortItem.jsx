import React from 'react'
import styles from './SortItem.module.scss'
import Delete from '../svgs/Delete'
import Sort from '../svgs/Sort'

// const capitalizeFirstLetter = (string) => {
//   return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
// }

const SortItem = ({ sortType, onDelete }) => {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.sortsvg} onClick={onDelete}>
          <Sort />
        </div>
        <p className='flex flex-nowrap'>{sortType}</p>
        <div className={styles.svg} onClick={onDelete}>
          <Delete />
        </div>
      </div>
    </div>
  )
}

export default SortItem
