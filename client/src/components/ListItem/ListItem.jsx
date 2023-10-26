import React from 'react'
import InfoCard from '../Info/InfoCard'
// import Star from '../svgs/Star'
import Subtasks from '../svgs/Subtasks'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './ListItem.module.scss'
import Cal from '../svgs/Cal'
import Tag from '../Tag/Tag'
import TagSecond from '../Tag/TagSecond'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateTaskChecked,
  // updateTaskIsFavorite,
  updateTaskStatus,
} from '../../features/tasksSlice'
import InfoExpiration from '../Info/InfoExpiration'
import { selectTaskById } from '../../helpers/selectTaskById'
import Folder from '../svgs/Folder'
import {
  updateDoneTasksInProject,
  updateTodoTasksInProject,
  updateProgressTasksInProject,
} from '../../features/projectSlice'
import PrioritySmall from '../svgs/PrioritySmall'
import Priority from '../svgs/Priority'
import CalSmall from '../svgs/CalSmall'
import SubtasksSmall from '../svgs/SubtasksSmall'
import InfoDateSmall from '../Info/InfoDateSmall'
import InfoCardSmall from '../Info/InfoCardSmall'
import FolderSmall from '../svgs/FolderSmall'

const ListItem = ({ taskId, onClick, isDragging }) => {
  const task = useSelector((state) => selectTaskById(state, taskId))
  // console.log('task: ', task)
  const dispatch = useDispatch()
  const checked = task.checked
  // const favorite = task.favorite
  const totalSubtasks = task.subtasks.length
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.checked
  ).length
  const subtasksCounter = `${completedSubtasks}/${totalSubtasks}`
  const allTags = useSelector((state) => state.tags)
  const allProjects = useSelector((state) => state.projects)
  const allUsers = useSelector((state) => state.users.users)

  const user = allUsers.find((user) => user.id === task.users)

  // const handleToggleFavorite = (e) => {
  //   dispatch(updateTaskIsFavorite({ id: task.id, favorite: !task.favorite }))
  //   e.stopPropagation()
  // }

  const toggleChecked = (e) => {
    e.stopPropagation()
    dispatch(updateTaskChecked(taskId))

    const currentStatus = task.status
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }))

    if (task.projects.length > 0) {
      task.projects.forEach((projectId) => {
        const project = allProjects.find((proj) => proj.id === projectId)
        if (project) {
          let updatedTodoTasks = [...project.todotasks]
          let updatedProgressTasks = [...project.progresstasks]
          let updatedDoneTasks = [...project.donetasks]

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

  // const renderProjects = () => {
  //   if (task && task.projects && task.projects.length > 0) {
  //     return (
  //       <div className={styles.projectContainer}>
  //         {task.projects.length === 1 ? (
  //           <InfoCardSmall
  //             svg={<FolderSmall />}
  //             children={
  //               allProjects.find((project) => project.id === task.projects[0])
  //                 ?.name
  //             }
  //           />
  //         ) : (
  //           <InfoCardSmall
  //             svg={<FolderSmall />}
  //             children={`${
  //               allProjects.find((project) => project.id === task.projects[0])
  //                 ?.name
  //             } ...+${task.projects.length - 1}`}
  //           />
  //         )}
  //       </div>
  //     )
  //   } else {
  //     return null
  //   }
  // }

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

  const getPriorityColor = (priorityStatus) => {
    switch (priorityStatus) {
      case 'Low':
        return 'text-[var(--priority-blue)]'
      case 'Medium':
        return 'text-[var(--priority-yellow)]'
      case 'High':
        return 'text-[var(--priority-red)]'
      default:
        return 'text-gray'
    }
  }

  const getUserFirstLetter = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <>
      {task && (
        <div className='relative w-full cursor-auto'>
          <div
            className={isDragging ? styles.dragging : styles.body}
            onClick={onClick}>
            <button className={styles.checkbox} onClick={toggleChecked}>
              <CheckBox
                checked={checked}
                toggleChecked={toggleChecked}
                priority={task.priority}
                status={task.status}
              />
            </button>
            <div className={styles.clickable}>
              <div className='flex flex-raw justify-between items-start w-full mb-1'>
                <div className='flex flex-grow'>
                  <TaskName name={task.name} checked={task.checked} />
                </div>
                <div className='flex mt-[2px] items-center'>
                  {/* {task.projects && renderProjects()} */}
                  {task.priority && (
                    <div
                      className={
                        'flex items-center justify-center w-[25px] h-[25px] ml-2 mr-1 rounded-[5px] pt-[1px]' +
                        ' ' +
                        getPriorityColor(task.priority)
                      }>
                      <div className='flex justify-center items-center w-[20px] h-[20px]'>
                        <Priority />
                      </div>
                    </div>
                  )}
                  {/* {task.subtasks && task.subtasks.length > 0 && (
                    <InfoCard svg={<Subtasks />} children={subtasksCounter} />
                  )} */}
                  {/* {task.expirationDate && (
                    <InfoExpiration
                      svg={<Cal />}
                      children={new Date(
                        task.expirationDate
                      ).toLocaleDateString(navigator.language, {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                      expirationDate={task.expirationDate}
                      checked={task.checked}
                    />
                  )} */}

                  {/* {user && (
                    <div className='flex items-center justify-center pt-[1px] mx-2'>
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
                  )} */}
                  {/* <button
                    className={favorite ? styles.favorite : styles.notFavorite}
                    onClick={handleToggleFavorite}>
                    <Star />
                  </button> */}
                </div>
              </div>
              <div className='flex items-center mt-1 flex-wrap'>
                {task.tags.length > 0 && (
                  <div className='flex max-w-[600px]'>
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
                  <div className='flex items-center justify-center rounded-[5px]'>
                    <InfoDateSmall
                      svg={<CalSmall />}
                      children={new Date(
                        task.expirationDate
                      ).toLocaleDateString(navigator.language, {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                      expirationDate={task.expirationDate}
                      checked={task.checked}
                    />
                  </div>
                )}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className='flex items-center justify-center rounded-[5px]'>
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
            </div>
            <div className='flex mt-[2px] items-center'>
              {user && (
                <div className='flex items-center justify-center pt-[1px] mx-2'>
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
          <div
            className={isDragging ? styles.deviderDrag : styles.devider}></div>
        </div>
      )}
    </>
  )
}

export default ListItem
