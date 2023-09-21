import React, { useState } from 'react'
import styles from './StatusBlock.module.scss'
import Status from '../../svgs/Status'
import StatusEmpty from '../../svgs/StatusEmpty'
import StatusInProgress from '../../svgs/StatusInProgress'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskChecked } from '../../../features/tasksSlice'
import {
  updateTodoTasksInProject,
  updateDoneTasksInProject,
  updateProgressTasksInProject,
} from '../../../features/projectSlice'

const StatusBlock = ({ task, onStatusChange, onClose }) => {
  const [newTaskStatus, setNewTaskStatus] = useState(task.status)

  const dispatch = useDispatch()
  const allProjects = useSelector((state) => state.projects)

  const statuses = ['todo', 'inprogress', 'done']

  const handleChooseStatus = (status) => {
    if (task.id) {
      onStatusChange(status)
      if (status === 'done') {
        dispatch(updateTaskChecked(task.id))
      }
      if (task.projects.length > 0) {
        task.projects.forEach((projectId) => {
          const project = allProjects.find((proj) => proj.id === projectId)
          if (project) {
            let updatedTodoTasks = [...project.todotasks]
            let updatedProgressTasks = [...project.progresstasks]
            let updatedDoneTasks = [...project.donetasks]

            switch (task.status) {
              case 'todo':
                updatedTodoTasks = updatedTodoTasks.filter(
                  (id) => id !== task.id
                )
                break
              case 'inprogress':
                updatedProgressTasks = updatedProgressTasks.filter(
                  (id) => id !== task.id
                )
                break
              case 'done':
                updatedDoneTasks = updatedDoneTasks.filter(
                  (id) => id !== task.id
                )
                break
              default:
                break
            }

            switch (status) {
              case 'todo':
                updatedTodoTasks.push(task.id)
                break
              case 'inprogress':
                updatedProgressTasks.push(task.id)
                break
              case 'done':
                updatedDoneTasks.push(task.id)
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
    } else {
      setNewTaskStatus(status)
      onStatusChange(status)
    }
    onClose()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo':
        return <StatusEmpty />
      case 'inprogress':
        return <StatusInProgress />
      case 'done':
        return <Status />
      default:
        return <StatusEmpty />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'todo':
        return 'To do'
      case 'inprogress':
        return 'In progress'
      case 'done':
        return 'Done'
      default:
        return 'To do'
    }
  }

  return (
    <div className='w-[227px]'>
      {statuses.map((stat) => (
        <div
          key={stat}
          className='flex items-center justify-start m-1 px-2 py-1 rounded-[5px] text-grayHover hover:bg-nav cursor-pointer'
          onClick={() => handleChooseStatus(stat)}>
          <div className='flex justify-center items-center w-[20px] h-[20px] mr-1 rounded-[5px]'>
            {getStatusIcon(stat)}
          </div>
          <div className='flex text-13 leading-0 items-center mt-1 ml-1 pb-[2px]'>
            {getStatusText(stat)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusBlock
