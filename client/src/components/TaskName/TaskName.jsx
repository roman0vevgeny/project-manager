import React from 'react'
import styles from './TaskName.module.scss'

const TaskName = ({ name, checked, cards, boards, calendar }) => {
  return (
    <div
      className={
        cards
          ? boards
            ? styles.textBoards
            : styles.textBig
          : calendar
          ? styles.textCal
          : styles.textSmall
      }>
      <h3 className={checked ? styles.textChecked : styles.text}>{name}</h3>
    </div>
  )
}

export default TaskName
