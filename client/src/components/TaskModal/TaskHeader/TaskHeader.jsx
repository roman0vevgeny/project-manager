import React from 'react'
import InfoCard from '../../Info/InfoCard'
import Subtasks from '../../svgs/Subtasks'
import { useSelector } from 'react-redux'
import {
  setTaskPriority,
  updateTaskExpirationDate,
} from '../../../features/tasksSlice'
import Star from '../../svgs/Star'
import Cal from '../../svgs/Cal'
import styles from './TaskHeader.module.scss'
import InfoDate from '../../Info/InfoDate'
import Project from '../../TaskModal/ProjectForm/Project/Project'
import Priority from '../../svgs/Priority'

const TaskHeader = ({
  task,
  onFavoriteChange,
  onProjectsChange,
  onExpirationDateChange,
  isNewTask,
  dispatch,
  handleProjectSelect,
  onPriorityChange,
}) => {
  const {
    subtasks,
    creationDate,
    expirationDate,
    favorite,
    checked,
    project,
    id,
  } = task

  const allProjects = useSelector((state) => state.projects)
  // console.log('project from TaskHeader: ', project)
  const taskProject = allProjects.find((proj) => proj.id === task.project)
  // console.log('taskProject from TaskHeader: ', taskProject)

  const handleToggleFavorite = () => {
    onFavoriteChange(!favorite)
  }

  const handleDeleteProject = (projectId) => {
    const updatedProjects = ''

    if (isNewTask) {
      onProjectsChange(updatedProjects)
    } else {
      handleProjectSelect(projectId, allProjects, sectionId, task)
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

  const handleDeletePriority = () => {
    if (isNewTask) {
      onPriorityChange(null)
    } else {
      dispatch(
        setTaskPriority({
          id: id,
          priority: null,
        })
      )
    }
  }

  const renderProject = () => {
    if (taskProject) {
      return (
        <div className='flex flex-row justify-end'>
          <Project
            projectName={taskProject.name}
            deleteProject={!checked ? true : false}
            // onDelete={() => handleDeleteProject(projectId)}
            checked={checked}
          />
        </div>
      )
    }
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center text-gray mb-3'>
        {!isNewTask && creationDate && (
          <p className='text-12'>Created {creationDate.slice(0, 10)}</p>
        )}
        {isNewTask && <p className='text-12'>Create a new task</p>}
        <div className='flex flex-row justify-end'>
          {renderProject()}
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
          {task.priority && (
            <InfoCard
              svg={<Priority />}
              color={
                task.priority === 'Low'
                  ? 'text-blueTag bg-blueTag'
                  : task.priority === 'Medium'
                  ? 'text-yellowTag bg-yellowTag'
                  : task.priority === 'High'
                  ? 'text-redTag bg-redTag'
                  : 'text-grayHover'
              }
              onDelete={() => handleDeletePriority()}
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
