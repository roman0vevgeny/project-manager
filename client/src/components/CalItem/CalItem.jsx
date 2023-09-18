import React from 'react'
import TaskName from '../TaskName/TaskName'
import CheckBox from '../CheckBox/CheckBox'
import styles from './CalItem.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskChecked } from '../../features/tasksSlice'
import { selectTaskById } from '../../helpers/selectTaskById'

const CalItem = ({ taskId, onClick, isDragging }) => {
  const task = useSelector((state) => selectTaskById(state, taskId))
  const dispatch = useDispatch()
  const checked = task.checked

  const toggleChecked = (e) => {
    e.stopPropagation()
    dispatch(updateTaskChecked(taskId))
  }

  return (
    <>
      {task && (
        <div className='relative w-full cursor-auto py-[2px] truncate'>
          <div
            className={isDragging ? styles.dragging : styles.body}
            onClick={onClick}>
            <button className={styles.checkbox} onClick={toggleChecked}>
              <CheckBox checked={checked} toggleChecked={toggleChecked} />
            </button>
            <div className={styles.clickable}>
              <div className='flex flex-raw justify-between items-start w-full truncate'>
                <div>
                  <TaskName
                    name={task.name}
                    checked={task.checked}
                    calendar={true}
                  />
                </div>
              </div>
            </div>
            <div className='absolute top-0 right-0 w-[20px] bg-gradient-to-l from-mainBg via-mainBg via-30% h-[31px] z-[10] rounded-r-[9px]'></div>
          </div>
          <div
            className={isDragging ? styles.deviderDrag : styles.devider}></div>
        </div>
      )}
    </>
  )
}

export default CalItem
