import React from 'react'
import styles from './InfoExpiration.module.scss'
import { isNotExpired } from '../../helpers/isNotExpired'
import { isToday } from '../../helpers/isToday'
import Delete from '../svgs/Delete'

const InfoExpiration = ({
  svg,
  children,
  expirationDate,
  checked,
  onDelete,
}) => {
  const notExpired = isNotExpired(expirationDate, checked)
  const today = isToday(expirationDate, checked)
  return (
    <div
      className={
        today && !checked
          ? styles.today
          : notExpired
          ? styles.notExpired
          : styles.expired
      }>
      <div className='flex w-[25px] h-[25px] justify-center items-center'>
        {svg}
      </div>
      {children && !onDelete ? (
        <div
          className={
            today && !checked
              ? 'whitespace-nowrap text-blueTag transition-all duration-200 ease-in-out'
              : notExpired
              ? 'whitespace-nowrap text-gray transition-all duration-200 ease-in-out'
              : 'whitespace-nowrap text-expired transition-all duration-200 ease-in-out'
          }>
          {today ? 'Today' : children}
        </div>
      ) : (
        <div
          className={
            today && !checked
              ? 'whitespace-nowrap text-blueTag flex flex-row '
              : notExpired
              ? 'whitespace-nowrap text-grayHover flex flex-row'
              : 'whitespace-nowrap text-expired flex flex-row'
          }>
          {today ? 'Today' : children}
          {onDelete && (
            <div className={styles.svg} onClick={onDelete}>
              <Delete />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InfoExpiration
