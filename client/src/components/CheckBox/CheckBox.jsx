import React from 'react'
import styles from './CheckBox.module.scss'
import Done from '../svgs/Done'

const CheckBox = ({ checked, toggleChecked }) => {
  // const handleClick = (e) => {
  //   e.stopPropagation()
  //   toggleChecked()
  // }

  return (
    <div
      className={!checked ? styles.body : styles.checked}
      // onClick={handleClick}>
    >
      {checked && <Done fill='#FF0000' />}
    </div>
  )
}

export default CheckBox
