import React from 'react'
import styles from './InfoDateSmall.module.scss'
import { isNotExpired } from '../../helpers/isNotExpired'
import { isToday } from '../../helpers/isToday'
import Delete from '../svgs/Delete'

const InfoDateSmall = ({
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
      <div className='flex w-[12px] h-[15px] justify-center items-center'>
        {svg}
      </div>
      {children && !onDelete ? (
        <div
          className={
            today && !checked
              ? 'whitespace-nowrap text-blueTagSecond transition-all duration-200 ease-in-out'
              : notExpired
              ? 'whitespace-nowrap text-gray transition-all duration-200 ease-in-out'
              : 'whitespace-nowrap text-redTagSecond transition-all duration-200 ease-in-out'
          }>
          {today ? 'Today' : children}
        </div>
      ) : (
        <div
          className={
            today && !checked
              ? 'whitespace-nowrap text-blueTagSecond flex flex-row'
              : notExpired
              ? 'whitespace-nowrap text-grayHover flex flex-row'
              : 'whitespace-nowrap text-redTagSecond flex flex-row'
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

export default InfoDateSmall
