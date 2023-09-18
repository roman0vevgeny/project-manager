import React, { useState } from 'react'
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
  deleteTask,
  addTask,
} from '../../features/tasksSlice'
import {
  addTaskToProject,
  removeTaskFromProject,
} from '../../features/projectSlice'
import SubtaskBlock from './SubtaskBlock/SubtaskBlock'
import TaskHeader from './TaskHeader/TaskHeader'
import History from '../svgs/History'
import ProjectForm from './ProjectForm/ProjectForm'
import Trash from '../svgs/Trash'
import Copy from '../svgs/Copy'
import DropdownModal from '../Modal/DropdownModal'
import ModalMenuButton from '../Button/ModalMenuButton'
import Cal from '../svgs/Cal'
import Folder from '../svgs/Folder'
import TagSvg from '../svgs/TagSvg'

const EditTaskModal = ({ onClose, task }) => {
  const [open, setOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openTag, setOpenTag] = useState(false)
  console.log('EditTaskModal - task:', task)

  if (!task) {
    console.log('EditTaskModal - Redirecting to home page')
    onClose()
    // return <Navigate to='/' />
  }

  const dispatch = useDispatch()
  const allTags = useSelector((state) => state.tags)
  // const allTasks = useSelector((state) => state.tasks.tasks)
  // console.log('allTasks: ', allTasks)

  const { id, tags, description, checked, projects } = task || {}

  const handleDeleteTag = (tagId) => {
    dispatch(
      updateTaskTags({
        id: task.id,
        tags: task.tags.filter((id) => id !== tagId),
      })
    )
  }

  const handleDeleteTask = (taskId, projects) => {
    dispatch(deleteTask(taskId))
    projects.forEach((projectId) => {
      dispatch(removeTaskFromProject({ projectId, taskId }))
    })
    onClose()
  }

  const handleProjectSelect = (projectId) => {
    if (projects.includes(projectId)) {
      dispatch(removeTaskFromProject({ projectId, taskId: id }))
      dispatch(
        updateTaskProjects({
          id: task.id,
          projects: projects.filter((id) => id !== projectId),
        })
      )
    } else {
      dispatch(addTaskToProject({ projectId, taskId: id }))
      dispatch(
        updateTaskProjects({
          id: task.id,
          projects: [...projects, projectId],
        })
      )
    }
  }

  const handleDuplicateTask = () => {
    const newTask = {
      ...task,
      id: Date.now(),
    }
    dispatch(addTask(newTask))
    newTask.projects.forEach((projectId) => {
      dispatch(addTaskToProject({ projectId, taskId: newTask.id }))
    })

    onClose()
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleCloseProjectModal = () => {
    setOpenProject(false)
  }

  const handleCloseTagModal = () => {
    setOpenTag(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleOpenProjectModal = () => {
    setOpenProject(true)
  }

  const handleOpenTagModal = () => {
    setOpenTag(true)
  }

  const handleEscapePress = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleCloseModal()
      handleCloseProjectModal()
      handleCloseTagModal()
    }
  }

  return (
    <>
      {task && (
        <div onClose={onClose} className='flex flex-col bg-mainBg mx-8 mb-8'>
          <div className='sticky top-0 z-[301] bg-mainBg pt-8 pb-0 h-fit'>
            <TaskHeader
              task={task}
              onFavoriteChange={(newFavorite) =>
                dispatch(
                  updateTaskIsFavorite({ id: task.id, favorite: newFavorite })
                )
              }
              isNewTask={false}
              dispatch={dispatch}
              handleProjectSelect={handleProjectSelect}
            />
          </div>

          <div className='relative flex flex-row w-full h-full mt-6'>
            <div className='flex flex-col justify-between h-full flex-grow'>
              <div className='flex flex-col flex-grow'>
                <TaskNameModal id={id} checked={checked} />
                {description === '' && checked ? (
                  ' '
                ) : (
                  <TaskDescription task={task} checked={checked} />
                )}

                {tags.length > 0 && (
                  <div className='flex flex-wrap ml-4 mt-1 mb-1 max-w-[530px]'>
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
                  parentTask={task}
                />
              </div>
              <div className='m-2 flex'>
                <div className='mr-1 flex space-x-2 w-full'>
                  <button
                    type={'submit'}
                    onClick={handleDuplicateTask}
                    className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <Copy />
                    </div>
                  </button>
                  <button
                    type={'submit'}
                    className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <History />
                    </div>
                  </button>
                  {checked && (
                    <button
                      type={'submit'}
                      className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                      <div className=''>
                        <History />
                      </div>
                    </button>
                  )}
                  <button
                    type={'submit'}
                    onClick={() => handleDeleteTask(id, projects)}
                    className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-redTag hover:text-redTag my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <Trash />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {!checked && (
              <>
                <div className={styles.verticalDevider}></div>
                <div className='pl-1 pr-1 mb-2 py-2 rounded-[10px]'>
                  <div>
                    <div className='relative flex flex-row'>
                      <ModalMenuButton
                        svgLeft={<Folder />}
                        children={'Add project'}
                        onClick={handleOpenProjectModal}
                        onClose={handleCloseProjectModal}
                      />
                      <DropdownModal
                        children={
                          <ProjectForm
                            value={projects}
                            onChange={(newProjects) =>
                              dispatch(
                                updateTaskProjects({
                                  id: task.id,
                                  projects: newProjects,
                                })
                              )
                            }
                            isNewTask={false}
                            handleProjectSelect={handleProjectSelect}
                            taskId={id}
                            onClose={handleCloseProjectModal}
                          />
                        }
                        open={openProject}
                        onClose={handleCloseProjectModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>

                    <div className='relative flex flex-row'>
                      <ModalMenuButton
                        svgLeft={<Cal />}
                        children={
                          (task.expirationDate &&
                            new Date(task.expirationDate).toLocaleDateString(
                              navigator.language,
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                              }
                            )) ||
                          'Add due date'
                        }
                        onClick={handleOpenModal}
                        expirationDate={
                          task.expirationDate &&
                          task.expirationDate.slice(0, -1)
                        }
                        checked={checked}
                        onClose={handleCloseModal}
                      />
                      <DropdownModal
                        children={
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
                            onClose={handleCloseModal}
                          />
                        }
                        open={open}
                        onClose={handleCloseModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<TagSvg />}
                        children={'Add tags'}
                        onClick={handleOpenTagModal}
                        onClose={handleCloseTagModal}
                      />
                      <DropdownModal
                        children={
                          <TagForm
                            value={tags}
                            onChange={(newTags) =>
                              dispatch(
                                updateTaskTags({ id: task.id, tags: newTags })
                              )
                            }
                            isNewTask={false}
                            taskId={id}
                          />
                        }
                        open={openTag}
                        onClose={handleCloseTagModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default EditTaskModal
