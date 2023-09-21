import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './Home.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { updateTasksOrder, updateTaskStatus } from '../features/tasksSlice'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import BoardItem from '../components/BoardItem.jsx/BoardItem'
import SectionName from '../components/SectionName/SectionName'
import ScrollButton from '../components/Button/ScrollButton'
import CreateButton from '../components/Button/CreateButton'

const Boards = () => {
  const [isShowButton, setIsShowButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const dispatch = useDispatch()

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId)
  }

  const tasks = useSelector((state) => state.tasks.tasks)
  console.log('Tasks: ', tasks)

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

  const sections = [
    { name: 'To-do', status: 'todo' },
    { name: 'In progress', status: 'inprogress' },
    { name: 'Done', status: 'done' },
  ]

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const sourceSectionName = source.droppableId
    const destinationSectionName = destination.droppableId

    const sourceSection = sections.find(
      (section) => section.name === sourceSectionName
    )
    const destinationSection = sections.find(
      (section) => section.name === destinationSectionName
    )

    if (sourceSectionName === destinationSectionName) {
      const newTasks = tasks
        .filter((task) => task.status === sourceSection.status)
        .map((task, index) => ({
          ...task,
          order: index,
        }))

      dispatch(
        updateTasksOrder({
          tasks: newTasks,
        })
      )
    } else {
      const movedTask = tasks.find(
        (task) =>
          task.status === sourceSection.status && task.id === source.draggableId
      )

      const newSourceTasks = tasks
        .filter(
          (task) =>
            task.status === sourceSection.status && task.id !== movedTask.id
        )
        .map((task, index) => ({
          ...task,
          order: index,
        }))

      const newDestinationTasks = tasks
        .filter((task) => task.status === destinationSection.status)
        .map((task, index) => ({
          ...task,
          order: index,
        }))

      dispatch(
        updateTasksOrder({
          tasks: [
            ...newSourceTasks,
            { ...movedTask, status: destinationSection.status },
          ],
        })
      )

      // dispatch(
      //   updateTaskStatus({
      //     taskId: movedTask.id,
      //     status: destinationSection.status,
      //   })
      // )

      if (sourceSection.status === 'todo') {
        dispatch(
          updateTodoTasks({
            tasks: newSourceTasks,
          })
        )
      } else if (sourceSection.status === 'inprogress') {
        dispatch(
          updateProgressTasks({
            tasks: newSourceTasks,
          })
        )
      } else if (sourceSection.status === 'done') {
        dispatch(
          updateDoneTasks({
            tasks: newSourceTasks,
          })
        )
      }

      if (destinationSection.status === 'todo') {
        dispatch(
          updateTodoTasks({
            tasks: newDestinationTasks,
          })
        )
      } else if (destinationSection.status === 'inprogress') {
        dispatch(
          updateProgressTasks({
            tasks: newDestinationTasks,
          })
        )
      } else if (destinationSection.status === 'done') {
        dispatch(
          updateDoneTasks({
            tasks: newDestinationTasks,
          })
        )
      }
    }
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const renderCreateButton = (bigButton) => {
    return <CreateButton bigButton={bigButton} />
  }

  return (
    <div className={styles.main}>
      <div className='flex flex-row justify-center w-full'>
        <DragDropContext onDragEnd={onDragEnd}>
          {sections.map((section) => (
            <div className='mx-4 w-[452px]' key={section.name}>
              <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
                <SectionName name={section.name} noSvg={true} />
              </div>
              <section ref={sectionRef} className={styles.scrollableBlock}>
                <div className='mb-[50px]'>
                  <div className='z-[0]'>
                    <Droppable droppableId={section.name} className='z-[0]'>
                      {(provided, snapshot) => {
                        const { droppableProps, innerRef, ...rest } = provided
                        return (
                          <div
                            className={
                              snapshot.isDraggingOver
                                ? styles.draggingOver
                                : styles.notDraggingOver
                            }
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...rest}>
                            {section.tasks &&
                              section.tasks.map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={`${task.id}`}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}>
                                      <div onClick={handleOpenModal}>
                                        <BoardItem
                                          taskId={task.id}
                                          onSelectTask={handleSelectTask}
                                          onClick={() =>
                                            handleSelectTask(task.id)
                                          }
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
                    <div className='flex justify-between mr-5 mt-5'>
                      <div></div>
                      {renderCreateButton(true)}
                    </div>
                  </div>
                </div>
                {isShowButton && <ScrollButton sectionRef={sectionRef} />}
              </section>
            </div>
          ))}
        </DragDropContext>
      </div>

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

export default Boards
