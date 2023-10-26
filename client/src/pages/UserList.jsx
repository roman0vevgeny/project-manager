import React, { useState, useRef, useEffect, useCallback } from 'react'
import ListItem from '../components/ListItem/ListItem'
import styles from './Home.module.scss'
import SectionUserName from '../components/SectionName/SectionUserName'
import CreateButton from '../components/Button/CreateButton'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import InfoBlock from '../components/Info/IndoBlock'
import ScrollButton from '../components/Button/ScrollButton'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { updateTasksInUser } from '../features/usersSlice'
import { useParams } from 'react-router-dom'
import { selectTaskById } from '../helpers/selectTaskById'

const UserList = () => {
  const [isShowButton, setIsShowButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  let location = useLocation()
  const dispatch = useDispatch()
  const { userId } = useParams()
  const userIdToNumber = Number(userId)

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userIdToNumber)
  )

  const tasks = user && user.tasks
  console.log('UserList - tasks: ', tasks)

  const handleSelectTask = (task) => {
    setSelectedTaskId(task)
  }

  const selectedTask = useSelector((state) =>
    selectTaskById(state, selectedTaskId)
  )
  const sectionRef = useRef(null)

  const handleScroll = useCallback(() => {
    const position = sectionRef.current.scrollTop
    if (position > 300) {
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }
  }, [sectionRef])

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [sectionRef])

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
    const newUserTasks = [...tasks]
    const [removed] = newUserTasks.splice(source.index, 1)
    newUserTasks.splice(destination.index, 0, removed)
    console.log('newUserTasks: ', newUserTasks)
    dispatch(
      updateTasksInUser({
        userId: userIdToNumber,
        tasks: newUserTasks,
      })
    )
    const userCopy = { ...user }
    userCopy.tasks = newUserTasks
  }

  const renderCreateButton = (bigButton, projectId) => {
    return <CreateButton bigButton={bigButton} userId={userIdToNumber} />
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      {user ? (
        <div className={styles.main}>
          {Array.isArray(tasks) && tasks.length === 0 ? (
            <div className='text-task m-0 transition-all duration-200 ease-in-out'>
              <InfoBlock location={location.pathname} />
              <p>Teammate has no deligate tasks</p>
              <p className='text-gray'>Add tasks to teammate</p>
            </div>
          ) : (
            <section ref={sectionRef} className={styles.scrollable}>
              <div className='mb-[50px]'>
                <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
                  <SectionUserName
                    name={user.name}
                    editable={true}
                    userId={userIdToNumber}
                  />
                </div>

                <div className='z-[0]'>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'1'} className='z-[0]'>
                      {(provided, snapshot) => {
                        const { droppableProps, innerRef, ...rest } = provided
                        return (
                          <div
                            className={
                              snapshot.isDraggingOver
                                ? 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-stroke'
                                : 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-borderMain transition-all duration-200 ease-in-out'
                            }
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...rest}>
                            {tasks &&
                              tasks.map((task, index) => (
                                <Draggable
                                  key={task}
                                  draggableId={`${task}`}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}>
                                      <div onClick={handleOpenModal}>
                                        <ListItem
                                          taskId={task}
                                          onSelectTask={handleSelectTask}
                                          onClick={() => handleSelectTask(task)}
                                          isDragging={snapshot.isDragging}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}

                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </DragDropContext>
                  <div className='flex justify-between mr-5 mt-5'>
                    <div></div>
                    {renderCreateButton(true, userIdToNumber)}
                  </div>
                </div>
              </div>
              {isShowButton && <ScrollButton sectionRef={sectionRef} />}
            </section>
          )}
          {renderCreateButton(true, userIdToNumber)}
          <Modal
            open={selectedTaskId !== null}
            onClose={() => handleSelectTask(null)}
            children={
              selectedTask ? (
                <EditTaskModal
                  task={selectedTask}
                  onClose={() => handleSelectTask(null)}
                />
              ) : (
                <div>Задача не найдена</div>
              )
            }
          />
        </div>
      ) : (
        <div className='m-2 px-4 py-1 bg-yellowTag text-yellowTag text-14 flex justify-center h-fit rounded-md'>
          User not found or deleted
        </div>
      )}
    </>
  )
}

export default UserList
