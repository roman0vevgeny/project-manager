import React, { useState, useEffect, useRef } from 'react'
import styles from './StatusModal.module.scss'
import { useDispatch } from 'react-redux'
import DropdownModal from '../Modal/DropdownModal'
import { updateStatusIcon, updateStatusName } from '../../features/statusSlice'
import StatusIcon from './StatusIcon'
import { getStatusBigIcon } from './returnStatusIcons'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const StatusModal = ({ onClose, status }) => {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [openIcon, setOpenIcon] = useState(false)
  const [statusName, setStatusName] = useState(status.name)
  const [warning, setWarning] = useState(false)
  const inputRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!status) {
      onClose()
    }
  }, [status, onClose])

  const { id, name, icon } = status || {}

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
    setStatusName(newValue)
    if (newValue.length > 25) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }

  const handleIconChange = (icon) => {
    dispatch(updateStatusIcon({ id, icon }))
    console.log('icon: ', icon)
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
        dispatch(updateStatusName({ name: statusName, id }))
      }
    }
  }

  useEffect(() => {
    setStatusName(name)
  }, [name])

  return (
    <>
      {status && (
        <div
          onClose={onClose}
          className='flex flex-col bg-mainBg mx-8 mb-8 cursor-default'>
          <div className='relative flex flex-row w-full h-full mt-6'>
            <div className='flex flex-col justify-between h-full flex-grow'>
              <div className='m-2 flex flex-col space-y-4'>
                <div className='relative mr-1 flex space-x-2 w-full'>
                  <div
                    className='flex py-[2px] hover:bg-gray rounded-[8px] cursor-pointer'
                    onClick={
                      status.name === 'To-do' ||
                      status.name === 'Done' ||
                      status.name === 'In progress'
                        ? null
                        : handleOpenIcon
                    }>
                    <div className={styles.body}>
                      <div className='flex justify-center items-center rounded-[8px]'>
                        {getStatusBigIcon(status.icon)}
                      </div>
                    </div>
                  </div>
                  <DropdownModal
                    children={
                      <StatusIcon
                        statusIcon={icon}
                        status={status}
                        onIconChange={handleIconChange}
                        onClose={handleCloseIcon}
                      />
                    }
                    grid={true}
                    open={openIcon}
                    onClose={handleCloseIcon}
                  />
                  {status.name === 'To-do' ||
                  status.name === 'Done' ||
                  status.name === 'In progress' ? (
                    <p className={styles.name}>{status.name}</p>
                  ) : (
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
                  )}
                </div>
                {warning && (
                  <div>
                    <p className='text-14 text-redTag bg-redTag p-1 w-full rounded-[8px]'>
                      Status name must be less than 25 characters
                    </p>
                  </div>
                )}
                {status.name === 'To-do' ||
                status.name === 'Done' ||
                status.name === 'In progress' ? (
                  <div className='ml-3 flex flex-col justify-start'>
                    <p className='text-14 text-task w-[300px] text-start'>
                      You can not customize this default status.
                    </p>
                    <p className='text-14 text-gray w-[300px] text-start pt-2'>
                      But you can create a new one. Just click the{' '}
                      <span className='text-blueTag'>Add status</span> button at
                      Sidebar
                    </p>
                  </div>
                ) : (
                  <div className='ml-3 flex flex-col justify-start'>
                    <p className='text-14 text-task w-[300px] text-start'>
                      This is where you can customize your status.
                    </p>
                    <p className='text-14 text-gray w-[300px] text-start pt-2'>
                      Click on the checkbox to change the status icon. Or click
                      on the status name to change the title.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StatusModal
