// import React from 'react'
// import Calendar from 'react-calendar'
// import Arrow from '../../svgs/Arrow'
// import { updateTaskExpirationDate } from '../../../features/tasksSlice'
// import { formatDate } from '../../../helpers/formatDate'

// const Calend = ({ expirationDate, dispatch, task, onChange, checked }) => {
//   const expirationDateObject = expirationDate ? new Date(expirationDate) : null

//   const handleDateChange = (value) => {
//     const newExpirationDate = value.toISOString()
//     if (task.id && dispatch) {
//       dispatch(
//         updateTaskExpirationDate({
//           id: task.id,
//           expirationDate: newExpirationDate,
//         })
//       )
//     } else {
//       // setTask({
//       //   ...task,
//       //   expirationDate: newExpirationDate,
//       // })
//       onChange(newExpirationDate)
//     }
//   }

//   return (
//     <div className='flex mt-8'>
//       <Calendar
//         className={
//           !checked
//             ? 'react-calendar' && 'text-task'
//             : 'react-calendar' && 'text-gray'
//         }
//         value={expirationDateObject}
//         onChange={!checked ? handleDateChange : null}
//         showNavigation={true}
//         tileClassName='react-calendar__tile'
//         prevLabel={<Arrow />}
//         nextLabel={<Arrow />}
//         next2Label={null}
//         prev2Label={null}
//         defaultView='month'
//         minDetail='month'
//         locale='us-US'
//         showWeekNumbers={false}
//         formatDay={formatDate}
//       />
//     </div>
//   )
// }

// export default Calend

import React from 'react'
import MyCalendar from './MyCalendar'
import Arrow from '../../svgs/Arrow'
import { updateTaskExpirationDate } from '../../../features/tasksSlice'
import { formatDate } from '../../../helpers/formatDate'
import ArrowLeft from '../../svgs/ArrowLeft'

const Calend = ({ expirationDate, dispatch, task, onChange, checked }) => {
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
      // setTask({
      //   ...task,
      //   expirationDate: newExpirationDate,
      // })
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
      />
    </div>
  )
}

export default Calend
