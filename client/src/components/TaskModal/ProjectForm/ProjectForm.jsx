import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../../features/projectSlice'
import ProjectInput from './ProjectInput/ProjectInput'
import AllProjects from './AllProjects/AllProjects'
import ErrorMessage from '../ErrorMessage'
import Plus from '../../svgs/Plus'

const ProjectForm = ({ value, isNewTask, handleProjectSelect }) => {
  const dispatch = useDispatch()
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')

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
        name,
        tasks: [],
      }
      dispatch(addProject(newProject))
      setName('')
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

  const projects = useSelector((state) => state.projects)

  const handleProjectClick = (projectId) => {
    if (isNewTask) {
      handleProjectSelect(projectId)
    } else {
      handleProjectSelect(projectId)
    }
  }

  return (
    <form className='flex flex-col w-full' onSubmit={handleSubmit}>
      <div className='flex'>
        <ProjectInput name={name} onNameChange={handleNameChange} />
        <button
          type={'submit'}
          className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover w-[32px] h-[29px]'>
          <Plus />
        </button>
      </div>

      {projects && projects.length > 0 && (
        <div className='flex flex-col mt-2'>
          <AllProjects
            projects={projects}
            taskProjects={value}
            onAddProject={handleProjectClick}
            onDeleteProject={handleProjectClick}
          />
        </div>
      )}
      <div>{error && <ErrorMessage message={error} />}</div>
    </form>
  )
}

export default ProjectForm
