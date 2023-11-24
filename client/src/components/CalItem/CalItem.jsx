import React from 'react'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './CalItem.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskChecked, updateTaskStatus } from '../../features/tasksSlice'
import { selectTaskById } from '../../helpers/selectTaskById'
// import {
//   updateDoneTasksInProject,
//   updateTodoTasksInProject,
//   updateProgressTasksInProject,
// } from '../../features/projectSlice'

const CalItem = ({ taskId, onClick, isDragging }) => {
  const task = useSelector((state) => selectTaskById(state, taskId))
  const dispatch = useDispatch()
  const checked = task.checked
  const allProjects = useSelector((state) => state.projects)

  const toggleChecked = (e) => {
    e.stopPropagation()
    dispatch(updateTaskChecked(taskId))

    const currentStatus = task.status
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }))

    if (task.projects.length > 0) {
      task.projects.forEach((projectId) => {
        const project = allProjects.find((proj) => proj.id === projectId)
        // if (project) {
        //   let updatedTodoTasks = [...project.todotasks]
        //   let updatedProgressTasks = [...project.progresstasks]
        //   let updatedDoneTasks = [...project.donetasks]

        //   switch (currentStatus) {
        //     case 'todo':
        //       updatedTodoTasks = updatedTodoTasks.filter((id) => id !== taskId)
        //       break
        //     case 'inprogress':
        //       updatedProgressTasks = updatedProgressTasks.filter(
        //         (id) => id !== taskId
        //       )
        //       break
        //     case 'done':
        //       updatedDoneTasks = updatedDoneTasks.filter((id) => id !== taskId)
        //       break
        //     default:
        //       break
        //   }

        //   switch (newStatus) {
        //     case 'todo':
        //       updatedTodoTasks.push(taskId)
        //       break
        //     case 'inprogress':
        //       updatedProgressTasks.push(taskId)
        //       break
        //     case 'done':
        //       updatedDoneTasks.push(taskId)
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
      })
    }
  }

  return (
    <>
      {task && (
        <div className='relative w-full cursor-auto py-[2px] truncate'>
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
              <div className='flex flex-raw justify-between items-start w-full truncate'>
                <div>
                  <TaskName
                    name={task.name}
                    checked={task.checked}
                    calendar={true}
                  />
                </div>
              </div>
            </div>
            <div className='absolute top-0 right-0 w-[20px] bg-gradient-to-l from-mainBg via-mainBg via-30% h-[31px] z-[10] rounded-r-[9px]'></div>
          </div>
          <div
            className={isDragging ? styles.deviderDrag : styles.devider}></div>
        </div>
      )}
    </>
  )
}

export default CalItem
