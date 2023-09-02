import React from 'react'
import TaskNameModal from './TaskName/TaskNameModal'
import styles from './EditTaskModal.module.scss'
import TaskDescription from './TaskDescription/TaskDescription'
import TagForm from './TagForm/TagForm'
import Tag from '../Tag/Tag'
import Calend from './Calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTaskExpirationDate,
  updateTaskTags,
  updateTaskSubtasks,
  updateTaskIsFavorite,
  updateTaskProjects,
} from '../../features/tasksSlice'
import {
  addTaskToProject,
  removeProjectFromTasks,
  removeTaskFromProject,
} from '../../features/projectSlice'
import SubtaskBlock from './SubtaskBlock/SubtaskBlock'
import TaskHeader from './TaskHeader/TaskHeader'
import History from '../svgs/History'
import ProjectForm from './ProjectForm/ProjectForm'

const EditTaskModal = ({ handleCloseModal, task }) => {
  const { id, tags, description, checked, projects } = task
  const dispatch = useDispatch()
  const allTags = useSelector((state) => state.tags)
  console.log('allTags: ', allTags)
  const allTasks = useSelector((state) => state.tasks.tasks)
  console.log('allTasks: ', allTasks)

  const handleDeleteTag = (tagId) => {
    dispatch(
      updateTaskTags({
        id: task.id,
        tags: task.tags.filter((id) => id !== tagId),
      })
    )
  }

  const handleProjectSelect = (projectId) => {
    if (projects.includes(projectId)) {
      dispatch(removeTaskFromProject({ projectId, taskId: id }))
      console.log('project: ', projectId, 'task: ', id, 'removed')
      dispatch(
        updateTaskProjects({
          id: task.id,
          projects: projects.filter((id) => id !== projectId),
        })
      )
      console.log('project: ', projectId, 'task: ', id, 'removed')
    } else {
      dispatch(addTaskToProject({ projectId, taskId: id }))
      console.log('project: ', projectId, 'task: ', id, 'added')
      dispatch(
        updateTaskProjects({ id: task.id, projects: [...projects, projectId] })
      )
      console.log('project: ', projectId, 'task: ', id, 'added')
    }
  }

  return (
    <div onClose={handleCloseModal} className='bg-mainBg mx-8 mb-8'>
      <div className='sticky top-0 z-[1] bg-mainBg pt-8'>
        <TaskHeader
          task={task}
          onFavoriteChange={(newFavorite) =>
            dispatch(
              updateTaskIsFavorite({ id: task.id, favorite: newFavorite })
            )
          }
          isNewTask={false}
          dispatch={dispatch}
        />
      </div>

      <div className='relative flex flex-row w-full'>
        <div className='flex flex-col justify-between'>
          <div>
            <TaskNameModal id={id} checked={checked} />
            {description === '' && checked ? (
              ' '
            ) : (
              <TaskDescription task={task} checked={checked} />
            )}

            {tags.length > 0 && (
              <div className='flex flex-wrap ml-4 mt-1 mb-3 max-w-[530px]'>
                {tags.map((tagId, index) => {
                  const tag = allTags.find((tag) => tag.id === tagId)
                  return (
                    tag && (
                      <Tag
                        color={tag.color}
                        tagName={tag.name}
                        deleteTag={!checked ? true : false}
                        key={index}
                        onDelete={() => handleDeleteTag(tagId)}
                        checked={checked}
                      />
                    )
                  )
                })}
              </div>
            )}
            <SubtaskBlock
              subtasks={task.subtasks}
              onSubtasksChange={(newSubtasks) =>
                dispatch(
                  updateTaskSubtasks({ id: task.id, subtasks: newSubtasks })
                )
              }
              checked={checked}
            />
          </div>
          <div className='m-2 flex w-full'>
            <div className='w-full mr-1'>
              <button
                type={'submit'}
                className='flex p-1 rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 w-full'>
                <div className='mr-2'>
                  <History />
                </div>
                <p className='flex justify-center ml-1'>View history</p>
              </button>
            </div>

            {checked && (
              <div className='w-full ml-1'>
                <button
                  type={'submit'}
                  className='flex p-1 rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 w-full'>
                  <div className='mr-2'>
                    <History />
                  </div>
                  <p className='flex justify-center ml-1'>Add to archive</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {!checked && (
          <>
            <div className={styles.verticalDevider}></div>
            <div className='ml-5 mt-2'>
              <div>
                <ProjectForm
                  value={projects}
                  onChange={(newProjects) =>
                    dispatch(
                      updateTaskProjects({ id: task.id, projects: newProjects })
                    )
                  }
                  isNewTask={false}
                  handleProjectSelect={handleProjectSelect}
                  taskId={id}
                />
                <Calend
                  expirationDate={task.expirationDate}
                  task={task}
                  dispatch={dispatch}
                  onChange={(newExpirationDate) =>
                    dispatch(
                      updateTaskExpirationDate({
                        id: task.id,
                        expirationDate: newExpirationDate,
                      })
                    )
                  }
                  checked={checked}
                />
                <TagForm
                  value={tags}
                  onChange={(newTags) =>
                    dispatch(updateTaskTags({ id: task.id, tags: newTags }))
                  }
                  isNewTask={false}
                  taskId={id}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EditTaskModal
