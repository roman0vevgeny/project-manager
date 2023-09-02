import React from 'react'
import styles from './Button.module.scss'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const Button = ({ svgLeft, svgRight, children, ...props }) => {
  return (
    <button
      className={children ? styles.main : `${styles.main} max-w-[25px] px-0`}
      {...props}>
      {svgLeft && svgLeft}
      {typeof children === 'string'
        ? capitalizeFirstLetter(children)
        : children}
      {svgRight && svgRight}
    </button>
  )
}

export default Button
