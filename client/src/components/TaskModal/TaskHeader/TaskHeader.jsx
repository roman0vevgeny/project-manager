// import React from 'react'
// import InfoCard from '../../Info/InfoCard'
// import Subtasks from '../../svgs/Subtasks'
// import { useSelector } from 'react-redux'
// import {
//   updateTaskProjects,
//   updateTaskExpirationDate,
// } from '../../../features/tasksSlice'
// import Star from '../../svgs/Star'
// import Cal from '../../svgs/Cal'
// import styles from './TaskHeader.module.scss'
// import Project from '../../TaskModal/ProjectForm/Project/Project'
// import InfoDate from '../../Info/InfoDate'

// const TaskHeader = ({
//   task,
//   onFavoriteChange,
//   onProjectsChange,
//   onExpirationDateChange,
//   isNewTask,
//   dispatch,
// }) => {
//   const {
//     subtasks,
//     creationDate,
//     expirationDate,
//     favorite,
//     checked,
//     projects,
//     id,
//   } = task

//   const allProjects = useSelector((state) => state.projects)
//   console.log(allProjects)
//   console.log(projects)

//   const handleToggleFavorite = () => {
//     onFavoriteChange(!favorite)
//   }

//   const handleDeleteProject = (projectId) => {
//     const updatedProjects = projects.filter((id) => id !== projectId)

//     if (isNewTask) {
//       onProjectsChange(updatedProjects)
//     } else {
//       dispatch(
//         updateTaskProjects({
//           id: id,
//           projects: updatedProjects,
//         })
//       )
//     }
//   }

//   const handleDeleteExpirationDate = () => {
//     if (isNewTask) {
//       onExpirationDateChange(null)
//     } else {
//       dispatch(
//         updateTaskExpirationDate({
//           id: id,
//           expirationDate: null,
//         })
//       )
//     }
//   }

//   return (
//     <div>
//       <div className='flex flex-row justify-between items-center text-gray mb-3'>
//         {!isNewTask && creationDate && (
//           <p className='text-12'>
//             Created at{' '}
//             {/* {new Date(creationDate).toLocaleDateString(navigator.language, {
//               day: '2-digit',
//               month: '2-digit',
//               year: '2-digit',
//             })} */}
//             {creationDate.slice(0, 10)}
//           </p>
//         )}
//         {isNewTask && <p className='text-12'>Create a new task</p>}
//         <div className='flex flex-row justify-end'>
//           {projects && (
//             <div className={'flex'}>
//               {projects.map((projectId, index) => {
//                 const project = allProjects.find(
//                   (project) => project.id === projectId
//                 )
//                 return (
//                   project && (
//                     <Project
//                       projectName={project.name}
//                       deleteProject={!checked ? true : false}
//                       key={index}
//                       onDelete={() => handleDeleteProject(projectId)}
//                       checked={checked}
//                     />
//                   )
//                 )
//               })}
//             </div>
//           )}
//           {expirationDate && (
//             <InfoDate
//               svg={<Cal />}
//               children={new Date(expirationDate).toLocaleDateString(
//                 navigator.language,
//                 {
//                   day: '2-digit',
//                   month: '2-digit',
//                   year: '2-digit',
//                 }
//               )}
//               onDelete={() => handleDeleteExpirationDate()}
//               expirationDate={expirationDate}
//               checked={checked}
//             />
//           )}
//           {subtasks && subtasks.length > 0 && (
//             <InfoCard
//               svg={<Subtasks />}
//               children={`${
//                 subtasks.filter((subtask) => subtask.checked).length
//               }/${subtasks.length}`}
//             />
//           )}
//           <button
//             className={favorite ? styles.favorite : styles.notFavorite}
//             onClick={handleToggleFavorite}>
//             <Star />
//           </button>
//         </div>
//       </div>
//       <div className={styles.sectionDevider}></div>
//     </div>
//   )
// }

// export default TaskHeader

import React from 'react'
import InfoCard from '../../Info/InfoCard'
import Subtasks from '../../svgs/Subtasks'
import { useSelector } from 'react-redux'
import {
  updateTaskExpirationDate,
  updateTaskProjects,
} from '../../../features/tasksSlice'
import Star from '../../svgs/Star'
import Cal from '../../svgs/Cal'
import styles from './TaskHeader.module.scss'
import InfoDate from '../../Info/InfoDate'
import Project from '../../TaskModal/ProjectForm/Project/Project' // Import the Project component

const TaskHeader = ({
  task,
  onFavoriteChange,
  onProjectsChange,
  onExpirationDateChange,
  isNewTask,
  dispatch,
}) => {
  const {
    subtasks,
    creationDate,
    expirationDate,
    favorite,
    checked,
    projects,
    id,
  } = task

  const allProjects = useSelector((state) => state.projects)

  const handleToggleFavorite = () => {
    onFavoriteChange(!favorite)
  }

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter((id) => id !== projectId)

    if (isNewTask) {
      onProjectsChange(updatedProjects)
    } else {
      dispatch(
        updateTaskProjects({
          id: id,
          projects: updatedProjects,
        })
      )
    }
  }

  const handleDeleteExpirationDate = () => {
    if (isNewTask) {
      onExpirationDateChange(null)
    } else {
      dispatch(
        updateTaskExpirationDate({
          id: id,
          expirationDate: null,
        })
      )
    }
  }

  const renderProjects = () => {
    return (
      <div className='flex flex-row justify-end'>
        {task.projects.map((projectId, index) => {
          const project = allProjects.find(
            (project) => project.id === projectId
          )
          return (
            project && (
              <Project
                projectName={project.name}
                deleteProject={!checked ? true : false}
                onDelete={() => handleDeleteProject(projectId)}
                checked={checked}
                key={index}
              />
            )
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center text-gray mb-3'>
        {!isNewTask && creationDate && (
          <p className='text-12'>Created at {creationDate.slice(0, 10)}</p>
        )}
        {isNewTask && <p className='text-12'>Create a new task</p>}
        <div className='flex flex-row justify-end'>
          {/* {projects && (
            <div className={'flex'}>
              {projects.map((projectId, index) => {
                const project = allProjects.find(
                  (project) => project.id === projectId
                )
                return (
                  project && (
                    <Project
                      projectName={project.name}
                      deleteProject={!checked ? true : false}
                      key={index}
                      onDelete={() => handleDeleteProject(projectId)}
                      checked={checked}
                    />
                  )
                )
              })}
            </div>
          )} */}
          {renderProjects()}
          {expirationDate && (
            <InfoDate
              svg={<Cal />}
              children={new Date(expirationDate).toLocaleDateString(
                navigator.language,
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                }
              )}
              onDelete={() => handleDeleteExpirationDate()}
              expirationDate={expirationDate}
              checked={checked}
            />
          )}
          {subtasks && subtasks.length > 0 && (
            <InfoCard
              svg={<Subtasks />}
              children={`${
                subtasks.filter((subtask) => subtask.checked).length
              }/${subtasks.length}`}
            />
          )}
          <button
            className={favorite ? styles.favorite : styles.notFavorite}
            onClick={handleToggleFavorite}>
            <Star />
          </button>
        </div>
      </div>
      <div className={styles.sectionDevider}></div>
    </div>
  )
}

export default TaskHeader
