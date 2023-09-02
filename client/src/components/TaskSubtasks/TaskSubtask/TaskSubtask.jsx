import React from 'react'
import styles from './TaskSubtask.module.scss'

const Subtask = ({ subtask, checked, taskChecked }) => {
  return (
    <div className='flex flex-row justify-between items-start w-full mt-[1px]'>
      <p
        className={
          (checked ? styles.inputChecked : styles.input) +
          ' ' +
          (taskChecked ? styles.inputChecked : styles.input)
        }>
        {subtask.name}
      </p>
    </div>
  )
}

export default Subtask
