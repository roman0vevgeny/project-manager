import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavButton.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const NavButton = ({ children, svgLeft, counter, to, onClick }) => {
  return (
    <NavLink
      to={to}
      className={(navData) => (navData.isActive ? styles.active : styles.main)}
      onClick={onClick}>
      <div className={styles.icon}>
        <div className='pb-[1px]'>{svgLeft && svgLeft}</div>
        {typeof children === 'string'
          ? capitalizeFirstLetter(children)
          : children}
      </div>
      <div className={styles.counter}>{counter && <p>{counter}</p>}</div>
    </NavLink>
  )
}

export default NavButton
