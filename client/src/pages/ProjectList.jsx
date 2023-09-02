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
import { updateTasksInProject } from '../features/projectSlice'

const ProjectList = ({ projectId }) => {
  const [isShowButton, setIsShowButton] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  let location = useLocation()
  const dispatch = useDispatch()

  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )
  const tasks = project.tasks
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === selectedTaskId)
  )

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId)
  }

  // `/projects/${project.id}list`

  console.log('Tasks: ', tasks)

  const sectionRef = useRef(null)

  // const isDragDisabled = () => {
  //   const path = location.pathname
  //   return path === '/today/list' || path === '/expired/list'
  // }

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
    const newProjectTasks = [...tasks]
    const [removed] = newProjectTasks.splice(source.index, 1)
    newProjectTasks.splice(destination.index, 0, removed)
    dispatch(
      updateTasksInProject({
        tasks: newProjectTasks,
      })
    )
  }

  const renderCreateButton = (bigButton, projectId) => {
    return <CreateButton bigButton={bigButton} projectId={projectId} />
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <div className={styles.main}>
      {Array.isArray(project) && project !== null ? (
        <InfoBlock location={location.pathname} />
      ) : (
        <section ref={sectionRef} className={styles.scrollable}>
          <div className='mb-[50px]'>
            <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
              <SectionName name={project.name} />
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
              <div className='flex justify-between mr-5 mt-5'>
                <div></div>
                {renderCreateButton(true, projectId)}
              </div>
            </div>
          </div>
          {isShowButton && <ScrollButton sectionRef={sectionRef} />}
        </section>
      )}
      {renderCreateButton(true, projectId)}
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

export default ProjectList

// import React from 'react'
// import { useSelector } from 'react-redux'

// const ProjectList = () => {
//   const allTasks = useSelector((state) => state.tasks.tasks)
//   console.log(allTasks)

//   return (
//     <>
//       {allTasks.map((task) => (
//         <div key={task.id}>
//           <h1>{task.name}</h1>
//           <p>{task.description}</p>
//           <p>
//             {task.subtasks.map((subtask) => (
//               <div key={subtask.id}>
//                 <h2>{subtask.name}</h2>
//                 <p>{subtask.checked ? 'Done' : 'Not done'}</p>
//               </div>
//             ))}
//           </p>
//           <p>
//             {task.projects.map((project) => (
//               <div key={project.id}>
//                 <h2>{project.name}</h2>
//               </div>
//             ))}
//           </p>
//           <p>
//             {task.tags.map((tag) => (
//               <div key={tag.id}>
//                 <h2>{tag.name}</h2>
//                 <p>{tag.color}</p>
//               </div>
//             ))}
//           </p>
//         </div>
//       ))}
//     </>
//   )
// }
// export default ProjectList
