import React from 'react'
import InfoCard from '../Info/InfoCard'
import Star from '../svgs/Star'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './CardItem.module.scss'
import Cal from '../svgs/Cal'
import Tag from '../Tag/Tag'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateTaskChecked,
  updateTaskIsFavorite,
  updateTaskStatus,
  updateTaskSubtasks,
} from '../../features/tasksSlice'
import InfoExpiration from '../Info/InfoExpiration'
import { selectTaskById } from '../../helpers/selectTaskById'
import TaskDescription from '../TaskDescription/TaskDescription'
import TaskSubtasks from '../TaskSubtasks/TaskSubtasks'
import Folder from '../svgs/Folder'
// import {
//   updateDoneTasksInProject,
//   updateTodoTasksInProject,
//   updateProgressTasksInProject,
// } from '../../features/projectSlice'

const CardItem = ({ taskId, onClick, isDragging }) => {
  const task = useSelector((state) => selectTaskById(state, taskId))
  const dispatch = useDispatch()
  const checked = task.checked
  const favorite = task.favorite

  const allTags = useSelector((state) => state.tags)
  const allProjects = useSelector((state) => state.projects)
  const allUsers = useSelector((state) => state.users.users)

  const user = allUsers.find((user) => user.id === task.users)

  const handleToggleFavorite = (e) => {
    dispatch(updateTaskIsFavorite({ id: task.id, favorite: !task.favorite }))
    e.stopPropagation()
  }

  const handleSubtasksChange = (newSubtasks) => {
    dispatch(updateTaskSubtasks({ id: taskId, subtasks: newSubtasks }))
  }

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
          // let updatedTodoTasks = [...project.todotasks]
          // let updatedProgressTasks = [...project.progresstasks]
          // let updatedDoneTasks = [...project.donetasks]
          // switch (currentStatus) {
          //   case 'todo':
          //     updatedTodoTasks = updatedTodoTasks.filter((id) => id !== taskId)
          //     break
          //   case 'inprogress':
          //     updatedProgressTasks = updatedProgressTasks.filter(
          //       (id) => id !== taskId
          //     )
          //     break
          //   case 'done':
          //     updatedDoneTasks = updatedDoneTasks.filter((id) => id !== taskId)
          //     break
          //   default:
          //     break
          // }
          // switch (newStatus) {
          //   case 'todo':
          //     updatedTodoTasks.push(taskId)
          //     break
          //   case 'inprogress':
          //     updatedProgressTasks.push(taskId)
          //     break
          //   case 'done':
          //     updatedDoneTasks.push(taskId)
          //     break
          //   default:
          //     break
          // }
          // dispatch(
          //   updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
          // )
          // dispatch(
          //   updateProgressTasksInProject({
          //     projectId,
          //     tasks: updatedProgressTasks,
          //   })
          // )
          // dispatch(
          //   updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks })
          // )
        }
      })
    }
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

  const renderProjects = () => {
    return (
      <div className={styles.projectContainer}>
        {task.projects.length === 1 ? (
          <InfoCard
            svg={<Folder />}
            children={
              allProjects.find((project) => project.id === task.projects[0])
                .name
            }
          />
        ) : task.projects.length > 1 ? (
          <InfoCard
            svg={<Folder />}
            children={`${
              allProjects.find((project) => project.id === task.projects[0])
                .name
            } ...+${task.projects.length - 1}`}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className='relative w-full p-2 '>
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
          <div className='flex flex-raw justify-between items-start w-full'>
            <div className=''>
              <TaskName name={task.name} checked={task.checked} cards={true} />
            </div>
            <div className='flex mt-[2px]'>
              {renderProjects()}
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
              {/* <button
                className={favorite ? styles.favorite : styles.notFavorite}
                onClick={handleToggleFavorite}>
                <Star />
              </button> */}
              <div className='flex items-center'>
                {user && (
                  <div className='flex items-center justify-center mx-2'>
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
          </div>
          {task.description ? (
            <div className='pt-2'>
              <TaskDescription description={task.description} width={false} />
            </div>
          ) : (
            <div className='h-[5px]'></div>
          )}
          {task.subtasks.length > 0 && (
            <div className='flex flex-wrap'>
              <TaskSubtasks
                subtasks={task.subtasks}
                onSubtasksChange={handleSubtasksChange}
                checked={task.checked}
              />
            </div>
          )}
          <div className='flex'>
            {task.tags.length > 0 && (
              <div className='flex max-w-[600px] flex-wrap'>
                {task.tags.map((tagId, index) => {
                  const tag = allTags.find((tag) => tag.id === tagId)
                  return (
                    tag && (
                      <Tag
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
