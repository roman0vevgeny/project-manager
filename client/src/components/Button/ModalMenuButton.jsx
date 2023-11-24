import React, { useEffect } from 'react'
import styles from './ModalMenuButton.module.scss'
import { isNotExpired } from '../../helpers/isNotExpired'
import { isToday } from '../../helpers/isToday'
import Plus from '../svgs/Plus'
import History from '../svgs/History'
import { useSelector } from 'react-redux'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const ModalMenuButton = ({
  children,
  svgLeft,
  onClick,
  expirationDate,
  checked,
  priority,
  status,
  doc,
}) => {
  const adjustedDate = expirationDate && new Date(expirationDate)
  adjustedDate && adjustedDate.setDate(adjustedDate.getDate() + 1)
  const notExpired =
    adjustedDate &&
    typeof adjustedDate === 'object' &&
    isNotExpired(adjustedDate.toISOString(), checked)
  const today =
    adjustedDate &&
    typeof adjustedDate === 'object' &&
    isToday(adjustedDate.toISOString(), checked)

  const allStatuses = useSelector((state) => state.statuses)
  const taskStatus = allStatuses.find((stat) => stat.name === status)

  const renderExpirationDate = () => {
    return (
      <button className={styles.main} onClick={onClick}>
        <div className={styles.icon}>
          <div
            className={
              notExpired
                ? today
                  ? 'pb-[1px] text-blueTag'
                  : 'pb-[1px] text-grayHover'
                : 'pb-[1px] text-redTag'
            }>
            {svgLeft && svgLeft}
          </div>
          {typeof children === 'string'
            ? `${capitalizeFirstLetter(children)}`
            : children}
        </div>
        <div className={styles.history}>{<History />}</div>
      </button>
    )
  }

  return (
    <>
      {!expirationDate ? (
        <button className={styles.main} onClick={onClick}>
          <div className={styles.icon}>
            <div
              className={
                'pb-[1px] truncate' +
                ' ' +
                (priority && priority === 'Low'
                  ? 'text-blueTag'
                  : priority && priority === 'Medium'
                  ? 'text-yellowTag'
                  : priority && priority === 'High'
                  ? 'text-redTag'
                  : 'text-grayHover')
              }>
              {svgLeft && svgLeft}
            </div>
            {status ? `${taskStatus.name}` : children}
            {doc ? `${doc}` : ''}
          </div>
          <div className={styles.counter}>{<Plus />}</div>
        </button>
      ) : (
        renderExpirationDate()
      )}
    </>
  )
}

export default ModalMenuButton
