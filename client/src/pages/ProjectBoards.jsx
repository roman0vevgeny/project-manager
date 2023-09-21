import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './Home.module.scss'
import SectionProjectName from '../components/SectionName/SectionProjectName'
import CreateButton from '../components/Button/CreateButton'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ScrollButton from '../components/Button/ScrollButton'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  updateTodoTasksInProject,
  updateProgressTasksInProject,
  updateDoneTasksInProject,
} from '../features/projectSlice'
import { updateTaskChecked, updateTaskStatus } from '../features/tasksSlice'
import { useParams } from 'react-router-dom'
import { selectTaskById } from '../helpers/selectTaskById'
import BoardItem from '../components/BoardItem.jsx/BoardItem'

const ProjectBoards = () => {
  const [isShowButton, setIsShowButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  let location = useLocation()
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const tasks = useSelector((state) => state.tasks.tasks)
  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )
  // console.log('Project: ', project)

  const sections = [
    { name: 'To-do', tasks: project && project.todotasks },
    { name: 'In progress', tasks: project && project.progresstasks },
    { name: 'Done', tasks: project && project.donetasks },
  ]

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

  // const onDragEnd = (result) => {
  //   const { source, destination } = result
  //   if (!destination) {
  //     return
  //   }

  //   const sourceSectionName = source.droppableId
  //   const destinationSectionName = destination.droppableId

  //   if (sourceSectionName === destinationSectionName) {
  //     const section = sections.find(
  //       (section) => section.name === sourceSectionName
  //     )
  //     const newTasks = [...section.tasks]
  //     const [movedTask] = newTasks.splice(source.index, 1)
  //     newTasks.splice(destination.index, 0, movedTask)

  //     switch (sourceSectionName) {
  //       case 'To-do':
  //         dispatch(
  //           updateTodoTasksInProject({
  //             projectId: projectId,
  //             tasks: newTasks,
  //           })
  //         )
  //         break
  //       case 'In progress':
  //         dispatch(
  //           updateProgressTasksInProject({
  //             projectId: projectId,
  //             tasks: newTasks,
  //           })
  //         )
  //         break
  //       case 'Done':
  //         dispatch(
  //           updateDoneTasksInProject({
  //             projectId: projectId,
  //             tasks: newTasks,
  //           })
  //         )
  //         break
  //       default:
  //         break
  //     }
  //   } else {
  //     const movedTask = sections.find(
  //       (section) => section.name === sourceSectionName
  //     ).tasks[source.index]

  //     const newSourceTasks = sections
  //       .find((section) => section.name === sourceSectionName)
  //       .tasks.filter((task, index) => index !== source.index)

  //     const newDestinationTasks = [
  //       ...sections.find((section) => section.name === destinationSectionName)
  //         .tasks,
  //     ]
  //     newDestinationTasks.splice(destination.index, 0, movedTask)

  //     switch (sourceSectionName) {
  //       case 'To-do':
  //         dispatch(
  //           updateTodoTasksInProject({
  //             projectId: projectId,
  //             tasks: newSourceTasks,
  //           })
  //         )
  //         break
  //       case 'In progress':
  //         dispatch(
  //           updateProgressTasksInProject({
  //             projectId: projectId,
  //             tasks: newSourceTasks,
  //           })
  //         )
  //         break
  //       case 'Done':
  //         dispatch(
  //           updateDoneTasksInProject({
  //             projectId: projectId,
  //             tasks: newSourceTasks,
  //           })
  //         )
  //         break
  //       default:
  //         break
  //     }

  //     switch (destinationSectionName) {
  //       case 'To-do':
  //         dispatch(
  //           updateTodoTasksInProject({
  //             projectId: projectId,
  //             tasks: newDestinationTasks,
  //           })
  //         )
  //         break
  //       case 'In progress':
  //         dispatch(
  //           updateProgressTasksInProject({
  //             projectId: projectId,
  //             tasks: newDestinationTasks,
  //           })
  //         )
  //         break
  //       case 'Done':
  //         dispatch(
  //           updateDoneTasksInProject({
  //             projectId: projectId,
  //             tasks: newDestinationTasks,
  //           })
  //         )
  //         dispatch(updateTaskChecked(task.id))
  //         dispatch(updateTaskStatus({ id: task.id, status: 'done' }))
  //         break
  //       default:
  //         break
  //     }
  //   }
  // }

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const sourceSectionName = source.droppableId
    const destinationSectionName = destination.droppableId

    const updateFunctions = {
      'To-do': (tasks) =>
        dispatch(
          updateTodoTasksInProject({
            projectId: projectId,
            tasks: tasks,
          })
        ),
      'In progress': (tasks) =>
        dispatch(
          updateProgressTasksInProject({
            projectId: projectId,
            tasks: tasks,
          })
        ),
      'Done': (tasks) =>
        dispatch(
          updateDoneTasksInProject({
            projectId: projectId,
            tasks: tasks,
          })
        ),
    }

    if (sourceSectionName === destinationSectionName) {
      const section = sections.find(
        (section) => section.name === sourceSectionName
      )
      const newTasks = [...section.tasks]
      const [movedTask] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, movedTask)

      updateFunctions[sourceSectionName](newTasks)
    } else {
      const movedTask = sections.find(
        (section) => section.name === sourceSectionName
      ).tasks[source.index]

      const newSourceTasks = sections
        .find((section) => section.name === sourceSectionName)
        .tasks.filter((task, index) => index !== source.index)

      const newDestinationTasks = [
        ...sections.find((section) => section.name === destinationSectionName)
          .tasks,
      ]
      newDestinationTasks.splice(destination.index, 0, movedTask)

      updateFunctions[sourceSectionName](newSourceTasks)
      updateFunctions[destinationSectionName](newDestinationTasks)
      const task = tasks.find((task) => task.id === movedTask)
      if (destinationSectionName === 'Done') {
        if (task.status !== 'done' && task.checked === false) {
          dispatch(updateTaskStatus({ id: task.id, status: 'done' }))
          dispatch(updateTaskChecked(task.id))
        }
      } else if (destinationSectionName === 'In progress') {
        if (task.status !== 'inprogress') {
          dispatch(updateTaskStatus({ id: task.id, status: 'inprogress' }))
          if (task.checked === true) {
            dispatch(updateTaskChecked(task.id))
          }
        }
      } else if (destinationSectionName === 'To-do') {
        if (task.status !== 'todo') {
          dispatch(updateTaskStatus({ id: task.id, status: 'todo' }))
          if (task.checked === true) {
            dispatch(updateTaskChecked(task.id))
          }
        }
      }
    }
  }

  const renderCreateButton = (bigButton, projectId) => {
    return <CreateButton bigButton={bigButton} projectId={projectId} />
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      {project ? (
        <div className={styles.main}>
          <div className='flex flex-row justify-center w-full'>
            <DragDropContext onDragEnd={onDragEnd}>
              {sections.map((section) => (
                <div className='mx-4 w-[452px]' key={section.name}>
                  <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
                    <SectionProjectName
                      name={section.name}
                      projectId={projectId}
                      noSvg={true}
                    />
                  </div>
                  <section ref={sectionRef} className={styles.scrollableBlock}>
                    <div className='mb-[50px]'>
                      <div className='z-[0]'>
                        <Droppable droppableId={section.name} className='z-[0]'>
                          {(provided, snapshot) => {
                            const { droppableProps, innerRef, ...rest } =
                              provided
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
                                {section.tasks.map((task, index) => (
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
                                          <BoardItem
                                            taskId={task}
                                            onSelectTask={handleSelectTask}
                                            onClick={() =>
                                              handleSelectTask(task)
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
                          {renderCreateButton(true, projectId)}
                        </div>
                      </div>
                    </div>
                    {isShowButton && <ScrollButton sectionRef={sectionRef} />}
                  </section>
                </div>
              ))}
            </DragDropContext>
          </div>
          {renderCreateButton(true, projectId)}
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
          Project not found or deleted
        </div>
      )}
    </>
  )
}

export default ProjectBoards

//   return (
//     <>
//       {project ? (
//         <div className={styles.main}>
//           {Array.isArray(tasks) && tasks.length === 0 ? (
//             <div className='text-task m-0 transition-all duration-200 ease-in-out'>
//               <InfoBlock location={location.pathname} />
//               <p>Project is empty</p>
//               <p className='text-gray'>Add tasks to it</p>
//             </div>
//           ) : (
//             <div className='flex flex-row justify-center w-full'>
//               <div className='ml-4'>
//                 <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
//                   <SectionProjectName
//                     name='To-do'
//                     // editable={true}
//                     projectId={projectId}
//                     noSvg={true}
//                   />
//                 </div>
//                 <section ref={sectionRef} className={styles.scrollableBlock}>
//                   <div className='mb-[50px]'>
//                     <div className='z-[0]'>
//                       <DragDropContext onDragEnd={onDragEnd}>
//                         <Droppable droppableId={'1'} className='z-[0]'>
//                           {(provided, snapshot) => {
//                             const { droppableProps, innerRef, ...rest } =
//                               provided
//                             return (
//                               <div
//                                 className={
//                                   snapshot.isDraggingOver
//                                     ? 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-stroke'
//                                     : 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-borderMain transition-all duration-200 ease-in-out'
//                                 }
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 {...rest}>
//                                 {tasks &&
//                                   tasks.map((task, index) => (
//                                     <Draggable
//                                       key={task}
//                                       draggableId={`${task}`}
//                                       index={index}>
//                                       {(provided, snapshot) => (
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}>
//                                           <div onClick={handleOpenModal}>
//                                             <BoardItem
//                                               taskId={task}
//                                               onSelectTask={handleSelectTask}
//                                               onClick={() =>
//                                                 handleSelectTask(task)
//                                               }
//                                               isDragging={snapshot.isDragging}
//                                             />
//                                           </div>
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   ))}

//                                 {provided.placeholder}
//                               </div>
//                             )
//                           }}
//                         </Droppable>
//                       </DragDropContext>
//                       <div className='flex justify-between mr-5 mt-5'>
//                         <div></div>
//                         {renderCreateButton(true, projectId)}
//                       </div>
//                     </div>
//                   </div>
//                   {/* {isShowButton && <ScrollButton sectionRef={sectionRef} />} */}
//                 </section>
//               </div>

//               <div className='mx-2'>
//                 <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
//                   <SectionProjectName
//                     name='In progress'
//                     // editable={true}
//                     projectId={projectId}
//                     noSvg={true}
//                   />
//                 </div>
//                 <section ref={sectionRef} className={styles.scrollableBlock}>
//                   <div className='mb-[50px]'>
//                     <div className='z-[0]'>
//                       <DragDropContext onDragEnd={onDragEnd}>
//                         <Droppable droppableId={'1'} className='z-[0]'>
//                           {(provided, snapshot) => {
//                             const { droppableProps, innerRef, ...rest } =
//                               provided
//                             return (
//                               <div
//                                 className={
//                                   snapshot.isDraggingOver
//                                     ? 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-stroke'
//                                     : 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-borderMain transition-all duration-200 ease-in-out'
//                                 }
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 {...rest}>
//                                 {tasks &&
//                                   tasks.map((task, index) => (
//                                     <Draggable
//                                       key={task}
//                                       draggableId={`${task}`}
//                                       index={index}>
//                                       {(provided, snapshot) => (
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}>
//                                           <div onClick={handleOpenModal}>
//                                             <BoardItem
//                                               taskId={task}
//                                               onSelectTask={handleSelectTask}
//                                               onClick={() =>
//                                                 handleSelectTask(task)
//                                               }
//                                               isDragging={snapshot.isDragging}
//                                             />
//                                           </div>
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   ))}

//                                 {provided.placeholder}
//                               </div>
//                             )
//                           }}
//                         </Droppable>
//                       </DragDropContext>
//                       <div className='flex justify-between mr-5 mt-5'>
//                         <div></div>
//                         {renderCreateButton(true, projectId)}
//                       </div>
//                     </div>
//                   </div>
//                   {/* {isShowButton && <ScrollButton sectionRef={sectionRef} />} */}
//                 </section>
//               </div>

//               <div className='mr-4'>
//                 <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
//                   <SectionProjectName
//                     name='Done'
//                     // editable={true}
//                     projectId={projectId}
//                     noSvg={true}
//                   />
//                 </div>
//                 <section ref={sectionRef} className={styles.scrollableBlock}>
//                   <div className='mb-[50px]'>
//                     <div className='z-[0]'>
//                       <DragDropContext onDragEnd={onDragEnd}>
//                         <Droppable droppableId={'1'} className='z-[0]'>
//                           {(provided, snapshot) => {
//                             const { droppableProps, innerRef, ...rest } =
//                               provided
//                             return (
//                               <div
//                                 className={
//                                   snapshot.isDraggingOver
//                                     ? 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-stroke'
//                                     : 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-borderMain transition-all duration-200 ease-in-out'
//                                 }
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 {...rest}>
//                                 {tasks &&
//                                   tasks.map((task, index) => (
//                                     <Draggable
//                                       key={task}
//                                       draggableId={`${task}`}
//                                       index={index}>
//                                       {(provided, snapshot) => (
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}>
//                                           <div onClick={handleOpenModal}>
//                                             <BoardItem
//                                               taskId={task}
//                                               onSelectTask={handleSelectTask}
//                                               onClick={() =>
//                                                 handleSelectTask(task)
//                                               }
//                                               isDragging={snapshot.isDragging}
//                                             />
//                                           </div>
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   ))}

//                                 {provided.placeholder}
//                               </div>
//                             )
//                           }}
//                         </Droppable>
//                       </DragDropContext>
//                       <div className='flex justify-between mr-5 mt-5'>
//                         <div></div>
//                         {renderCreateButton(true, projectId)}
//                       </div>
//                     </div>
//                   </div>
//                   {/* {isShowButton && <ScrollButton sectionRef={sectionRef} />} */}
//                 </section>
//               </div>
//             </div>
//           )}
//           {renderCreateButton(true, projectId)}
//           <Modal
//             open={selectedTaskId !== null}
//             onClose={() => handleSelectTask(null)}
//             children={
//               selectedTask ? (
//                 <EditTaskModal
//                   task={selectedTask}
//                   onClose={() => handleSelectTask(null)}
//                 />
//               ) : (
//                 <div>Задача не найдена</div>
//               )
//             }
//           />
//         </div>
//       ) : (
//         <div className='m-2 px-4 py-1 bg-yellowTag text-yellowTag text-14 flex justify-center h-fit rounded-md'>
//           Project not found or deleted
//         </div>
//       )}
//     </>
//   )

// const onDragEnd = (result) => {
//   const { source, destination } = result
//   if (!destination) {
//     return
//   }
//   if (
//     source.index === destination.index &&
//     source.droppableId === destination.droppableId
//   ) {
//     return
//   }
//   const newProjectTasks = [...tasks]
//   const [removed] = newProjectTasks.splice(source.index, 1)
//   newProjectTasks.splice(destination.index, 0, removed)
//   dispatch(
//     updateTasksInProject({
//       projectId: projectId,
//       tasks: newProjectTasks,
//     })
//   )
//   const projectCopy = { ...project }
//   projectCopy.tasks = newProjectTasks
// }

// const onDragEnd = (result) => {
//   const { source, destination } = result
//   if (!destination) {
//     return
//   }
//   if (
//     source.index === destination.index &&
//     source.droppableId === destination.droppableId
//   ) {
//     return
//   }
//   const sourceSection = sections.find(
//     (section) => section.name === source.droppableId
//   )
//   const destinationSection = sections.find(
//     (section) => section.name === destination.droppableId
//   )
//   const sourceTasks = [...sourceSection.tasks]
//   const destinationTasks = [...destinationSection.tasks]
//   const [removed] = sourceTasks.splice(source.index, 1)
//   destinationTasks.splice(destination.index, 0, removed)
//   if (source.droppableId === destination.droppableId) {
//     dispatch(
//       updateTodoTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'To-do').tasks,
//       })
//     )
//     dispatch(
//       updateProgressTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'In progress').tasks,
//       })
//     )
//     dispatch(
//       updateDoneTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'Done').tasks,
//       })
//     )
//   } else {
//     dispatch(
//       updateTodoTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'To-do').tasks,
//       })
//     )
//     dispatch(
//       updateProgressTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'In progress').tasks,
//       })
//     )
//     dispatch(
//       updateDoneTasksInProject({
//         projectId: projectId,
//         tasks: sections.find((section) => section.name === 'Done').tasks,
//       })
//     )
//   }
// }
