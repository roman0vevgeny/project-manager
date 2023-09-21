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
import Folder from '../svgs/Folder'
import Cal from '../svgs/Cal'
import TagSvg from '../svgs/TagSvg'
import ModalMenuButton from '../Button/ModalMenuButton'
import DropdownModal from '../Modal/DropdownModal'
import Priority from '../svgs/Priority'
import PriorityBlock from './PriorityBlock/PriorityBlock'

const CreateTaskModal = ({ onClose, today, projectId, date }) => {
  const [task, setTask] = useState({
    id: Date.now(),
    name: '',
    description: '',
    tags: [],
    expirationDate: null,
    subtasks: [],
    checked: false,
    favorite: false,
    status: 'todo',
    projects: [],
  })
  const [open, setOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openTag, setOpenTag] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)
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
    if (date && !task.expirationDate) {
      setTask({ ...task, expirationDate: date })
    }
  }, [date])

  useEffect(() => {
    setError(null)
  }, [task.name])

  const dispatch = useDispatch()
  const { expirationDate, checked } = task

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

  const handleClosePriorityModal = () => {
    setOpenPriority(false)
  }

  const handleOpenPriorityModal = () => {
    setOpenPriority(true)
  }

  console.log('task desc: ', task.description)

  return (
    <div className='flex flex-col bg-mainBg mx-8 mb-8'>
      <div className='sticky top-0 z-[301] bg-mainBg pt-8 pb-0 h-fit'>
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

      <div className='relative flex flex-row w-full h-full mt-6'>
        <div className='flex flex-col justify-between h-full flex-grow'>
          <div className='flex flex-col flex-grow'>
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
            {task.tags.length > 0 && (
              <div className='flex flex-wrap ml-4 mt-1 mb-1 max-w-[530px]'>
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
          <div className='m-2 flex flex-col'>
            {error && (
              <p className='flex px-2 py-1 mt-2 rounded-md text-redTag bg-redTag text-14 justify-center'>
                {error}
              </p>
            )}
            <button
              type={'submit'}
              className='flex p-[6px] rounded-[6px] text-grayHover text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 w-full'
              onClick={handleCreateTask}>
              <div>
                <Plus />
              </div>
              <p className='flex justify-center ml-1'>Create task</p>
            </button>
          </div>
        </div>
        <>
          <div className={styles.verticalDevider}></div>
          <div className='pl-1 pr-1 mb-2 py-2 rounded-[10px]'>
            <div>
              <div className='relative flex flex-row'>
                <ModalMenuButton
                  svgLeft={<Folder />}
                  children={'Add project'}
                  onClick={handleOpenProjectModal}
                />
                <DropdownModal
                  children={
                    <ProjectForm
                      value={task.projects}
                      onChange={(newProjects) =>
                        setTask({ ...task, projects: newProjects })
                      }
                      isNewTask={false}
                      taskId={null}
                      handleProjectSelect={handleProjectSelect}
                      onClose={handleCloseProjectModal}
                    />
                  }
                  open={openProject}
                  onClose={handleCloseProjectModal}
                  noBorder={true}
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
                    task.expirationDate && task.expirationDate.slice(0, -1)
                  }
                  checked={checked}
                  date={true}
                />
                <DropdownModal
                  children={
                    <Calend
                      expirationDate={expirationDate}
                      task={task}
                      onChange={(newExpirationDate) =>
                        setTask({
                          ...task,
                          expirationDate: newExpirationDate,
                        })
                      }
                      onClose={handleCloseModal}
                    />
                  }
                  open={open}
                  onClose={handleCloseModal}
                  noBorder={true}
                />
              </div>

              <div className='relative flex flex-row'>
                <ModalMenuButton
                  svgLeft={<TagSvg />}
                  children={'Add tags'}
                  onClick={handleOpenTagModal}
                />
                <DropdownModal
                  children={
                    <TagForm
                      value={task.tags}
                      onChange={(newTags) =>
                        setTask({ ...task, tags: newTags })
                      }
                      isNewTask={true}
                      taskId={null}
                    />
                  }
                  open={openTag}
                  onClose={handleCloseTagModal}
                  noBorder={true}
                />
              </div>
              <div className='relative flex flex-row mr-2'>
                <ModalMenuButton
                  svgLeft={<Priority />}
                  children={
                    task.priority
                      ? `Priority: ${task.priority}`
                      : 'Set priority'
                  }
                  onClick={handleOpenPriorityModal}
                  onClose={handleClosePriorityModal}
                  priority={task.priority}
                />
                <DropdownModal
                  children={
                    <PriorityBlock
                      task={task}
                      isNewTask={true}
                      onPriorityChange={(newPriority) =>
                        setTask({ ...task, priority: newPriority })
                      }
                      onClose={handleClosePriorityModal}
                    />
                  }
                  open={openPriority}
                  onClose={handleClosePriorityModal}
                  noBorder={true}
                  stopPropagation={true}
                  // onEscapePress={handleEscapePress}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default CreateTaskModal
