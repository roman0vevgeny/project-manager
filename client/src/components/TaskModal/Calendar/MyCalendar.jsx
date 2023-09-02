import { useState } from 'react'
import { updateTaskExpirationDate } from '../../../features/tasksSlice'
import './MyCalendar.module.scss'

function MyCalendar({
  value,
  onChange,
  className,
  showNavigation,
  tileClassName,
  prevLabel,
  nextLabel,
  next2Label,
  prev2Label,
  defaultView,
  minDetail,
  locale,
  showWeekNumbers,
  formatDay,
  dispatch,
  task,
}) {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value).getMonth() : new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState(
    value ? new Date(value).getFullYear() : new Date().getFullYear()
  )

  const getDaysArray = (year, month) => {
    let daysArray = []
    for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      daysArray.push(new Date(year, month, i))
    }

    let firstDay = new Date(year, month, 1)
    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1)
      daysArray.unshift(new Date(firstDay))
    }

    let lastDay = new Date(year, month + 1, 0)
    while (lastDay.getDay() !== 0) {
      lastDay.setDate(lastDay.getDate() + 1)
      daysArray.push(new Date(lastDay))
    }
    return daysArray
  }

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        setCurrentMonth(11)
      } else {
        setCurrentMonth((prevMonth) => prevMonth - 1)
      }
    }
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        setCurrentMonth(0)
      } else {
        setCurrentMonth((prevMonth) => prevMonth + 1)
      }
    }
  }

  const handleDateSelect = (date) => {
    let dateString = date.toISOString()
    if (task.id && dispatch) {
      dispatch(
        updateTaskExpirationDate({
          id: task.id,
          expirationDate: dateString,
        })
      )
    } else {
      onChange(dateString)
    }
  }

  const isCurrentDate = (date) => {
    let currentDate = new Date()
    if (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    ) {
      return true
    } else {
      return false
    }
  }

  const isEqualDate = (date1, date2) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='text-12 text-task w-[227px] my-3 p-[10px] border-1 border-stroke rounded-[5px]'>
      {showNavigation && (
        <div className='flex w-full justify-between'>
          <button
            className='flex py-[2px] mb-[5px] w-[25px] h-[25px] rounded-md text-gray justify-center items-center hover:bg-gray'
            onClick={() => handleMonthChange('prev')}>
            {prevLabel}
          </button>
          <span className='text-14 flex py-[2px] mb-[5px] h-[25px] rounded-md text-gray justify-center items-cente'>
            {new Date(currentYear, currentMonth).toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            className='rotate-180 flex py-[2px] mb-[5px] w-[25px] h-[25px] rounded-md text-gray justify-center items-center hover:bg-gray'
            onClick={() => handleMonthChange('next')}>
            {nextLabel}
          </button>
        </div>
      )}
      <div className='grid gap-y-[2px] grid-cols-7 mt-0 justify-items-center'>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((dayName) => (
          <div className='mt-[8px] h-[20px]' key={dayName}>
            {dayName}
          </div>
        ))}
        {getDaysArray(currentYear, currentMonth).map((day, index) => (
          <div
            className={
              'pt-[6px] w-[25px] h-[25px] rounded-full text-center cursor-pointer justify-self-center ' +
              (isEqualDate(new Date(value), day)
                ? 'bg-[var(--calendar-bg-active)] text-[var(--calendar-bg-active-text)] hover:text-[var(--calendar-bg-active-text)] hover:bg-[var(--calendar-bg-active)]'
                : isCurrentDate(day)
                ? 'bg-blueTag text-blueTag hover:text-grayHover hover:bg-gray'
                : day.getMonth() !== currentMonth
                ? 'text-[var(--calendar-disable)] hover:text-grayHover hover:bg-gray'
                : 'text-gray hover:bg-gray hover:text-grayHover')
            }
            key={index}
            onClick={() => handleDateSelect(day)}>
            {formatDay(day)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCalendar
