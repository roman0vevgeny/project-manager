import React, { useState, useEffect } from 'react'
import styles from './NewProjectForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../../features/projectSlice'
import {
  addTaskToSection,
  removeTaskFromSection,
} from '../../../features/sectionSlice'
import ProjectInput from './ProjectInput/ProjectInput'
import ErrorMessage from '../ErrorMessage'
import Plus from '../../svgs/Plus'
import { getStatusSmallIcon } from '../../Status/returnStatusIcons'
import Folder from '../../svgs/Folder'
import { updateTaskProjects } from '../../../features/tasksSlice'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const NewProjectForm = ({
  task,
  allProjects,
  isNewTask,
  handleProjectSelect,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)
  const dispatch = useDispatch()

  const projects = useSelector((state) => state.projects)
  const allStatuses = useSelector((state) => state.statuses)
  const allSections = useSelector((state) => state.sections)

  const getStatusIconFromId = (statusId) => {
    const status = allStatuses.find((status) => status.id === statusId)
    if (status) {
      return getStatusSmallIcon(status.icon)
    }
    return getStatusSmallIcon('default')
  }

  const handleNameChange = (value) => {
    setName(value)
    if (value.length > 20) {
      setError('20 characters max')
    } else {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      if (name.length > 20) {
        setError('20 characters max')
        return false
      }
      const newProject = {
        id: Date.now().toString(),
        name: capitalizeFirstLetter(name),
        icon: 'case',
        sections: [111, 222, 333],
      }
      dispatch(addProject(newProject))
      setName('')
      setIsInputVisible(false)
    } else {
      setError('Enter a name')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && name) {
        e.preventDefault()
        handleSubmit(e)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [name])

  const handleProjectClick = (projectId, sectionId) => {
    if (isNewTask) {
      handleProjectSelect(projectId)
    } else {
      const currentSection = allSections.find((section) =>
        section.tasks.includes(task.id)
      )
      if (currentSection) {
        dispatch(
          removeTaskFromSection({
            taskId: task.id,
            sectionId: currentSection.id,
          })
        )
      }
      dispatch(
        updateTaskProjects({
          id: task.id,
          project: projectId,
        })
      )
      dispatch(addTaskToSection({ taskId: task.id, sectionId }))
    }
    onClose()
  }

  const renderSections = (projectId) => {
    const project = projects.find((proj) => proj.id === projectId)

    if (project && project.sections) {
      return project.sections.map((sectionId) => {
        const section =
          allSections && allSections.find((section) => section.id === sectionId)

        if (section) {
          return (
            <div
              key={section.id}
              onClick={() => handleProjectClick(projectId, sectionId)}
              className='text-gray text-13 flex py-[7px] pr-2 pl-4 hover:bg-nav rounded-[8px] space-x-2 items-center flex-nowrap cursor-pointer'>
              <div>{getStatusIconFromId(section.status)}</div>
              <div>{section.name}</div>
            </div>
          )
        }

        return null
      })
    }
    return null
  }

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center mx-[4px]'>
        {allProjects.length > 0 &&
          allProjects.map((proj) => (
            <div className={styles.list} key={proj.id}>
              <div className='text-gray text-13 flex w-full py-[7px] px-2 rounded-[8px] space-x-2 items-center flex-nowrap'>
                <div>{<Folder />}</div>
                <div className='text-task'>{proj.name}</div>
              </div>
              {proj.sections.length > 0 && renderSections(proj.id)}
            </div>
          ))}

        {isInputVisible ? (
          <div className='flex'>
            <ProjectInput name={name} onNameChange={handleNameChange} />
            <button
              type={'submit'}
              onClick={handleSubmit}
              className='flex rounded-[8px] mt-1 text-gray text-14 font-bold bg-nav justify-center items-center hover:bg-nav hover:text-grayHover w-[29px] h-[29px]'>
              <Plus />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsInputVisible(true)}
            className='w-full flex flex-row justify-start items-center text-14 pb-[3px] pt-[5px] rounded-[8px] px-2 text-blueTag my-1 text-start hover:bg-nav hover:text-grayHover'>
            <div className='mr-2'>
              <Plus />
            </div>
            <p>New project</p>
          </button>
        )}
      </div>
      <div>{error && <ErrorMessage message={error} />}</div>
    </form>
  )
}

export default NewProjectForm
