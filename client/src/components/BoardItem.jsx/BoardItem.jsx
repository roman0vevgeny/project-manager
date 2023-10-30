// import React from 'react'
// import InfoCard from '../Info/InfoCard'
// import TaskName from '../TaskName/TaskName'
// import CheckBox from '../CheckBox/CheckBox'
// import styles from './BoardItem.module.scss'
// import Cal from '../svgs/Cal'
// import Tag from '../Tag/Tag'
// import { useSelector, useDispatch } from 'react-redux'
// import { updateTaskChecked, updateTaskStatus } from '../../features/tasksSlice'
// import Subtasks from '../svgs/Subtasks'
// import InfoExpiration from '../Info/InfoExpiration'
// import { selectTaskById } from '../../helpers/selectTaskById'
// import Folder from '../svgs/Folder'
// import {
//   updateDoneTasksInProject,
//   updateTodoTasksInProject,
//   updateProgressTasksInProject,
// } from '../../features/projectSlice'

// const BoardItem = ({ taskId, onClick, isDragging }) => {
//   const task = useSelector((state) => selectTaskById(state, taskId))
//   const dispatch = useDispatch()
//   const checked = task.checked
//   const totalSubtasks = task.subtasks.length
//   const completedSubtasks = task.subtasks.filter(
//     (subtask) => subtask.checked
//   ).length
//   const subtasksCounter = `${completedSubtasks}/${totalSubtasks}`

//   const allTags = useSelector((state) => state.tags)
//   const allProjects = useSelector((state) => state.projects)

//   updateTodoTasksInProject(state, action) {
//     const { projectId, tasks } = action.payload
//     const project = state.find((project) => project.id === projectId)
//     if (project) {
//       project.todotasks = tasks
//     }
//   },

//   updateProgressTasksInProject(state, action) {
//     const { projectId, tasks } = action.payload
//     const project = state.find((project) => project.id === projectId)
//     if (project) {
//       project.progresstasks = tasks
//     }
//   },

//   updateDoneTasksInProject(state, action) {
//     const { projectId, tasks } = action.payload
//     const project = state.find((project) => project.id === projectId)
//     if (project) {
//       project.donetasks = tasks
//     }
//   },

// const toggleChecked = (e) => {
//   e.stopPropagation()
//   dispatch(updateTaskChecked(taskId))
//   if (task.status === 'done') {
//     dispatch(updateTaskStatus({ id: taskId, status: 'todo' }))
//   } else {
//     dispatch(updateTaskStatus({ id: taskId, status: 'done' }))
//   }
// }

//   const toggleChecked = async (e) => {
//     e.stopPropagation()
//     dispatch(updateTaskChecked(taskId))

//     const currentStatus = task.status

//     const newStatus = currentStatus === 'done' ? 'todo' : 'done'
//     dispatch(updateTaskStatus({ id: taskId, status: newStatus }))

//     const projectId = task.projectId
//     console.log('projectId: ', projectId)
//     const updatedTasks = [taskId]
//     console.log('updatedTasks: ', updatedTasks)

//     if (currentStatus === 'done') {
//       const doneTasks = state.projects.find(
//         (project) => project.id === projectId
//       ).donetasks
//       const updatedDoneTasks = doneTasks.filter((id) => id !== taskId)
//       dispatch(updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks }))
//     }

//     if (newStatus === 'todo') {
//       const todoTasks = state.projects.find(
//         (project) => project.id === projectId
//       ).todotasks
//       updatedTasks.push(...todoTasks)
//     }

//     dispatch(updateTodoTasksInProject({ projectId, tasks: updatedTasks }))
//   }

//   const renderProjects = () => {
//     return (
//       <div className={styles.projectContainer}>
//         {task.projects.length === 1 ? (
//           <InfoCard
//             svg={<Folder />}
//             children={
//               allProjects.find((project) => project.id === task.projects[0])
//                 .name
//             }
//           />
//         ) : task.projects.length > 1 ? (
//           <InfoCard
//             svg={<Folder />}
//             children={`${
//               allProjects.find((project) => project.id === task.projects[0])
//                 .name
//             } ...+${task.projects.length - 1}`}
//           />
//         ) : null}
//       </div>
//     )
//   }

//   return (
//     <div className='relative flex flex-col w-[450px] p-2 '>
//       <div
//         className={isDragging ? styles.dragging : styles.body}
//         onClick={onClick}>
//         <div className='flex flex-row w-full justify-center'>
//           <button className={styles.checkbox} onClick={toggleChecked}>
//             <CheckBox
//               checked={checked}
//               toggleChecked={toggleChecked}
//               priority={task.priority}
//               status={task.status}
//             />
//           </button>
//           <div className={styles.clickable}>
//             <div className='flex flex-raw justify-between items-start w-full'>
//               <div className=''>
//                 <TaskName
//                   name={task.name}
//                   checked={task.checked}
//                   cards={true}
//                   boards={true}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='flex flex-row mt-4 w-full justify-end'>
//           {renderProjects()}
//           {task.subtasks && task.subtasks.length > 0 && (
//             <InfoCard svg={<Subtasks />} children={subtasksCounter} />
//           )}
//           {task.expirationDate && (
//             <InfoExpiration
//               svg={<Cal />}
//               children={new Date(task.expirationDate).toLocaleDateString(
//                 navigator.language,
//                 {
//                   day: '2-digit',
//                   month: '2-digit',
//                   year: '2-digit',
//                 }
//               )}
//               expirationDate={task.expirationDate}
//               checked={task.checked}
//             />
//           )}
//         </div>

//         <div className='flex justify-end w-full mt-2'>
//           {task.tags.length > 0 && (
//             <div className='flex max-w-[600px] flex-wrap justify-end'>
//               {task.tags.map((tagId, index) => {
//                 const tag = allTags.find((tag) => tag.id === tagId)
//                 return (
//                   tag && (
//                     <Tag
//                       color={tag.color}
//                       tagName={tag.name}
//                       key={index}
//                       checked={checked}
//                     />
//                   )
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BoardItem

import React from 'react'
import InfoCard from '../Info/InfoCard'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './BoardItem.module.scss'
import Cal from '../svgs/Cal'
import Tag from '../Tag/Tag'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskChecked, updateTaskStatus } from '../../features/tasksSlice'
import Subtasks from '../svgs/Subtasks'
import InfoExpiration from '../Info/InfoExpiration'
import { selectTaskById } from '../../helpers/selectTaskById'
import Folder from '../svgs/Folder'
import {
  updateDoneTasksInProject,
  updateTodoTasksInProject,
  updateProgressTasksInProject,
} from '../../features/projectSlice'
import TagSecond from '../Tag/TagSecond'
import InfoDateSmall from '../Info/InfoDateSmall'
import InfoCardSmall from '../Info/InfoCardSmall'
import CalSmall from '../svgs/CalSmall'
import SubtasksSmall from '../svgs/SubtasksSmall'
import FolderSmall from '../svgs/FolderSmall'

const BoardItem = ({ taskId, onClick, isDragging }) => {
  const tasks = useSelector((state) => state.tasks)
  const projects = useSelector((state) => state.projects)
  const tags = useSelector((state) => state.tags)
  const allUsers = useSelector((state) => state.users.users)

  const dispatch = useDispatch()
  const task = useSelector((state) => selectTaskById(state, taskId))
  const checked = task.checked
  const totalSubtasks = task.subtasks.length
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.checked
  ).length
  const subtasksCounter = `${completedSubtasks}/${totalSubtasks}`
  const user = allUsers.find((user) => user.id === task.users)

  const projectId = task.projectId
  const project = projects.find((proj) => proj.id === projectId)
  console.log('project: ', project)

  const allProjects = projects
  const allTags = tags

  const toggleChecked = async (e) => {
    e.stopPropagation()
    dispatch(updateTaskChecked(taskId))

    const currentStatus = task.status
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    console.log('currentStatus, newStatus: ', currentStatus, newStatus)
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }))

    let updatedTodoTasks = []
    let updatedProgressTasks = []
    let updatedDoneTasks = []

    console.log('updatedTodoTasks: ', updatedTodoTasks)
    console.log('updatedProgressTasks: ', updatedProgressTasks)
    console.log('updatedDoneTasks: ', updatedDoneTasks)

    if (task.projects.length > 0) {
      task.projects.forEach((projectId) => {
        const project = projects.find((proj) => proj.id === projectId)
        if (project) {
          let updatedTodoTasks = [...project.todotasks]
          let updatedProgressTasks = [...project.progresstasks]
          let updatedDoneTasks = [...project.donetasks]

          console.log('updatedTodoTasks: ', updatedTodoTasks)
          console.log('updatedProgressTasks: ', updatedProgressTasks)
          console.log('updatedDoneTasks: ', updatedDoneTasks)

          switch (currentStatus) {
            case 'todo':
              updatedTodoTasks = updatedTodoTasks.filter((id) => id !== taskId)
              break
            case 'inprogress':
              updatedProgressTasks = updatedProgressTasks.filter(
                (id) => id !== taskId
              )
              break
            case 'done':
              updatedDoneTasks = updatedDoneTasks.filter((id) => id !== taskId)
              break
            default:
              break
          }

          switch (newStatus) {
            case 'todo':
              updatedTodoTasks.push(taskId)
              break
            case 'inprogress':
              updatedProgressTasks.push(taskId)
              break
            case 'done':
              updatedDoneTasks.push(taskId)
              break
            default:
              break
          }

          dispatch(
            updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
          )
          dispatch(
            updateProgressTasksInProject({
              projectId,
              tasks: updatedProgressTasks,
            })
          )
          dispatch(
            updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks })
          )
        }
      })
    }
  }

  // const renderProjects = () => {
  //   return (
  //     <div className={styles.projectContainer}>
  //       {task.projects.length === 1 ? (
  //         <InfoCard
  //           svg={<Folder />}
  //           children={
  //             allProjects.find((project) => project.id === task.projects[0])
  //               .name
  //           }
  //         />
  //       ) : task.projects.length > 1 ? (
  //         <InfoCard
  //           svg={<Folder />}
  //           children={`${
  //             allProjects.find((project) => project.id === task.projects[0])
  //               .name
  //           } ...+${task.projects.length - 1}`}
  //         />
  //       ) : null}
  //     </div>
  //   )
  // }

  const renderProjects = () => {
    return (
      <>
        {task.projects && task.projects.length > 0 && (
          <div className={styles.projectContainer}>
            {task && task.projects.length === 1 ? (
              <InfoCardSmall
                svg={<FolderSmall />}
                children={
                  allProjects.find((project) => project.id === task.projects[0])
                    .name
                }
              />
            ) : task.projects.length > 1 ? (
              <InfoCardSmall
                svg={<FolderSmall />}
                children={`${
                  allProjects.find((project) => project.id === task.projects[0])
                    .name
                } ...+${task.projects.length - 1}`}
              />
            ) : null}
          </div>
        )}
      </>
    )
  }

  const getUserBgColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blue
      case 'green':
        return styles.green
      case 'pink':
        return styles.pink
      case 'purple':
        return styles.purple
      case 'red':
        return styles.red
      case 'yellow':
        return styles.yellow
      case 'sea':
        return styles.sea
      case 'gray':
        return styles.gray
      default:
        return styles.blue
    }
  }

  const getUserTextColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blueText
      case 'green':
        return styles.greenText
      case 'pink':
        return styles.pinkText
      case 'purple':
        return styles.purpleText
      case 'red':
        return styles.redText
      case 'yellow':
        return styles.yellowText
      case 'sea':
        return styles.seaText
      case 'gray':
        return styles.grayText
      default:
        return styles.blueText
    }
  }

  const getUserFirstLetter = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className='relative flex flex-col w-[350px] p-2'>
      <div
        className={isDragging ? styles.dragging : styles.body}
        onClick={onClick}>
        <div className='flex flex-row items-start'>
          <button className={styles.checkbox} onClick={toggleChecked}>
            <CheckBox
              checked={checked}
              toggleChecked={toggleChecked}
              priority={task.priority}
              status={task.status}
            />
          </button>
          <div className={styles.clickable}>
            <div className='flex flex-raw justify-between items-start w-full'>
              <div className=''>
                <TaskName
                  name={task.name}
                  checked={task.checked}
                  cards={true}
                  boards={true}
                />
              </div>
            </div>
          </div>
          <div className='flex mt-[2px] items-center'>
            {user && (
              <div className='flex items-center justify-center pt-[1px] mr-1 ml-2'>
                <div
                  className={
                    styles.user +
                    ' ' +
                    getUserBgColor(user.color) +
                    ' ' +
                    getUserTextColor(user.color)
                  }>
                  {getUserFirstLetter(user.name)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className='flex flex-row mt-4 w-full justify-end'>
          {renderProjects()}
          {task.subtasks && task.subtasks.length > 0 && (
            <InfoCard svg={<Subtasks />} children={subtasksCounter} />
          )}
          {task.expirationDate && (
            <InfoExpiration
              svg={<Cal />}
              children={new Date(task.expirationDate).toLocaleDateString(
                navigator.language,
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                }
              )}
              expirationDate={task.expirationDate}
              checked={task.checked}
            />
          )}
        </div> */}

        <div className='flex items-center mb-1 flex-wrap ml-10 space-y-1'>
          {/* {task.priority && (
                  <div
                    className={
                      'flex items-center justify-center w-[15px] rounded-[5px] mr-[10px]' +
                      ' ' +
                      getPriorityColor(task.priority)
                    }>
                    <div className='flex justify-center items-center'>
                      <PrioritySmall />
                    </div>
                  </div>
                )} */}
          {task.expirationDate && (
            <div className='flex items-center justify-center rounded-[5px] mt-[4px]'>
              <InfoDateSmall
                svg={<CalSmall />}
                children={new Date(task.expirationDate).toLocaleDateString(
                  navigator.language,
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  }
                )}
                expirationDate={task.expirationDate}
                checked={task.checked}
              />
            </div>
          )}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className='flex items-center justify-center rounded-[5px] mt-[4px]'>
              <InfoCardSmall
                svg={<SubtasksSmall />}
                children={subtasksCounter}
              />
            </div>
          )}
          <div className='flex items-center justify-center rounded-[5px]'>
            {task.projects && renderProjects()}
          </div>
        </div>
        {task.tags.length > 0 && (
          <div className='flex flex-wrap max-w-[300px] ml-10 items-center'>
            {task.tags.map((tagId, index) => {
              const tag = allTags.find((tag) => tag.id === tagId)
              return (
                tag && (
                  <TagSecond
                    color={tag.color}
                    tagName={tag.name}
                    key={index}
                    checked={checked}
                  />
                )
              )
            })}
          </div>
        )}

        {/* <div className='flex justify-end w-full mt-2'>
          {task.tags.length > 0 && (
            <div className='flex max-w-[600px] flex-wrap justify-end'>
              {task.tags.map((tagId, index) => {
                const tag = allTags.find((tag) => tag.id === tagId)
                return (
                  tag && (
                    <TagSecond
                      color={tag.color}
                      tagName={tag.name}
                      key={index}
                      checked={checked}
                    />
                  )
                )
              })}
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default BoardItem
