import React, { useState } from 'react'
import styles from './PriorityBlock.module.scss'
import { useDispatch } from 'react-redux'
import Priority from '../../svgs/Priority'

const PriorityBlock = ({ task, onPriorityChange, onClose }) => {
  const [newTaskPriority, setNewTaskPriority] = useState(null)

  const priorityStatuses = ['Low', 'Medium', 'High']
  const handleChoosePriority = (priorityStatus) => {
    if (task.id) {
      onPriorityChange(priorityStatus)
    } else {
      setNewTaskPriority(priorityStatus)
      onPriorityChange(priorityStatus)
    }
    onClose()
  }

  const getPriorityColor = (priorityStatus) => {
    switch (priorityStatus) {
      case 'Low':
        return 'text-blueTag'
      case 'Medium':
        return 'text-yellowTag'
      case 'High':
        return 'text-redTag'
      default:
        return 'text-gray'
    }
  }

  return (
    <div className='w-[227px]'>
      {priorityStatuses.map((priorityStat) => (
        <div
          key={priorityStat}
          className='flex items-center justify-start m-1 px-2 py-1 rounded-[5px] text-grayHover hover:bg-nav cursor-pointer'
          onClick={() => handleChoosePriority(priorityStat)}>
          <div
            className={
              'flex justify-center items-center w-[20px] h-[20px] mr-1 rounded-[5px]' +
              ' ' +
              getPriorityColor(priorityStat)
            }>
            <Priority />
          </div>
          <div className='flex text-13 leading-0 items-center mt-1 ml-1 pb-[2px]'>
            {priorityStat}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PriorityBlock
