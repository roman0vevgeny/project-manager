import React from 'react'
import styles from './CheckBox.module.scss'
import Inprogress from '../svgs/Inprogress'
import Progress from '../svgs/Progress'

const CheckBox = ({ checked, priority, status }) => {
  const priorityColor = (priority) => {
    if (priority === 'Low') {
      return 'border-[var(--priority-blue)] text-[var(--priority-blue)]'
    } else if (priority === 'Medium') {
      return 'border-[var(--priority-yellow)] text-[var(--priority-yellow)]'
    } else if (priority === 'High') {
      return 'border-[var(--priority-red)] text-[var(--priority-red)]'
    } else {
      return 'border-checkbox'
    }
  }

  return (
    <div
      className={
        !checked ? styles.body + ' ' + priorityColor(priority) : styles.checked
      }>
      {checked && (
        <div className='flex items-center rounded-full text-white'>
          <svg
            width='12'
            height='12'
            viewBox='0 -2 12 12'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.18797 5.36744C4.58779 5.84769 5.32522 5.84769 5.72504 5.36744L9.56504 0.754866C9.90648 0.344732 10.5362 0.344732 10.8777 0.754866V0.754866C11.1412 1.07145 11.1412 1.53106 10.8777 1.84765L6.04557 7.65194C6.04553 7.65199 6.04546 7.65199 6.04542 7.65194V7.65194C6.04539 7.6519 6.04532 7.6519 6.04528 7.65194L5.50556 8.30026C5.22507 8.63718 4.70772 8.63718 4.42723 8.30026L1.12069 4.32847C0.859509 4.01474 0.859509 3.55928 1.12069 3.24555V3.24555C1.45905 2.83912 2.08313 2.83912 2.42149 3.24555L4.18797 5.36744Z'
            />
          </svg>
        </div>
      )}
      {!checked && status === 'inprogress' && (
        <div
          className={
            'flex items-center rounded-full' + ' ' + priorityColor(priority)
          }>
          <Inprogress />
          {/* <Progress /> */}
        </div>
      )}
    </div>
  )
}

export default CheckBox
