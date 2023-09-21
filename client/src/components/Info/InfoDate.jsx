import React from 'react'
import styles from './InfoDate.module.scss'
import { isNotExpired } from '../../helpers/isNotExpired'
import { isToday } from '../../helpers/isToday'
import Delete from '../svgs/Delete'

const InfoDate = ({ svg, children, expirationDate, checked, onDelete }) => {
  const notExpired = isNotExpired(expirationDate, checked)
  const today = isToday(expirationDate, checked)
  return (
    <div>
      {!checked ? (
        <div
          className={
            today
              ? styles.todayMain
              : notExpired
              ? styles.main
              : styles.expiredMain
          }>
          <div
            className={
              today
                ? 'flex mx-[4px] text-blueTag'
                : notExpired
                ? 'flex mx-[4px] text-grayHover'
                : 'flex mx-[4px] text-redTag'
            }>
            {svg}
          </div>
          <div
            className={
              today
                ? 'mt-[1px] text-blueTag leading-0'
                : notExpired
                ? 'mt-[1px] text-grayHover leading-0'
                : 'mt-[1px] text-redTag leading-0'
            }>
            {today ? 'Today' : children}
          </div>
          <div className={styles.onDelete} onClick={onDelete}>
            <Delete />
          </div>
        </div>
      ) : (
        <div className={styles.mainChecked}>
          <div className='flex mx-[4px] text-gray'>{svg}</div>
          <div className='mt-[2px] text-gray'>{today ? 'Today' : children}</div>
        </div>
      )}
    </div>
  )
}

export default InfoDate
