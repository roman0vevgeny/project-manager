// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import styles from './Home.module.scss'
// import CardItem from '../components/CardItem/CardItem'
// import SectionName from '../components/SectionName/SectionName'
// import CreateButton from '../components/Button/CreateButton'
// import { useSelector, useDispatch } from 'react-redux'
// import { useLocation } from 'react-router-dom'
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// import { updateTasksOrder } from '../features/tasksSlice'
// import Modal from '../components/Modal/Modal'
// import EditTaskModal from '../components/TaskModal/EditTaskModal'

// import {
//   todayTasksSelector,
//   expiredTasksSelector,
// } from '../features/taskMemoSelectors'
// import InfoBlock from '../components/Info/IndoBlock'
// import ScrollButton from '../components/Button/ScrollButton'

// const ProjectCards = () => {
//   const [isShowButton, setIsShowButton] = React.useState(false)
//   const [open, setOpen] = useState(false)
//   const [selectedTaskId, setSelectedTaskId] = useState(null)
//   let location = useLocation()
//   const dispatch = useDispatch()

//   const handleSelectTask = (taskId) => {
//     setSelectedTaskId(taskId)
//   }

//   const getTasksByPath = (path) => {
//     switch (path) {
//       case '/home/cards':
//         return useSelector((state) => state.tasks.tasks)
//       case '/today/cards':
//         return useSelector(todayTasksSelector)
//       case '/expired/cards':
//         return useSelector(expiredTasksSelector)
//       default:
//         return []
//     }
//   }

//   const tasks = getTasksByPath(location.pathname)
//   console.log('Tasks: ', tasks)

//   const sectionRef = useRef(null)

//   const isDragDisabled = () => {
//     const path = location.pathname
//     return path === '/today/cards' || path === '/expired/cards'
//   }

//   const handleScroll = useCallback(() => {
//     const position = sectionRef.current.scrollTop
//     if (position > 300) {
//       setIsShowButton(true)
//     } else {
//       setIsShowButton(false)
//     }
//   }, [sectionRef])

//   useEffect(() => {
//     if (sectionRef.current) {
//       sectionRef.current.addEventListener('scroll', handleScroll)
//     }
//     return () => {
//       if (sectionRef.current) {
//         sectionRef.current.removeEventListener('scroll', handleScroll)
//       }
//     }
//   }, [sectionRef])

//   const onDragEnd = (result) => {
//     const { source, destination } = result
//     if (!destination) {
//       return
//     }
//     if (
//       source.index === destination.index &&
//       source.droppableId === destination.droppableId
//     ) {
//       return
//     }
//     const newTasks = [...tasks]
//     const [removed] = newTasks.splice(source.index, 1)
//     newTasks.splice(destination.index, 0, removed)
//     dispatch(
//       updateTasksOrder({
//         tasks: newTasks,
//       })
//     )
//   }

//   const renderSectionName = (path) => {
//     switch (path) {
//       case '/home/cards':
//         return <SectionName name={'Tasks'} />
//       case '/today/cards':
//         return <SectionName name={'Today'} />
//       case '/expired/cards':
//         return <SectionName name={'Expired'} />
//       default:
//         return null
//     }
//   }

//   const renderCreateButton = (path, bigButton) => {
//     switch (path) {
//       case '/home/cards':
//         return <CreateButton bigButton={bigButton} />
//       case '/today/cards':
//         return <CreateButton today={true} bigButton={bigButton} />
//       case '/expired/cards':
//         return <CreateButton bigButton={bigButton} />
//       default:
//         return null
//     }
//   }

//   const handleOpenModal = () => {
//     setOpen(true)
//   }

//   return (
//     <div className={styles.main}>
//       {Array.isArray(tasks) && tasks.length === 0 ? (
//         <InfoBlock location={location.pathname} />
//       ) : (
//         <section ref={sectionRef} className={styles.scrollable}>
//           <div className='mb-[50px]'>
//             <div className='sticky top-0 z-[1] bg-mainBg mb-1 transition-all duration-200 ease-in-out'>
//               {renderSectionName(location.pathname)}
//             </div>

//             <div className='z-[0]'>
//               <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId={'1'} className='z-[0]'>
//                   {(provided, snapshot) => {
//                     const { droppableProps, innerRef, ...rest } = provided
//                     return (
//                       <div
//                         className={
//                           snapshot.isDraggingOver
//                             ? 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-stroke '
//                             : 'border-b-1 border-dashed border-x-1 pb-[3px] pt-[2px] border-borderMain transition-all duration-200 ease-in-out'
//                         }
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         {...rest}>
//                         {tasks &&
//                           tasks.map((task, index) => (
//                             <Draggable
//                               key={`${task.id}`}
//                               draggableId={`${task.id}`}
//                               index={index}
//                               isDragDisabled={isDragDisabled()}>
//                               {(provided, snapshot) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}>
//                                   <div onClick={handleOpenModal}>
//                                     <CardItem
//                                       taskId={task.id}
//                                       onSelectTask={handleSelectTask}
//                                       onClick={() => handleSelectTask(task.id)}
//                                       isDragging={snapshot.isDragging}
//                                     />
//                                   </div>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}

//                         {provided.placeholder}
//                       </div>
//                     )
//                   }}
//                 </Droppable>
//               </DragDropContext>
//               <div className='flex justify-between mr-5 mt-5'>
//                 <div></div>
//                 {renderCreateButton(location.pathname)}
//               </div>
//             </div>
//           </div>
//           {isShowButton && <ScrollButton sectionRef={sectionRef} />}
//         </section>
//       )}
//       {renderCreateButton(location.pathname, true)}
//       <Modal
//         open={selectedTaskId !== null}
//         onClose={() => handleSelectTask(null)}
//         children={
//           <EditTaskModal
//             task={tasks.find((task) => task.id === selectedTaskId)}
//             onClose={() => handleSelectTask(null)}
//           />
//         }
//       />
//     </div>
//   )
// }

// export default ProjectCards

import React from 'react'
import { useSelector } from 'react-redux'

const ProjectCards = () => {
  const allTasks = useSelector((state) => state.tasks.tasks)
  console.log(allTasks)

  return (
    <>
      {allTasks.map((task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <p>
            {task.subtasks.map((subtask) => (
              <div key={subtask.id}>
                <h2>{subtask.name}</h2>
                <p>{subtask.checked ? 'Done' : 'Not done'}</p>
              </div>
            ))}
          </p>
          <p>
            {task.projects.map((project) => (
              <div key={project.id}>
                <h2>{project.name}</h2>
              </div>
            ))}
          </p>
          <p>
            {task.tags.map((tag) => (
              <div key={tag.id}>
                <h2>{tag.name}</h2>
                <p>{tag.color}</p>
              </div>
            ))}
          </p>
        </div>
      ))}
    </>
  )
}
export default ProjectCards
