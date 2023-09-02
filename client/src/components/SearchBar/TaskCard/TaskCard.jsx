import React, { useState } from 'react'
import styles from './TaskCard.module.scss'
import InfoCard from '../../Info/InfoCard'
import Subtasks from '../../svgs/Subtasks'
import Cal from '../../svgs/Cal'
import Modal from '../../Modal/Modal'
import EditTaskModal from '../../TaskModal/EditTaskModal'
import InfoExpiration from '../../Info/InfoExpiration'

const TaskCard = ({ task }) => {
  const [openModal, setOpenModal] = useState(null)
  const { name, expirationDate, subtasks, checked } = task

  const handleOpenModal = (item) => {
    console.log('Opening modal for:', item)
    setOpenModal(item)
  }

  const handleCloseModal = () => {
    console.log('Closing modal')
    setOpenModal(false)
  }

  const completedSubtasks = subtasks.filter((subtask) => subtask.checked).length

  console.log(expirationDate)

  return (
    <div className='font-medium'>
      <div className={styles.item} onClick={() => handleOpenModal(task)}>
        <p className={styles.searchText}>{name}</p>
        <div className={styles.infoBlock}>
          {expirationDate && (
            <InfoExpiration
              children={new Date(expirationDate).toLocaleDateString(
                navigator.language,
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                }
              )}
              svg={<Cal />}
              expirationDate={expirationDate}
            />
          )}
          {subtasks.length > 0 && (
            <InfoCard
              children={`${completedSubtasks}/${subtasks.length}`}
              svg={<Subtasks />}
            />
          )}
        </div>
      </div>
      {openModal && (
        <Modal
          open={task}
          onClose={handleCloseModal}
          children={
            <EditTaskModal
              task={task}
              onClose={(e) => handleCloseModal()}
              //   formatDate={formatDate}
            />
          }
        />
      )}
    </div>
  )
}

export default TaskCard
