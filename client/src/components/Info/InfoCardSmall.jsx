import React from 'react'
import styles from './InfoCardSmall.module.scss'
import Delete from '../svgs/Delete'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const InfoCardSmall = ({ svg, children, color, onDelete }) => {
  return (
    <>
      {!color ? (
        <div className={styles.main}>
          <div className='flex w-[12px] h-[15px] justify-center items-center'>
            {svg}
          </div>
          {children && (
            <div className='whitespace-nowrap'>
              {capitalizeFirstLetter(children)}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.delete}>
          <div
            className={
              'flex w-fit h-[15px] justify-center items-center rounded-[5px] pr-[5px]' +
              ' ' +
              color
            }>
            {svg}
            <div className={styles.svg} onClick={onDelete}>
              <Delete />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoCardSmall
