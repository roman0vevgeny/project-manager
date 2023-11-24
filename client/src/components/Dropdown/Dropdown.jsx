import React, { useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Arrow from '../svgs/Arrow'
import styles from './Dropdown.module.scss'
import Plus from '../svgs/Plus'
import Modal from '../Modal/Modal'
import StatusCreateModal from '../Status/StatusCreateModal'
import ProjectModal from '../ProjectModal/ProjectModal'
import ArrowSmall from '../svgs/ArrowSmall'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const Dropdown = ({
  isOpen,
  isRotated,
  toggleDropdown,
  toggleRotation,
  onDragEnd,
  renderList,
  button,
  children,
  svg,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => {
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }

  // console.log('toggleDropdown: ', toggleDropdown)

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
            {/* {<Arrow />} */}
            {<ArrowSmall />}
          </div>
        </div>
      </button>
      <div
        className={`flex flex-col w-full mt-[1px] max-h-0 bg-mainBg rounded-b-[8px] overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'opacity-0'
        }`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'1'}>
            {(provided, snapshot) => (
              <div
                className='py-2'
                // className={snapshot.isDraggingOver ? '' : ''}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {renderList}
                {/* {provided.placeholder} */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {button && (
          <button
            className='w-full flex flex-row items-center text-14 p-[5px] text-blueTag mb-2 mt-0 text-start hover:bg-gray hover:text-grayHover'
            onClick={handleOpenModal}>
            <div className='mr-2 ml-6'>
              <Plus />
            </div>
            {button}
          </button>
        )}
        {button && button === 'Add status' && (
          <Modal
            open={open}
            fit={true}
            onClose={handleCloseModal}
            children={<StatusCreateModal onClose={handleCloseModal} />}
          />
        )}
        {button && button === 'Add project' && (
          <Modal
            open={open}
            fit={true}
            onClose={handleCloseModal}
            children={<ProjectModal onClose={handleCloseModal} />}
          />
        )}
      </div>
    </div>
  )
}

export default Dropdown
