import React from 'react'
import InfoCard from '../Info/InfoCard'
import Star from '../svgs/Star'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './BoardItem.module.scss'
import Cal from '../svgs/Cal'
import Tag from '../Tag/Tag'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateTaskChecked,
  updateTaskIsFavorite,
} from '../../features/tasksSlice'
import Subtasks from '../svgs/Subtasks'
import InfoExpiration from '../Info/InfoExpiration'
import { selectTaskById } from '../../helpers/selectTaskById'
import Folder from '../svgs/Folder'

const BoardItem = ({ taskId, onClick, isDragging }) => {
  const task = useSelector((state) => selectTaskById(state, taskId))
  const dispatch = useDispatch()
  const checked = task.checked
  const favorite = task.favorite
  const totalSubtasks = task.subtasks.length
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.checked
  ).length
  const subtasksCounter = `${completedSubtasks}/${totalSubtasks}`

  const allTags = useSelector((state) => state.tags)
  const allProjects = useSelector((state) => state.projects)

  const handleToggleFavorite = (e) => {
    dispatch(updateTaskIsFavorite({ id: task.id, favorite: !task.favorite }))
    e.stopPropagation()
  }

  const toggleChecked = (e) => {
    e.stopPropagation()
    dispatch(updateTaskChecked(taskId))
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
    <div className='relative flex flex-col w-[450px] p-2 '>
      <div
        className={isDragging ? styles.dragging : styles.body}
        onClick={onClick}>
        <div className='flex flex-row w-full'>
          <button className={styles.checkbox} onClick={toggleChecked}>
            <CheckBox checked={checked} toggleChecked={toggleChecked} />
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
        </div>

        <div className='flex flex-row mt-4 w-full justify-end'>
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
          <button
            className={favorite ? styles.favorite : styles.notFavorite}
            onClick={handleToggleFavorite}>
            <Star />
          </button>
        </div>

        <div className='flex justify-end w-full mt-2'>
          {task.tags.length > 0 && (
            <div className='flex max-w-[600px] flex-wrap justify-end'>
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
  )
}

export default BoardItem
