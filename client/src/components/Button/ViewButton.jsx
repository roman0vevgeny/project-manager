import React from 'react'
import styles from './ViewButton.module.scss'
import { NavLink } from 'react-router-dom'

const ViewButton = ({ svg, to }) => {
  return (
    <NavLink to={to} className={styles.button} activeClassName={styles.active}>
      {svg}
    </NavLink>
  )
}

export default ViewButton
