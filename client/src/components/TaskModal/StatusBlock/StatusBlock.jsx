import React, { useState } from 'react'
import styles from './StatusBlock.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskChecked } from '../../../features/tasksSlice'
import { getStatusSmallIcon } from '../../Status/returnStatusIcons'

const StatusBlock = ({ task, onStatusChange, onClose }) => {
  const [newTaskStatus, setNewTaskStatus] = useState(task.status)

  const dispatch = useDispatch()
  const allProjects = useSelector((state) => state.projects)
  console.log('allProjects (statuses): ', allProjects)

  const allStatuses = useSelector((state) => state.statuses)
  console.log('statuses: ', allStatuses)

  const handleChooseStatus = (status) => {
    if (task.id) {
      onStatusChange(status.name)
      if (status.name === 'Done') {
        dispatch(updateTaskChecked(task.id))
      }
      // if (task.projects.length > 0) {
      //   task.projects.forEach((projectId) => {
      //     const project = allProjects.find((proj) => proj.id === projectId)
      //     console.log('handleChoopseStatus project: ', project)
      // if (project) {
      //   let updatedTodoTasks = [...project.todotasks]
      //   let updatedProgressTasks = [...project.progresstasks]
      //   let updatedDoneTasks = [...project.donetasks]

      //   switch (task.status) {
      //     case 'todo':
      //       updatedTodoTasks = updatedTodoTasks.filter(
      //         (id) => id !== task.id
      //       )
      //       break
      //     case 'inprogress':
      //       updatedProgressTasks = updatedProgressTasks.filter(
      //         (id) => id !== task.id
      //       )
      //       break
      //     case 'done':
      //       updatedDoneTasks = updatedDoneTasks.filter(
      //         (id) => id !== task.id
      //       )
      //       break
      //     default:
      //       break
      //   }

      //   switch (status) {
      //     case 'todo':
      //       updatedTodoTasks.push(task.id)
      //       break
      //     case 'inprogress':
      //       updatedProgressTasks.push(task.id)
      //       break
      //     case 'done':
      //       updatedDoneTasks.push(task.id)
      //       break
      //     default:
      //       break
      //   }

      //   dispatch(
      //     updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
      //   )
      //   dispatch(
      //     updateProgressTasksInProject({
      //       projectId,
      //       tasks: updatedProgressTasks,
      //     })
      //   )
      //   dispatch(
      //     updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks })
      //   )
      // }
      // })
      // }
    } else {
      setNewTaskStatus(status.name)
      onStatusChange(status.name)
    }
    onClose()
  }

  // const getStatusText = (status) => {
  //   switch (status.name) {
  //     case 'To-do':
  //       return 'To-do'
  //     case 'In progress':
  //       return 'In progress'
  //     case 'Done':
  //       return 'Done'
  //     default:
  //       return 'To-do'
  //   }
  // }

  return (
    <div className={styles.statuses}>
      {allStatuses.map((stat) => (
        <div
          key={stat.id}
          className='flex w-full items-center justify-start mx-1 px-2 py-1 rounded-[5px] text-grayHover hover:bg-nav cursor-pointer'
          onClick={() => handleChooseStatus(stat)}>
          <div className='flex justify-center items-center w-[20px] h-[20px] mr-1 rounded-[5px]'>
            {getStatusSmallIcon(stat.icon)}
          </div>
          <div className='flex text-13 leading-0 items-center mt-1 ml-1 pb-[2px]'>
            {stat.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusBlock
