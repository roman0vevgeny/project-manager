import React, { useState } from 'react'
import Button from './Button'
import Plus from '../svgs/Plus'
import Modal from '../Modal/Modal'
import CreateTaskModal from '../TaskModal/CreateTaskModal'
import BigPlus from '../svgs/BigPlus'

const CreateButton = ({ children, today, bigButton, projectId, userId }) => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <div>
      {!bigButton ? (
        <Button
          svgLeft={<Plus />}
          onClick={handleOpenModal}
          children={'Add task'}
        />
      ) : (
        <div
          className='absolute h-[50px] w-[50px] bottom-[100px] right-[50px] m-3 p-5 bg-[var(--checkbox-active)] rounded-full cursor-pointer shadow-md hover:bg-menu text-[var(--color-main-bg)] hover:text-menu transition-all duration-200 ease-in-out'
          onClick={handleOpenModal}>
          <div className='relative'>
            <div className='absolute top-[-3px] left-[-4px] rotate-180'>
              <BigPlus />
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={onClose}
        children={
          <CreateTaskModal
            onClose={onClose}
            today={today}
            projectId={projectId}
            userId={userId}
          />
        }
      />
    </div>
  )
}

export default CreateButton
