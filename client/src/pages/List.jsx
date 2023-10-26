import React, { useState, useRef, useEffect, useCallback } from 'react'
import ListItem from '../components/ListItem/ListItem'
import styles from './Home.module.scss'
import SectionName from '../components/SectionName/SectionName'
import CreateButton from '../components/Button/CreateButton'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateTasksOrder } from '../features/tasksSlice'
import InfoBlock from '../components/Info/IndoBlock'
import ScrollButton from '../components/Button/ScrollButton'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  todayTasksSelector,
  expiredTasksSelector,
} from '../features/taskMemoSelectors'
import FastTask from '../components/FastTask/FastTask'
import Plus from '../components/svgs/Plus'

const List = () => {
  const [isShowButton, setIsShowButton] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [openFastTask, setOpenFastTask] = useState(false)

  let location = useLocation()
  const dispatch = useDispatch()

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId)
  }

  const handleOpenFastTask = () => {
    setOpenFastTask(true)
  }

  const handleCloseFastTask = () => {
    setOpenFastTask(false)
  }

  const getTasksByPath = (path) => {
    switch (path) {
      case '/home/list':
        return useSelector((state) => state.tasks.tasks)
      case '/today/list':
        return useSelector(todayTasksSelector)
      case '/expired/list':
        return useSelector(expiredTasksSelector)
      default:
        return []
    }
  }

  const tasks = getTasksByPath(location.pathname)
  console.log('List - tasks:', tasks)

  const sectionRef = useRef(null)

  const isDragDisabled = () => {
    const path = location.pathname
    return path === '/today/list' || path === '/expired/list'
  }

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
    const newTasks = [...tasks]
    const [removed] = newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, removed)
    dispatch(
      updateTasksOrder({
        tasks: newTasks,
      })
    )
  }

  const renderSectionName = (path) => {
    switch (path) {
      case '/home/list':
        return <SectionName name={'Tasks'} />
      case '/today/list':
        return <SectionName name={'Today'} />
      case '/expired/list':
        return <SectionName name={'Expired'} />
      default:
        return null
    }
  }

  const renderCreateButton = (path, bigButton) => {
    switch (path) {
      case '/home/list':
        return <CreateButton bigButton={bigButton} />
      case '/today/list':
        return <CreateButton today={true} bigButton={bigButton} />
      case '/expired/list':
        return <CreateButton bigButton={bigButton} />
      default:
        return null
    }
  }

  const handleOpenModal = () => {
    console.log('List - Opening modal')
    setOpen(true)
  }

  return (
    <div className={styles.main}>
      {Array.isArray(tasks) && tasks.length === 0 ? (
        <InfoBlock location={location.pathname} />
      ) : (
        <section ref={sectionRef} className={styles.scrollable}>
          <div className='mb-[50px]'>
            <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
              {renderSectionName(location.pathname)}
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
                              key={`${task.id}`}
                              draggableId={`${task.id}`}
                              index={index}
                              isDragDisabled={isDragDisabled()}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <div onClick={handleOpenModal}>
                                    <ListItem
                                      taskId={task.id}
                                      onSelectTask={handleSelectTask}
                                      onClick={() => handleSelectTask(task.id)}
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
              <div className='flex flex-col'>
                <div className='flex justify-between mr-5 mt-5'>
                  {!openFastTask && (
                    <div className='flex flex-row justify-between w-full mx-2'>
                      <div className='h-[2px]'></div>
                      <div
                        onClick={handleOpenFastTask}
                        className='flex items-center text-grayHover px-3 text-14 font-bold py-[3px] rounded-[4px] bg-gray cursor-pointer'>
                        <div className='mr-1'>
                          <Plus />
                        </div>
                        <div>Add task</div>
                      </div>
                    </div>
                  )}
                </div>
                {openFastTask && (
                  <div className='mx-6'>
                    <FastTask
                      onClose={handleCloseFastTask}
                      onChange={(newTask) => dispatch(addTask(newTask))}
                    />
                  </div>
                )}
                <div className='flex w-[510px] flex-col space-y-5 mt-5'></div>
              </div>
            </div>
          </div>
          {isShowButton && <ScrollButton sectionRef={sectionRef} />}
        </section>
      )}

      {renderCreateButton(location.pathname, true)}
      <Modal
        open={selectedTaskId !== null}
        onClose={() => handleSelectTask(null)}
        children={
          <EditTaskModal
            task={tasks.find((task) => task.id === selectedTaskId)}
            onClose={() => handleSelectTask(null)}
          />
        }
      />
    </div>
  )
}

export default List
