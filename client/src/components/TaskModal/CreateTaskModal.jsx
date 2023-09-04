import React, { useState, useEffect } from 'react'
import styles from './EditTaskModal.module.scss'
import CreateTaskName from './TaskName/CreateTaskName'
import TagForm from './TagForm/TagForm'
import Calend from './Calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../../features/tasksSlice'
import { addTaskToProject } from '../../features/projectSlice'
import Plus from '../svgs/Plus'
import Tag from '../Tag/Tag'
import TaskHeader from './TaskHeader/TaskHeader'
import SubtaskBlock from './SubtaskBlock/SubtaskBlock'
import ProjectForm from './ProjectForm/ProjectForm'
import CreateBangle from '../TextEditor/CreateBangle'

const CreateTaskModal = ({ onClose, today, projectId }) => {
  const [task, setTask] = useState({
    id: Date.now(),
    name: '',
    description: '',
    tags: [],
    expirationDate: null,
    subtasks: [],
    checked: false,
    favorite: false,
    projects: [],
  })

  const [error, setError] = useState(null)

  useEffect(() => {
    if (today && !task.expirationDate) {
      setTask({ ...task, expirationDate: new Date().toISOString() })
    }
  }, [today])

  useEffect(() => {
    if (projectId && !task.projects.includes(projectId)) {
      setTask({ ...task, projects: [...task.projects, projectId] })
    }
  }, [projectId])

  useEffect(() => {
    setError(null)
  }, [task.name])

  const dispatch = useDispatch()
  const { expirationDate } = task

  const allTags = useSelector((state) => state.tags)

  const handleCreateTask = () => {
    if (!task.name || task.name === '') {
      setError('Please enter a valid task name')
    } else {
      setError(null)
      dispatch(addTask(task))
      task.projects.forEach((projectId) => {
        dispatch(addTaskToProject({ projectId, taskId: task.id }))
      })
      onClose()
    }
  }

  const handleProjectSelect = (projectId) => {
    if (task.projects.includes(projectId)) {
      setTask({
        ...task,
        projects: task.projects.filter((id) => id !== projectId),
      })
    } else {
      setTask({ ...task, projects: [...task.projects, projectId] })
    }
  }

  console.log('task desc: ', task.description)

  return (
    <div className='bg-mainBg mx-8 mb-8'>
      <div className='sticky top-0 z-[1] bg-mainBg pt-8'>
        <TaskHeader
          task={task}
          onFavoriteChange={(newFavorite) =>
            setTask({ ...task, favorite: newFavorite })
          }
          onProjectsChange={(newProjects) =>
            setTask({ ...task, projects: newProjects })
          }
          onExpirationDateChange={(newExpirationDate) =>
            setTask({ ...task, expirationDate: newExpirationDate })
          }
          isNewTask={true}
          taskId={null}
        />
      </div>

      <div className='flex flex-row'>
        <div className='flex flex-col justify-between'>
          <div>
            <CreateTaskName
              name={task.name}
              setName={(newName) => setTask({ ...task, name: newName })}
            />
            <CreateBangle
              description={task.description}
              setDescription={(newDescription) =>
                setTask({ ...task, description: newDescription })
              }
            />
            {task.tags && (
              <div className='flex flex-wrap ml-4 mt-1 mb-3 max-w-[530px]'>
                {task.tags.map((tagId) => {
                  const tag = allTags.find((tag) => tag.id === tagId)
                  return (
                    tag && (
                      <Tag
                        color={tag.color}
                        tagName={tag.name}
                        deleteTag={true}
                        key={tagId}
                        onDelete={() =>
                          setTask({
                            ...task,
                            tags: task.tags.filter((id) => id !== tagId),
                          })
                        }
                      />
                    )
                  )
                })}
              </div>
            )}

            <SubtaskBlock
              subtasks={task.subtasks}
              onSubtasksChange={(newSubtasks) =>
                setTask({ ...task, subtasks: newSubtasks })
              }
              isNewTask={true}
            />
          </div>
          <div className='m-2'>
            <button
              type={'submit'}
              className='flex p-1 rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 w-full'
              onClick={handleCreateTask}>
              <div>
                <Plus />
              </div>
              <p className='flex justify-center ml-1'>Create task</p>
            </button>
            {error && (
              <p className='flex p-2 mt-2 rounded-md text-redTag bg-redTag text-14 justify-center'>
                {error}
              </p>
            )}
          </div>
        </div>
        <>
          <div className={styles.verticalDevider}></div>
          <div className='ml-5 mt-2'>
            <div>
              <ProjectForm
                value={task.projects}
                onChange={(newProjects) =>
                  setTask({ ...task, projects: newProjects })
                }
                isNewTask={false}
                taskId={null}
                handleProjectSelect={handleProjectSelect}
              />
              <Calend
                expirationDate={expirationDate}
                task={task}
                onChange={(newExpirationDate) =>
                  setTask({
                    ...task,
                    expirationDate: newExpirationDate,
                  })
                }
              />
              <TagForm
                value={task.tags}
                onChange={(newTags) => setTask({ ...task, tags: newTags })}
                isNewTask={true}
                taskId={null}
              />
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default CreateTaskModal
