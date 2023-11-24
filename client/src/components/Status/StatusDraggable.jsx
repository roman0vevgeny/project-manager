import React, { useState } from 'react'
import styles from '../TaskModal/ProjectForm/Project/ProjectDraggable.module.scss'
import Delete from '../svgs/Delete'
import StatusModal from './StatusModal'
import Modal from '../Modal/Modal'
import { getStatusSmallIcon } from './returnStatusIcons'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const StatusDraggable = ({ status, onDelete, isDragging }) => {
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  //   const handleEscapePress = (e) => {
  //     if (e.key === 'Escape') {
  //       e.preventDefault()
  //       handleCloseModal()
  //     }
  //   }

  return (
    <>
      <div onClick={handleOpenModal}>
        <div
          className={
            styles.withDeleteStatus +
            ' ' +
            (isDragging
              ? 'shadow-lg bg-gray text-grayHover border-1 border-grayHover rounded-[8px]'
              : 'border-1 border-transparent rounded-[8px]')
          }>
          <div className='flex items-center text-gray w-full'>
            <div className={styles.folder}>
              {getStatusSmallIcon(status.icon)}
            </div>
            <p>{capitalizeFirstLetter(status.name)}</p>
            {status.name !== 'To-do' &&
              status.name !== 'Done' &&
              status.name !== 'In progress' && (
                <div className={styles.svg} onClick={onDelete}>
                  <Delete />
                </div>
              )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        fit={true}
        onClose={handleCloseModal}
        children={<StatusModal status={status} onClose={handleCloseModal} />}
      />
    </>
  )
}

export default StatusDraggable
