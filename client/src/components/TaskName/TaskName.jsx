import React from 'react'
import styles from './TaskName.module.scss'

const TaskName = ({ name, checked, cards }) => {
  return (
    <div className={cards ? styles.textBig : styles.textSmall}>
      <h3 className={checked ? styles.textChecked : styles.text}>{name}</h3>
    </div>
  )
}

export default TaskName
