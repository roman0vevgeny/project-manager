import React, { useRef, useState, useEffect } from 'react'
import styles from './SectionName.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addSection } from '../../features/sectionSlice'
import DropdownModal from '../Modal/DropdownModal'
import { getStatusSmallIcon } from '../Status/returnStatusIcons'
import SectionStatusModal from '../Status/SectionStatusModal'
import { updateProjectSections } from '../../features/projectSlice'
import { v4 as uuid } from 'uuid'
import Close from '../svgs/Close'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionInputName = ({
  project,
  sectionId,
  showAddSectionInput,
  hoveredSection,
  isDragging,
}) => {
  const [sectionName, setSectionName] = useState(null)
  const [warning, setWarning] = useState(false)
  const [onFocus, setOnFocus] = useState(true)
  const [editing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)

  console.log('project from section input name: ', project)

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const newValue = inputRef.current.value
    if (newValue.length > 30) {
      setWarning(true)
    } else {
      setWarning(false)
      setSectionName(newValue)
    }
  }

  const handleAddNewSectionAfterSectionId = () => {
    console.log('sectionId: ', sectionId)
    const newSection = { name: sectionName, id: uuid() }

    console.log('newSection bofore creation: ', newSection)
    dispatch(
      addSection({ name: newSection.name, id: newSection.id, tasks: [] })
    )
    const index = project.sections.findIndex((s) => s === sectionId)
    const newSections = [
      ...project.sections.slice(0, index + 1),
      newSection.id,
      ...project.sections.slice(index + 1),
    ]
    dispatch(
      updateProjectSections({
        projectId: project.id,
        sections: newSections,
      })
    )
  }

  const handleBlur = () => {
    setOnFocus(false)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newValue = inputRef.current.value

      setEditing(false)
      if (newValue.length <= 30) {
        setSectionName(newValue)
      }
      setOnFocus(false)
      setEditing(false)
      if (sectionName !== '' && sectionName !== null) {
        handleAddNewSectionAfterSectionId()
      }
      showAddSectionInput()
      hoveredSection()
    }
  }

  const handleClose = () => {
    showAddSectionInput()
    hoveredSection()
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  //   const handleOpenModal = () => {
  //     setOpen(true)
  //   }

  //   const handleClick = () => {
  //     setEditing(true)
  //   }

  const handleFocus = () => {
    inputRef.current.focus()
    // setOnFocus(true)
  }

  useEffect(() => {
    if (showAddSectionInput && inputRef.current) {
      inputRef.current.focus()
      setEditing(true)
      setOnFocus(true)
    }
  }, [showAddSectionInput])

  return (
    <div
      className={
        isDragging
          ? 'w-full pt-[4px] rounded-t-[10px] bg-menu transition-colors duration-200 ease-in-out'
          : 'w-full pt-[5px] rounded-t-[10px] transition-colors duration-200 ease-in-out'
      }>
      <div className='flex flex-row items-center pb-[5px] rounded-[15px]'>
        <div className='flex items-center flex-row pt-[1px] '></div>

        <input
          className={styles.inputNewSection}
          placeholder={'Section name'}
          value={sectionName ? capitalizeFirstLetter(sectionName) : ''}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <div
          className='flex items-center justify-center ml-2 p-[7px] text-gray hover:text-grayHover hover:bg-gray rounded-[8px]'
          onClick={handleClose}>
          <Close />
        </div>
      </div>
      {warning && (
        <div className='flex px-1 py-[3px] rounded-[8px] text-redTag bg-redTag text-14 justify-center mb-1'>
          Only 30 characters max
        </div>
      )}
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionInputName
