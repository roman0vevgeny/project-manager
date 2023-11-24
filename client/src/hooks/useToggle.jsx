import React, { useState } from 'react'

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleRotation = () => {
    setIsRotated(!isRotated)
  }

  return { isOpen, isRotated, toggleDropdown, toggleRotation }
}

export default useToggle
