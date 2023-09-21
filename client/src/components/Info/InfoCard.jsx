import React from 'react'
import styles from './InfoCard.module.scss'
import Delete from '../svgs/Delete'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const InfoCard = ({ svg, children, color, onDelete }) => {
  return (
    <>
      {!color ? (
        <div className={styles.main}>
          <div className='flex w-[25px] h-[25px] justify-center items-center'>
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
              'flex w-fit h-[24px] justify-center items-center rounded-[5px] pl-2 pr-[5px]' +
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

export default InfoCard
