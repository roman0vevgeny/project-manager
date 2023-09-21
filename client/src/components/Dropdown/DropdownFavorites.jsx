import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Arrow from '../svgs/Arrow'
import styles from './Dropdown.module.scss'
import Modal from '../Modal/Modal'
import EditTaskModal from '../TaskModal/EditTaskModal'
import { getTaskById } from '../../helpers/getTaskById'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const DropdownFavorites = ({ children, items = [], svg }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  const [openModal, setOpenModal] = useState(null)

  const task = useSelector((state) =>
    openModal ? getTaskById(state, openModal.id) : null
  )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleRotation = () => {
    setIsRotated(!isRotated)
  }

  const handleOpenModal = (item) => {
    setOpenModal(item)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <button
        className={isOpen ? styles.open : styles.main}
        onClick={() => {
          toggleDropdown()
          toggleRotation()
        }}>
        <div className={styles.icon}>
          {svg && svg}
          <div className='pt-[2px]'>
            {typeof children === 'string'
              ? capitalizeFirstLetter(children)
              : children}
          </div>
        </div>
        <div className={styles.counter}>
          <div
            className={
              isRotated
                ? '-rotate-120 transition-all duration-200 ease-in-out'
                : '-rotate-90 transition-all duration-200 ease-in-out'
            }>
            {<Arrow />}
          </div>
        </div>
      </button>
      <div
        className={`flex flex-col w-full mt-[1px] bg-mainBg rounded-b-md max-h-0 overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'opacity-0'
        }`}>
        <ul className='py-2 w-[270px] border-1 border-borderMain transition-all duration-200 ease-in-out'>
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item.id}
                className={styles.item}
                onClick={() => handleOpenModal(item)}>
                <span className='text-14 truncate'>{item.name}</span>
              </li>
            ))
          ) : (
            <p className='text-14 flex px-7 text-grayHover truncate'>
              No favorites yet
            </p>
          )}
        </ul>
      </div>
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          children={
            <EditTaskModal
              task={task}
              onClose={(e) => handleCloseModal()}
              // formatDate={formatDate}
            />
          }
        />
      )}
    </div>
  )
}

export default DropdownFavorites
