import React, { useEffect } from 'react'
import styles from './ModalMenuButton.module.scss'
import { isNotExpired } from '../../helpers/isNotExpired'
import { isToday } from '../../helpers/isToday'
import Plus from '../svgs/Plus'
import History from '../svgs/History'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const ModalMenuButton = ({
  children,
  svgLeft,
  onClick,
  expirationDate,
  checked,
  onClose,
  priority,
  status,
}) => {
  const adjustedDate = expirationDate && new Date(expirationDate) // преобразуем expirationDate в объект Date
  adjustedDate && adjustedDate.setDate(adjustedDate.getDate() + 1) // вычитаем один день из объекта Date
  const notExpired =
    adjustedDate &&
    typeof adjustedDate === 'object' &&
    isNotExpired(adjustedDate.toISOString(), checked) // преобразуем объект Date обратно в строку и используем ее вместо expirationDate
  const today =
    adjustedDate &&
    typeof adjustedDate === 'object' &&
    isToday(adjustedDate.toISOString(), checked) // преобразуем объект Date обратно в строку и используем ее вместо expirationDate

  const getStatusText = (status) => {
    switch (status) {
      case 'todo':
        return 'To do'
      case 'inprogress':
        return 'In progress'
      case 'done':
        return 'Done'
      default:
        return 'To do'
    }
  }

  return (
    <>
      {!expirationDate ? (
        <button className={styles.main} onClick={onClick}>
          <div className={styles.icon}>
            <div
              className={
                'pb-[1px]' +
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
            {status ? `Status: ${getStatusText(status)}` : children}
          </div>
          <div className={styles.counter}>{<Plus />}</div>
        </button>
      ) : (
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
              ? `Due: ${capitalizeFirstLetter(children)}`
              : children}
          </div>
          <div className={styles.history}>{<History />}</div>
        </button>
      )}
    </>
  )
}

export default ModalMenuButton
