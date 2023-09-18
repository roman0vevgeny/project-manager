import React from 'react'
import MyCalendar from './MyCalendar'
import { updateTaskExpirationDate } from '../../../features/tasksSlice'
import { formatDate } from '../../../helpers/formatDate'
import ArrowLeft from '../../svgs/ArrowLeft'

const Calend = ({
  expirationDate,
  dispatch,
  task,
  onChange,
  checked,
  onClose,
}) => {
  const expirationDateObject = expirationDate ? new Date(expirationDate) : null

  const handleDateChange = (value) => {
    const newExpirationDate = value
    if (task.id && dispatch) {
      dispatch(
        updateTaskExpirationDate({
          id: task.id,
          expirationDate: newExpirationDate,
        })
      )
    } else {
      onChange(newExpirationDate)
    }
  }

  return (
    <div className='flex'>
      <MyCalendar
        className={
          !checked
            ? 'react-calendar' && 'text-task'
            : 'react-calendar' && 'text-gray'
        }
        value={expirationDateObject}
        onChange={!checked ? handleDateChange : null}
        showNavigation={true}
        tileClassName='react-calendar__tile'
        prevLabel={<ArrowLeft />}
        nextLabel={<ArrowLeft />}
        next2Label={null}
        prev2Label={null}
        defaultView='month'
        minDetail='month'
        locale='us-US'
        showWeekNumbers={false}
        formatDay={formatDate}
        dispatch={dispatch}
        task={task}
        onClose={onClose}
      />
    </div>
  )
}

export default Calend
