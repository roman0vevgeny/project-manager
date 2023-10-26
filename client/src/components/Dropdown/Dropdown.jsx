import React, { useState } from 'react'
import Tag from '../Tag/Tag'
import Arrow from '../svgs/Arrow'
import { useDispatch, useSelector } from 'react-redux'
import { updateTagsOrder, deleteTag } from '../../features/tagsSlice'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import styles from './Dropdown.module.scss'
import { updateTaskTags } from '../../features/tasksSlice'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const Dropdown = ({ children, svg }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)

  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const tags = useSelector((state) => state.tags)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleRotation = () => {
    setIsRotated(!isRotated)
  }

  // const handleDeleteTag = (tag) => {
  //   dispatch(deleteTag(tag.id))
  // }

  const handleDeleteTag = (tag) => {
    const findTasks = tasks.filter((task) => task.tags.includes(tag.id))
    for (let task of findTasks) {
      const newTags = task.tags.filter((tagId) => tagId !== tag.id)
      dispatch(updateTaskTags({ id: task.id, tags: newTags }))
    }
    dispatch(deleteTag(tag.id))
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return
    }

    const newTags = [...tags]
    const [removed] = newTags.splice(source.index, 1)
    newTags.splice(destination.index, 0, removed)
    dispatch(
      updateTagsOrder({
        tags: newTags,
      })
    )
  }

  // console.log(tags)

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
        className={`flex w-full mt-[1px] bg-mainBg rounded-b-md max-h-0 overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'opacity-0'
        }`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'1'}>
            {(provided, snapshot) => (
              <div
                className={
                  snapshot.isDraggingOver
                    ? 'pb-[7px] pt-[7px]'
                    : 'pb-[7px] pt-[7px]'
                }
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <Draggable
                      key={tag.id}
                      draggableId={`${tag.id}`}
                      index={index}>
                      {(provided, snapshot) => (
                        <li
                          className='flex px-7 pt-[1px]'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <Tag
                            color={tag.color}
                            tagName={tag.name}
                            deleteTag={true}
                            // key={tag.id}
                            onDelete={() => handleDeleteTag(tag)}
                            isDragging={snapshot.isDragging}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className='text-14 flex px-7 py-[2px] text-grayHover'>
                    No tags yet
                  </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Dropdown
