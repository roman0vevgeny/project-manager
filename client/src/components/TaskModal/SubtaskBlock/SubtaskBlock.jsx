import React, { useState, useRef } from 'react'
import CheckBox from '../../CheckBox/CheckBox'
import Subtask from './Subtask/Subtask'
import SubtaskInput from './SubtaskInput/SubtaskInput'
import styles from './SubtaskBlock.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../../../features/tasksSlice'
import {
  addTaskToProject,
  updateDoneTasksInProject,
  updateProgressTasksInProject,
  updateTodoTasksInProject,
} from '../../../features/projectSlice'

const SubtaskBlock = ({ subtasks, onSubtasksChange, checked, parentTask }) => {
  const [subtaskInput, setSubtaskInput] = useState('')
  const inputRef = useRef(null)

  const allProjects = useSelector((state) => state.projects)

  const dispatch = useDispatch()

  const handleAddSubtask = (subtask) => {
    onSubtasksChange([...subtasks, subtask])
  }

  const transformSubtaskToTask = (subtask, parentTask) => {
    const { expirationDate, projects, tags, status, priority } = parentTask
    return {
      id: Date.now(),
      name: subtask.name,
      description: '',
      subtasks: [],
      expirationDate: expirationDate,
      tags: tags,
      projects: projects,
      favorite: false,
      checked: false,
      status: status,
      priority: priority,
    }
  }

  const handleDeleteSubtask = (subtaskId) => {
    onSubtasksChange(subtasks.filter((subtask) => subtask.id !== subtaskId))
  }

  // const handleTransformClick = (subtaskToTransform) => {
  //   const newTask = transformSubtaskToTask(subtaskToTransform, parentTask)
  //   dispatch(addTask(newTask))
  //   console.log('newTask: ', newTask)
  //   const taskId = newTask.id
  //   console.log('taskId: ', taskId)
  //   const parentProjects = parentTask.projects
  //   console.log('parentProjects: ', parentProjects)
  //   newTask.projects.forEach((projectId) => {
  //     dispatch(addTaskToProject({ projectId, taskId: taskId }))
  //   })
  //   handleDeleteSubtask(subtaskToTransform.id)
  // }

  const handleTransformClick = (subtaskToTransform) => {
    const newTask = transformSubtaskToTask(subtaskToTransform, parentTask)
    dispatch(addTask(newTask))
    console.log('newTask: ', newTask)
    const taskId = newTask.id
    console.log('taskId: ', taskId)
    const parentProjects = parentTask.projects
    console.log('parentProjects: ', parentProjects)
    newTask.projects.forEach((projectId) => {
      dispatch(addTaskToProject({ projectId, taskId: taskId }))
      const project = allProjects.find((proj) => proj.id === projectId)
      if (project) {
        let updatedTodoTasks = [...project.todotasks]
        let updatedProgressTasks = [...project.progresstasks]
        let updatedDoneTasks = [...project.donetasks]

        switch (newTask.status) {
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
    handleDeleteSubtask(subtaskToTransform.id)
  }

  const handleSubtaskCheckedChange = (subtaskId, checked) => {
    onSubtasksChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, checked: checked } : subtask
      )
    )
  }

  const handleSubtaskNameChange = (subtaskId, subtaskName) => {
    onSubtasksChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, name: subtaskName } : subtask
      )
    )
  }

  const handleSubtaskSubmit = (e) => {
    e.preventDefault()
    if (subtaskInput.trim()) {
      const newSubtask = {
        id: new Date().toISOString(),
        name: subtaskInput,
        checked: false,
      }
      handleAddSubtask(newSubtask)
      setSubtaskInput('')
    }
  }

  return (
    <div className='mb-4'>
      {subtasks &&
        subtasks.map((subtask) => (
          <div key={subtask.id} className='flex items-start mx-2 mb-1 mt-2'>
            <button
              className={styles.checkbox}
              onClick={(e) => {
                e.preventDefault()
                handleSubtaskCheckedChange(subtask.id, !subtask.checked)
              }}>
              <CheckBox
                checked={subtask.checked}
                toggleChecked={() =>
                  handleSubtaskCheckedChange(subtask.id, !subtask.checked)
                }
              />
            </button>
            <Subtask
              subtask={subtask}
              checked={checked}
              onChange={handleSubtaskNameChange}
              onDelete={() => handleDeleteSubtask(subtask.id)}
              onTransform={() => handleTransformClick(subtask)}
            />
          </div>
        ))}
      {!checked && (
        <SubtaskInput
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          onSubmit={handleSubtaskSubmit}
          inputRef={inputRef}
        />
      )}
    </div>
  )
}

export default SubtaskBlock
