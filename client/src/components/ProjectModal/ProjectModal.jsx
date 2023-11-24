import React, { useState, useEffect, useRef } from 'react'
import styles from './ProjectModal.module.scss'
import { useDispatch } from 'react-redux'
import DropdownModal from '../Modal/DropdownModal'
import Case from '../svgs/Case'
import PuzzleProject from '../svgs/PuzzleProject'
import Monitor from '../svgs/Monitor'
import StarProject from '../svgs/StarProject'
import Heart from '../svgs/Heart'
import { addProject } from '../../features/projectSlice'
import ProjectIcon from './ProjectIcon'
import { v4 as uuid } from 'uuid'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const ProjectModal = ({ onClose }) => {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [openIcon, setOpenIcon] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectIcon, setProjectIcon] = useState('case')
  const [warning, setWarning] = useState(false)
  const [emptryWarning, setEmptyWarning] = useState(false)
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const icons = [
    { name: 'case' },
    { name: 'puzzle' },
    { name: 'monitor' },
    { name: 'star' },
    { name: 'heart' },
  ]

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  //   const handleEscapePress = (e) => {
  //     if (e.key === 'Escape') {
  //       e.preventDefault()
  //       handleCloseModal()
  //     }
  //   }

  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue.length > 20) {
      setWarning(true)
    } else {
      setWarning(false)
    }

    setProjectName(newValue)
  }

  const handleIconChange = (icon) => {
    setProjectIcon(icon)
  }

  const handleOpenIcon = () => {
    setOpenIcon(true)
    console.log('opened')
    handleOpenModal()
  }

  const handleCloseIcon = () => {
    setOpenIcon(false)
    console.log('closed')
  }

  const handleFocus = () => {
    inputRef.current.focus()
    setFocus(true)
  }

  const handleBlur = () => {
    inputRef.current.blur()
    setFocus(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
      setFocus(false)
      if (!warning) {
        const newValue = e.target.value
        if (newValue !== '') {
          setProjectName(newValue)
        }
      }
    }
  }

  const getIconFromName = (name) => {
    switch (name) {
      case 'case':
        return <Case />
      case 'puzzle':
        return <PuzzleProject />
      case 'monitor':
        return <Monitor />
      case 'star':
        return <StarProject />
      case 'heart':
        return <Heart />
      default:
        return <Case />
    }
  }

  const handleSave = () => {
    if (projectName === '') {
      setEmptyWarning(true)
    } else {
      const newProject = {
        name: projectName,
        icon: projectIcon,
        id: uuid(),
        sections: [111, 222],
      }
      dispatch(addProject(newProject))
      handleCloseModal()
      onClose()
    }
  }

  return (
    <div
      onClose={onClose}
      className='flex flex-col bg-mainBg mx-8 mb-8 cursor-default'>
      <div className='relative flex flex-row w-full h-full mt-6'>
        <div className='flex flex-col justify-between h-full flex-grow'>
          <div className='m-2 flex flex-col space-y-4'>
            <div className='relative mr-1 flex space-x-2 w-full'>
              <div
                className='flex py-[2px] hover:bg-gray rounded-[8px] cursor-pointer'
                onClick={handleOpenIcon}>
                <div className='flex justify-center items-center w-[46px] text-task hover:text-grayHover'>
                  <div className='flex justify-center items-center rounded-[8px]'>
                    {getIconFromName(projectIcon)}
                  </div>
                </div>
              </div>
              <DropdownModal
                children={
                  <ProjectIcon
                    projectIcon={projectIcon}
                    // project={statusIcon}
                    onIconChange={handleIconChange}
                    onClose={handleCloseIcon}
                  />
                }
                grid={true}
                open={openIcon}
                onClose={handleCloseIcon}
              />
              <input
                className={styles.input}
                placeholder={'Project name'}
                value={capitalizeFirstLetter(projectName)}
                ref={inputRef}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            {warning && (
              <div>
                <p className='text-14 text-redTag bg-redTag p-1 w-full rounded-[5px]'>
                  Project name must be less than 20 characters
                </p>
              </div>
            )}

            {emptryWarning && (
              <div>
                <p className='text-14 text-redTag bg-redTag p-1 w-full rounded-[5px]'>
                  Project name can not be empty
                </p>
              </div>
            )}

            <div className='ml-3 flex flex-col justify-start'>
              <p className='text-14 text-task w-[300px] text-start'>
                Fill the input and choose icon.
              </p>
              <p className='text-14 text-gray w-[300px] text-start'>
                Here are some ideas for status name:
              </p>
            </div>
            <div className='w-full flex justify-end'>
              <button
                className='text-14 px-4 py-[5px] bg-nav rounded-[5px] text-grayHover font-bold hover:bg-navButtonHover'
                onClick={handleSave}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
