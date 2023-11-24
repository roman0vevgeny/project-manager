import React from 'react'
import styles from './SectionStatusModal.module.scss'
import { useSelector } from 'react-redux'
import { getStatusSmallIcon } from './returnStatusIcons'
import StatusMenu from '../svgs/StatusMenu'

const SectionStatusModal = ({
  section,
  onStatusChange,
  onDeleteStatus,
  onClose,
}) => {
  const allStatuses = useSelector((state) => state.statuses)

  const handleChooseStatus = (status) => {
    console.log('status from Modal: ', status)
    onStatusChange(status)
    onClose()
  }

  const handleDelete = () => {
    onDeleteStatus()
    onClose()
  }

  return (
    <div className={styles.statuses}>
      {allStatuses.map((stat) => (
        <div
          key={stat.id}
          className='flex w-full items-center justify-start mx-1 px-2 py-1 rounded-[5px] text-grayHover hover:bg-nav cursor-pointer'
          onClick={() => handleChooseStatus(stat)}>
          <div className='flex justify-center items-center w-[20px] h-[20px] mr-1 rounded-[5px]'>
            {getStatusSmallIcon(stat.icon)}
          </div>
          <div className='flex text-13 leading-0 items-center mt-1 ml-1 pb-[2px]'>
            {stat.name}
          </div>
        </div>
      ))}
      <div
        className='flex w-full items-center justify-start mx-1 px-2 py-1 rounded-[5px] text-grayHover hover:bg-nav cursor-pointer'
        onClick={handleDelete}>
        <div className='flex justify-center items-center w-[20px] h-[20px] mr-1 rounded-[5px]'>
          <StatusMenu />
        </div>
        <div className='flex text-13 leading-0 items-center mt-1 ml-1 pb-[2px]'>
          {'Delete status'}
        </div>
      </div>
    </div>
  )
}

export default SectionStatusModal
