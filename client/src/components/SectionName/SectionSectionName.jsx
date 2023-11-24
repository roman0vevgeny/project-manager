import React, { useRef, useState, useEffect } from 'react'
import styles from './SectionName.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSectionName,
  updateSectionStatus,
} from '../../features/sectionSlice'
import DropdownModal from '../Modal/DropdownModal'
import { getStatusSmallIcon } from '../Status/returnStatusIcons'
import SectionStatusModal from '../Status/SectionStatusModal'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionSectionName = ({ section, editable, noSvg, isDragging }) => {
  // console.log('isDragging: ', isDragging)
  const [sectionName, setSectionName] = useState(section.name)
  // console.log('sectionName: ', sectionName)
  const [sectionStatus, setSectionStatus] = useState(section.status)
  const [warning, setWarning] = useState(false)
  const [onFocus, setOnFocus] = useState(false)
  const [editing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)

  const inputRef = useRef(null)
  const sectionId = section.id
  const dispatch = useDispatch()
  const allStatuses = useSelector((state) => state.statuses)
  const status = allStatuses.find((status) => status.id === sectionStatus)

  const handleChange = (e) => {
    const newValue = inputRef.current.value
    if (newValue.length > 30) {
      setWarning(true)
    } else {
      setWarning(false)
      setSectionName(newValue)
    }
  }

  const handleBlur = () => {
    setOnFocus(false)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newValue = inputRef.current.value
      setSectionName(newValue)
      setEditing(false)
      if (sectionName.length <= 30) {
        dispatch(updateSectionName({ sectionId, name: sectionName }))
      }
      setOnFocus(false)
      setEditing(false)
    }
  }

  useEffect(() => {
    setSectionName(section.name)
    setSectionStatus(section.status)
  }, [section.status, section.name])

  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleStatusChange = (status) => {
    setSectionStatus(status.id)
    dispatch(updateSectionStatus({ sectionId, statusId: status.id }))
  }

  const handleDeleteStatus = () => {
    dispatch(updateSectionStatus({ sectionId, statusId: null }))
    setSectionStatus(null)
  }

  const handleClick = () => {
    setEditing(true)
  }

  return (
    <div
      className={
        isDragging
          ? 'w-full pt-[4px] rounded-t-[10px] bg-menu transition-colors duration-200 ease-in-out'
          : 'w-full pt-[5px] rounded-t-[13px] transition-colors duration-200 ease-in-out'
      }>
      <div className='flex flex-row items-center pb-[5px] rounded-[10px]'>
        {!noSvg && <div className='relative flex'></div>}
        <div className='flex items-center flex-row pt-[1px] '>
          {editable && (
            <div className='relative flex'>
              <div
                className={
                  isDragging
                    ? styles.sectionStatusButton + ' bg-menu text-white'
                    : sectionStatus
                    ? styles.sectionStatusButtonWithStatus
                    : styles.sectionStatusButton
                }
                onClick={handleOpenModal}>
                {status
                  ? getStatusSmallIcon(status.icon)
                  : getStatusSmallIcon('default')}
              </div>
              <DropdownModal
                children={
                  <SectionStatusModal
                    section={section}
                    onStatusChange={handleStatusChange}
                    onDeleteStatus={handleDeleteStatus}
                    onClose={handleCloseModal}
                  />
                }
                grid={true}
                open={open}
                onClose={handleCloseModal}
              />
            </div>
          )}
        </div>
        {!editing ? (
          <>
            <div onClick={handleClick} className={styles.button}>
              {sectionName}
            </div>
            <div
              className={
                isDragging
                  ? 'flex text-12 text-slate-100 leading-1 pt-[1px]'
                  : 'flex text-12 text-gray leading-1 pt-[1px]'
              }>
              {section.tasks.length}
            </div>
          </>
        ) : (
          <input
            className={styles.inputSection}
            placeholder={'Name'}
            value={capitalizeFirstLetter(sectionName)}
            ref={inputRef}
            // readOnly={!editable}
            tabIndex={!editable ? -1 : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        )}
      </div>
      {warning && (
        <div className='flex p-2 mt-2 rounded-md text-redTag bg-redTag text-14 justify-center mb-2'>
          Only 30 characters max
        </div>
      )}
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionSectionName
