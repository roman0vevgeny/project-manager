import React, { useRef, useState, useEffect } from 'react'
import Button from '../Button/Button'
import Edit from '../svgs/Edit'
import styles from './SectionName.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateProjectIcon,
  updateProjectName,
} from '../../features/projectSlice'
import { updateSectionName } from '../../features/sectionSlice'
import Case from '../svgs/Case'
import Sort from '../svgs/Sort'
import DropdownModal from '../Modal/DropdownModal'
import SortMenu from '../SortMenu/SortMenu'
import SortItem from '../SortItem/SortItem'
import Information from '../svgs/Information'
import SectionIcon from './SectionIcon/SectionIcon'
import Monitor from '../svgs/Monitor'
import StarProject from '../svgs/StarProject'
import PuzzleProject from '../svgs/PuzzleProject'
import Heart from '../svgs/Heart'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionProjectName = ({ name, projectId, editable, noSvg }) => {
  const [projectName, setProjectName] = useState(name)
  const [warning, setWarning] = useState(false)
  const [onFocus, setOnFocus] = useState(false)
  const [editing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [openIcon, setOpenIcon] = useState(false)
  const [sortType, setSortType] = useState(null)

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )

  // console.log('Project: ', project)
  // console.log('Project icon: ', project.icon)

  const handleChange = (e) => {
    const newValue = inputRef.current.value
    if (newValue.length > 30) {
      setWarning(true)
    } else {
      setWarning(false)
      setProjectName(newValue)
    }
  }

  const handleBlur = () => {
    setOnFocus(false)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newValue = inputRef.current.value
      setProjectName(newValue)
      setEditing(false)
      if (projectName.length <= 30) {
        dispatch(updateProjectName({ name: projectName, id: projectId }))
      }
      setOnFocus(false)
      setEditing(false)
    }
  }

  useEffect(() => {
    setProjectName(project.name)
  }, [project.name])

  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const handleIconChange = (icon) => {
    dispatch(updateProjectIcon({ projectId: project.id, icon: icon }))
    console.log('icon: ', icon)
  }

  const handleSortChange = (type) => {
    setSortType(type)
  }

  const handleToggleModal = () => {
    setOpen((prev) => !prev)
  }

  const handleOpenIcon = () => {
    setOpenIcon(true)
    console.log('opened')
  }

  const handleCloseIcon = () => {
    setOpenIcon(false)
    console.log('closed')
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleClick = () => {
    setEditing(true)
  }

  // const handleFocus = () => {
  //   inputRef.current.focus()
  // }

  // const handleMouseDown = (e) => {
  //   if (!editable) {
  //     e.preventDefault()
  //   }
  //   return
  // }

  // const handleBlur = () => {
  //   if (projectName.length <= 20) {
  //     dispatch(updateProjectName({ name: projectName, id: projectId }))
  //   }
  // }

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     inputRef.current.blur()
  //     if (projectName.length <= 20) {
  //       dispatch(updateProjectName({ name: projectName, id: projectId }))
  //     }
  //   }
  // }

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

  useEffect(() => {
    setProjectName(name)
  }, [name])

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-start items-center mb-[5px]'>
        {!noSvg && (
          <div className='relative flex'>
            <div className={styles.iconBlock} onClick={handleOpenIcon}>
              {getIconFromName(project.icon)}
            </div>
            <DropdownModal
              children={
                <SectionIcon
                  projectIcon={project.icon}
                  onIconChange={handleIconChange}
                  onClose={handleCloseIcon}
                />
              }
              icon={true}
              open={openIcon}
              onClose={handleCloseIcon}
            />
          </div>
        )}
        <div className='flex items-center justify-between w-full'>
          <>
            {!editing ? (
              <div onClick={handleClick} className={styles.bigButton}>
                {projectName}
              </div>
            ) : (
              <input
                className={styles.inputProject}
                placeholder={'Name'}
                value={capitalizeFirstLetter(projectName)}
                ref={inputRef}
                readOnly={!editable}
                tabIndex={!editable ? -1 : undefined}
                // onMouseDown={handleMouseDown}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
            )}
          </>
          <div className='relative flex flex-row flex-nowrap'>
            <div className='flex flex-grow flex-nowrap'>
              {sortType && (
                <SortItem
                  sortType={sortType}
                  onDelete={() => setSortType(null)}
                />
              )}
            </div>

            <Button svgLeft={<Sort />} onClick={handleToggleModal} />

            <div className='relative'>
              <DropdownModal
                children={
                  <SortMenu
                    onSortChange={handleSortChange}
                    onClose={handleCloseModal}
                  />
                }
                open={open}
                onClose={handleCloseModal}
              />
            </div>
            <div className='flex flex-row'>
              {editable && <Button svgLeft={<Information />} />}
            </div>
          </div>
        </div>
        {warning && (
          <div className='flex p-2 mt-2 rounded-md text-redTag bg-redTag text-14 justify-center mb-2'>
            Only 20 characters max
          </div>
        )}
      </div>

      {/* <div className={styles.devider}></div> */}
    </div>
  )
}

export default SectionProjectName
