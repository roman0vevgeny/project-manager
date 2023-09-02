import React from 'react'
import styles from './InfoCard.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const InfoCard = ({ svg, children }) => {
  return (
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
  )
}

export default InfoCard
