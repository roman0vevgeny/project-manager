import React from 'react'
import styles from './AccountButton.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase()
}

const AccountButton = ({ name }) => {
  return (
    <div className={styles.main}>
      <p className='text-18 font-medium w-full leading-3'>
        {capitalizeFirstLetter(name)}
      </p>
    </div>
  )
}

export default AccountButton
