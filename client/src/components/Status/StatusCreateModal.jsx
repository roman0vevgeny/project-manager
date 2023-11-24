import React, { useState, useEffect, useRef } from 'react'
import styles from './StatusModal.module.scss'
import { useDispatch } from 'react-redux'
import DropdownModal from '../Modal/DropdownModal'
import { addStatus } from '../../features/statusSlice'
import StatusIcon from './StatusIcon'
import { getStatusBigIcon } from './returnStatusIcons'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const StatusCreateModal = ({ onClose }) => {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [openIcon, setOpenIcon] = useState(false)
  const [statusName, setStatusName] = useState('')
  const [statusIcon, setStatusIcon] = useState('todo')
  const [warning, setWarning] = useState(false)
  const [emptryWarning, setEmptyWarning] = useState(false)
  const inputRef = useRef(null)
  const dispatch = useDispatch()

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
    if (newValue.length > 25) {
      setWarning(true)
    } else {
      setWarning(false)
    }

    setStatusName(newValue)
  }

  const handleIconChange = (icon) => {
    setStatusIcon(icon)
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
          setStatusName(newValue)
        }
      }
    }
  }

  const handleSave = () => {
    if (statusName === '') {
      setEmptyWarning(true)
    } else {
      dispatch(addStatus({ name: statusName, icon: statusIcon }))
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
                <div className={styles.body}>
                  <div className='flex justify-center items-center rounded-[8px]'>
                    {getStatusBigIcon(statusIcon)}
                  </div>
                </div>
              </div>
              <DropdownModal
                children={
                  <StatusIcon
                    statusIcon={statusIcon}
                    status={statusIcon}
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
                placeholder={'Status name'}
                value={capitalizeFirstLetter(statusName)}
                ref={inputRef}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            {warning && (
              <div>
                <p className='text-14 text-redTag bg-redTag p-1 w-full rounded-[8px]'>
                  Status name must be less than 25 characters
                </p>
              </div>
            )}

            {emptryWarning && (
              <div>
                <p className='text-14 text-redTag bg-redTag p-1 w-full rounded-[8px]'>
                  Status name can not be empty
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
              <div className='grid grid-cols-2 gap-2 text-blueTag mt-1'>
                <p className='flex justify-center text-13 items-center bg-blueTag rounded-[5px] py-[4px]'>
                  On pause
                </p>
                <p className='flex justify-center text-13 items-center bg-blueTag rounded-[5px] py-[4px]'>
                  On hold
                </p>
                <p className='flex justify-center text-13 items-center bg-blueTag rounded-[5px] py-[4px]'>
                  On review
                </p>
                <p className='flex justify-center text-13 items-center bg-blueTag rounded-[5px] py-[4px]'>
                  In translation
                </p>
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <button
                className='text-14 px-4 py-[5px] bg-nav rounded-[8px] text-grayHover font-bold hover:bg-navButtonHover'
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

export default StatusCreateModal
