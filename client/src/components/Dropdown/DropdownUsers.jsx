import React, { useState } from 'react'
import Arrow from '../svgs/Arrow'
import styles from './Dropdown.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { updateUsersOrder } from '../../features/usersSlice'
import UserDraggable from '../TaskModal/DeligateBlock/UserDraggable'
import { useNavigate, NavLink } from 'react-router-dom'
import ArrowSmall from '../svgs/ArrowSmall'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const DropdownUsers = ({ children, svg }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  // console.log('users: ', users)

  const navigate = useNavigate()

  const view = localStorage.getItem('view')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleRotation = () => {
    setIsRotated(!isRotated)
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

    dispatch(
      updateUsersOrder({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    )
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
            {/* {<Arrow />} */}
            {<ArrowSmall />}
          </div>
        </div>
      </button>
      <div
        className={`flex flex-col w-full mt-[1px] bg-mainBg rounded-b-md max-h-0 overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'opacity-0'
        }`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'1'}>
            {(provided, snapshot) => (
              <div
                className={
                  snapshot.isDragging
                    ? 'pb-[7px] pt-[7px] px-1'
                    : 'pb-[7px] pt-[7px] px-1'
                }
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <Draggable
                      key={user.id}
                      draggableId={`${user.id}`}
                      index={index}>
                      {(provided, snapshot) => (
                        <li
                          className={
                            snapshot.isDragging ? 'flex w-full' : 'flex w-full'
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <NavLink
                            to={`/users/${user.id}${view}`}
                            className={(navData) =>
                              navData.isActive ? styles.active : styles.nav
                            }>
                            <UserDraggable
                              userName={user.name}
                              userId={user.id}
                              isDragging={snapshot.isDragging}
                              userColor={user.color}
                              tasks={user.tasks.length}
                              onClick={() =>
                                navigate(`/users/${user.id}${view}`)
                              }
                            />
                          </NavLink>
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className='text-14 flex px-7 py-[2px] text-grayHover'>
                    No users yet
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

export default DropdownUsers
