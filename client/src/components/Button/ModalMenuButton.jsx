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
}) => {
  const notExpired =
    expirationDate &&
    typeof expirationDate === 'string' &&
    isNotExpired(expirationDate, checked)
  const today =
    expirationDate &&
    typeof expirationDate === 'string' &&
    isToday(expirationDate, checked)
  console.log('expirationDate', expirationDate)

  // useEffect(() => {
  //   const handleEscapePress = (e) => {
  //     if (e.key === 'Escape') {
  //       onClose()
  //     }
  //   }

  //   window.addEventListener('keydown', handleEscapePress)
  //   return () => {
  //     window.removeEventListener('keydown', handleEscapePress)
  //   }
  // }, [onClose])

  return (
    <>
      {!expirationDate ? (
        <button className={styles.main} onClick={onClick}>
          <div className={styles.icon}>
            <div className='pb-[1px]'>{svgLeft && svgLeft}</div>
            {typeof children === 'string'
              ? capitalizeFirstLetter(children)
              : children}
          </div>
          <div className={styles.counter}>{<Plus />}</div>
        </button>
      ) : (
        <button className={styles.main} onClick={onClick}>
          <div className={styles.icon}>
            <div className='pb-[1px]'>{svgLeft && svgLeft}</div>
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
