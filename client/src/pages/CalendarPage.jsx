// import React, { useState } from 'react'
// import styles from './CalendarPage.module.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// import {
//   todayTasksSelector,
//   expiredTasksSelector,
// } from '../features/taskMemoSelectors'
// import { updateTaskExpirationDate } from '../features/tasksSlice'
// import CalItem from '../components/CalItem/CalItem'
// import ArrowLeft from '../components/svgs/ArrowLeft'
// import Modal from '../components/Modal/Modal'
// import EditTaskModal from '../components/TaskModal/EditTaskModal'
// import CreateTaskModal from '../components/TaskModal/CreateTaskModal'
// import SectionName from '../components/SectionName/SectionName'
// import Plus from '../components/svgs/Plus'

// const CalendarPage = () => {
//   const [month, setMonth] = useState(new Date().getMonth())
//   const [year, setYear] = useState(new Date().getFullYear())
//   const [open, setOpen] = useState(false)
//   const [selectedTaskId, setSelectedTaskId] = useState(null)
//   const [hoveredCell, setHoveredCell] = useState(null)
//   const [createTaskDate, setCreateTaskDate] = useState(null)

//   let location = useLocation()

//   const dispatch = useDispatch()

//   const getTasksByPath = (path) => {
//     switch (path) {
//       case '/home/calendar':
//         return useSelector((state) => state.tasks.tasks)
//       case '/today/calendar':
//         return useSelector(todayTasksSelector)
//       case '/expiredcalendar':
//         return useSelector(expiredTasksSelector)
//       default:
//         return []
//     }
//   }

//   const tasks = getTasksByPath(location.pathname)

//   const handleSelectTask = (taskId) => {
//     setSelectedTaskId(taskId)
//   }

//   //   const handleMouseEnter = (date) => {
//   //     setHoveredCell(date)
//   //   }

//   //   const handleMouseLeave = () => {
//   //     setHoveredCell(null)
//   //   }

//   const renderSectionName = (path) => {
//     switch (path) {
//       case '/home/calendar':
//         return <SectionName name={'Tasks'} />
//       case '/today/calendar':
//         return <SectionName name={'Today'} />
//       case '/expired/calendar':
//         return <SectionName name={'Expired'} />
//       default:
//         return null
//     }
//   }

//   const handleOpenModal = () => {
//     setOpen(true)
//   }

//   const handleCloseModal = () => {
//     setOpen(false)
//   }

//   const handlePrevMonth = () => {
//     if (month === 0) {
//       setMonth(11)
//       setYear((prev) => prev - 1)
//     } else {
//       setMonth((prev) => prev - 1)
//     }
//   }

//   const handleNextMonth = () => {
//     if (month === 11) {
//       setMonth(0)
//       setYear((prev) => prev + 1)
//     } else {
//       setMonth((prev) => prev + 1)
//     }
//   }

//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ]

//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate()
//   }

//   const getFirstDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay()
//   }

//   const getTasksByDate = (date) => {
//     return tasks.filter((task) => {
//       if (task.expirationDate) {
//         const taskDate = new Date(task.expirationDate)
//         return (
//           taskDate.getFullYear() === date.getFullYear() &&
//           taskDate.getMonth() === date.getMonth() &&
//           taskDate.getDate() === date.getDate()
//         )
//       } else {
//         return false
//       }
//     })
//   }

//   const handleClickCreate = (date) => {
//     setCreateTaskDate(date.toISOString())
//     handleOpenModal()
//   }

//   const areDatesEqual = (date1, date2) => {
//     if (!date1 || !date2) return false
//     return (
//       date1.getFullYear() === date2.getFullYear() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getDate() === date2.getDate()
//     )
//   }

//   const isDragDisabled = () => {
//     if (location.pathname === '/home/calendar') {
//       return false
//     } else {
//       return true
//     }
//   }

//   const onDragEnd = (result, dateOrEmpty) => {
//     const { source, destination } = result
//     if (!destination) {
//       return
//     }

//     const taskId = parseInt(result.draggableId)
//     const taskToUpdate = tasks.find((task) => task.id === taskId)
//     const cellId = destination.droppableId
//     console.log('cellId:', cellId)
//     const cellParts = cellId.split('-')
//     const cellNumbers = cellParts.filter((part) => !isNaN(part))
//     const [row, cell] = cellNumbers.map(Number)
//     console.log('row:', row)
//     console.log('cell:', cell)

//     tasks.forEach((task, index) => {
//       console.log(`Task ${task.id} is at index ${index}`)
//     })

//     const firstDay = getFirstDayOfMonth(month, year)
//     const daysInMonth = getDaysInMonth(month, year)
//     const cellDate = new Date(year, month, row * 7 + cell - firstDay + 1)
//     if (
//       cellDate instanceof Date &&
//       !isNaN(cellDate) &&
//       cellDate.getMonth() === month
//     ) {
//       const newExpirationDate = cellDate.toISOString()
//       dispatch(
//         updateTaskExpirationDate({
//           id: taskId,
//           expirationDate: newExpirationDate,
//         })
//       )
//     } else {
//       console.error('Invalid date')
//     }
//   }

//   const renderCell = (dateOrEmpty, totalCells, rowIndex, cellId) => {
//     if (!dateOrEmpty) {
//       return <div className={styles.cell} key={`empty-${totalCells}`}></div>
//     }
//     const tasks = getTasksByDate(dateOrEmpty)
//     const isCurrentMonth = dateOrEmpty.getMonth() === month
//     const isToday = dateOrEmpty.toDateString() === new Date().toDateString()

//     const dateClasses = [
//       styles.date,
//       isToday ? styles.todayDate : '',
//       isCurrentMonth ? styles.currentMonthDate : '',
//     ].join(' ')

//     const cellClasses = isToday ? `${styles.cell} ${styles.today}` : styles.cell

//     return (
//       <div
//         className={cellClasses}
//         key={cellId}
//         // onMouseEnter={() => handleMouseEnter(dateOrEmpty)}
//         // onMouseLeave={handleMouseLeave}
//       >
//         {isCurrentMonth ? (
//           <div className='flex flex-row items-center justify-between'>
//             <div className={dateClasses}>{dateOrEmpty.getDate()}</div>
//             {/* {areDatesEqual(hoveredCell, dateOrEmpty) && (
//               <div
//                 className='flex h-[20px] w-[20px] rounded-[5px] text-gray bg-gray hover:bg-grayHover hover:text-grayHover justify-center items-center mr-1 cursor-pointer'
//                 onClick={() => handleClickCreate(dateOrEmpty)}>
//                 <Plus />
//               </div>
//             )} */}
//           </div>
//         ) : (
//           <div className={styles.date}></div>
//         )}
//         <div className={styles.tasks}>
//           {tasks.map((task, index) => (
//             <Draggable
//               draggableId={task.id.toString()}
//               isDragDisabled={isDragDisabled()}
//               index={index}>
//               {(provided, snapshot) => (
//                 <div
//                   className={styles.task}
//                   key={task.id}
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}>
//                   <CalItem
//                     taskId={task.id}
//                     onSelectTask={handleSelectTask}
//                     onClick={() => handleSelectTask(task.id)}
//                   />
//                 </div>
//               )}
//             </Draggable>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(month, year)
//     const firstDay = getFirstDayOfMonth(month, year)
//     const rows = []

//     let start = 1 - firstDay
//     let end = 7 - firstDay
//     let totalCells = 0
//     while (totalCells < 35) {
//       const cells = []
//       for (let i = 0; i < 7; i++) {
//         const isCurrentMonth = start >= 1 && start <= daysInMonth
//         cells.push(
//           renderCell(
//             isCurrentMonth ? new Date(year, month, start) : false,
//             totalCells,
//             `${Math.floor(totalCells / 7)}`
//             // `row-${Math.floor(totalCells / 7)}-cell-${i}`
//           )
//         )
//         start++
//         totalCells++
//       }
//       rows.push(cells)
//     }

//     return (
//       <div className={styles.calendar}>
//         <DragDropContext onDragEnd={onDragEnd}>
//           {rows.map((row, rowIndex) => (
//             <div className={styles.row} key={`row-${rowIndex}`}>
//               {row.map((cell, cellIndex) => (
//                 <div key={`cell-${cellIndex}`}>
//                   <Droppable droppableId={`row-${rowIndex}-cell-${cellIndex}`}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         className='h-full'>
//                         {cell}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </DragDropContext>
//         <Modal
//           open={selectedTaskId !== null}
//           onClose={() => handleSelectTask(null)}
//           children={
//             <EditTaskModal
//               task={tasks.find((task) => task.id === selectedTaskId)}
//               onClose={() => handleSelectTask(null)}
//             />
//           }
//         />
//         <Modal
//           open={open}
//           onClose={handleCloseModal}
//           children={
//             <CreateTaskModal onClose={handleCloseModal} date={createTaskDate} />
//           }
//         />
//       </div>
//     )
//   }

//   return (
//     <div className={styles.main}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className='w-full'>{renderSectionName(location.pathname)}</div>

//           <div className={styles.headerWrapper}>
//             <button className={styles.button} onClick={handlePrevMonth}>
//               <ArrowLeft />
//             </button>
//             <div className={styles.month}>{months[month]}</div>
//             <button className={styles.buttonFlip} onClick={handleNextMonth}>
//               <ArrowLeft />
//             </button>
//           </div>
//         </div>
//         <div className={styles.days}>
//           {days.map((day) => (
//             <div className={styles.day} key={day}>
//               {day}
//             </div>
//           ))}
//         </div>
//         {renderCalendar()}
//       </div>
//     </div>
//   )
// }

// export default CalendarPage

import React, { useState } from 'react'
import styles from './CalendarPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  todayTasksSelector,
  expiredTasksSelector,
} from '../features/taskMemoSelectors'
import { updateTaskExpirationDate } from '../features/tasksSlice'
import CalItem from '../components/CalItem/CalItem'
import ArrowLeft from '../components/svgs/ArrowLeft'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import CreateTaskModal from '../components/TaskModal/CreateTaskModal'
import SectionName from '../components/SectionName/SectionName'
import Plus from '../components/svgs/Plus'

const CalendarPage = () => {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [hoveredCell, setHoveredCell] = useState(null)
  const [createTaskDate, setCreateTaskDate] = useState(null)

  let location = useLocation()

  const dispatch = useDispatch()

  const getTasksByPath = (path) => {
    switch (path) {
      case '/home/calendar':
        return useSelector((state) => state.tasks.tasks)
      case '/today/calendar':
        return useSelector(todayTasksSelector)
      case '/expiredcalendar':
        return useSelector(expiredTasksSelector)
      default:
        return []
    }
  }

  const tasks = getTasksByPath(location.pathname)

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId)
  }

  const renderSectionName = (path) => {
    switch (path) {
      case '/home/calendar':
        return <SectionName name={'Tasks'} />
      case '/today/calendar':
        return <SectionName name={'Today'} />
      case '/expired/calendar':
        return <SectionName name={'Expired'} />
      default:
        return null
    }
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear((prev) => prev + 1)
    } else {
      setMonth((prev) => prev + 1)
    }
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const getTasksByDate = (date) => {
    return tasks.filter((task) => {
      if (task.expirationDate) {
        const taskDate = new Date(task.expirationDate)
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        )
      } else {
        return false
      }
    })
  }

  const handleClickCreate = (date) => {
    setCreateTaskDate(date.toISOString())
    handleOpenModal()
  }

  const areDatesEqual = (date1, date2) => {
    if (!date1 || !date2) return false
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isDragDisabled = () => {
    if (location.pathname === '/home/calendar') {
      return false
    } else {
      return true
    }
  }

  const onDragEnd = (result, dateOrEmpty) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const taskId = parseInt(result.draggableId)
    const taskToUpdate = tasks.find((task) => task.id === taskId)
    const cellId = destination.droppableId

    const cellParts = cellId.split('-')
    const cellNumbers = cellParts.filter((part) => !isNaN(part))
    const [row, cell] = cellNumbers.map(Number)

    console.log('Drag result:', result)
    console.log('Task ID:', taskId)
    console.log('Task to update:', taskToUpdate)
    console.log('Destination cell ID:', cellId)
    console.log('Row:', row)
    console.log('Cell:', cell)

    if (month < 0 || month > 11) {
      console.error('Invalid month:', month)
      return
    }

    const firstDay = getFirstDayOfMonth(month, year)
    const daysInMonth = getDaysInMonth(month, year)

    console.log('Month:', month)
    console.log('Year:', year)
    console.log('First day of month:', firstDay)
    console.log('Days in month:', daysInMonth)

    const cellDate = new Date(year, month, row * 7 + cell - firstDay + 1)

    console.log('Cell date:', cellDate)

    if (
      cellDate instanceof Date &&
      !isNaN(cellDate) &&
      cellDate.getMonth() === month
    ) {
      const newExpirationDate = cellDate.toISOString()
      dispatch(
        updateTaskExpirationDate({
          id: taskId,
          expirationDate: newExpirationDate,
        })
      )
      console.log('Updated expiration date:', newExpirationDate)
    } else {
      console.error('Invalid date:', cellDate, 'Month:', month)
    }
  }

  const renderCell = (dateOrEmpty, rowIndex, cellIndex) => {
    if (!dateOrEmpty) {
      return (
        <div
          className={styles.cell}
          key={`empty-${rowIndex}-${cellIndex}`}></div>
      )
    }
    const isCurrentMonth = dateOrEmpty.getMonth() === month
    const isToday = dateOrEmpty.toDateString() === new Date().toDateString()

    const dateClasses = [
      styles.date,
      isToday ? styles.todayDate : '',
      isCurrentMonth ? styles.currentMonthDate : '',
    ].join(' ')

    const cellClasses = isToday ? `${styles.cell} ${styles.today}` : styles.cell

    const tasksInCell = getTasksByDate(dateOrEmpty)

    // Добавим логи для отслеживания значений row и cell
    console.log('Row:', rowIndex)
    console.log('Cell:', cellIndex)
    console.log('Date:', dateOrEmpty)

    return (
      <div className={cellClasses} key={`cell-${rowIndex}-${cellIndex}`}>
        {isCurrentMonth ? (
          <div className='flex flex-row items-center justify-between'>
            <div className={dateClasses}>{dateOrEmpty.getDate()}</div>
            {tasksInCell.length > 0 && (
              <div
                className='flex h-[20px] w-[20px] rounded-[5px] text-gray bg-gray hover:bg-grayHover hover:text-grayHover justify-center items-center mr-1 cursor-pointer'
                onClick={() => handleClickCreate(dateOrEmpty)}>
                <Plus />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.date}></div>
        )}
        <div className={styles.tasks}>
          <Droppable droppableId={dateOrEmpty.toISOString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='h-full'>
                {tasksInCell.map((task, index) => (
                  <Draggable
                    draggableId={task.id.toString()}
                    isDragDisabled={isDragDisabled()}
                    index={index}
                    key={task.id}>
                    {(provided, snapshot) => (
                      <div
                        className={styles.task}
                        key={task.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <CalItem
                          taskId={task.id}
                          onSelectTask={handleSelectTask}
                          onClick={() => handleSelectTask(task.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    )
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year)
    const rows = []

    let start = 1 - firstDay
    let end = 7 - firstDay
    let totalCells = 0
    while (totalCells < 35) {
      const cells = []
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = start >= 1 && start <= daysInMonth
        cells.push(
          renderCell(
            isCurrentMonth ? new Date(year, month, start) : false,
            totalCells,
            Math.floor(totalCells / 7),
            i
          )
        )
        start++
        totalCells++
      }
      rows.push(cells)
    }

    return (
      <div className={styles.calendar}>
        <DragDropContext onDragEnd={onDragEnd}>
          {rows.map((row, rowIndex) => (
            <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <div key={`cell-${cellIndex}`}>{cell}</div>
              ))}
            </div>
          ))}
        </DragDropContext>
        <Modal
          open={selectedTaskId !== null}
          onClose={() => handleSelectTask(null)}
          children={
            <EditTaskModal
              task={tasks.find((task) => task.id === selectedTaskId)}
              onClose={() => handleSelectTask(null)}
            />
          }
        />
        <Modal
          open={open}
          onClose={handleCloseModal}
          children={
            <CreateTaskModal onClose={handleCloseModal} date={createTaskDate} />
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className='w-full'>{renderSectionName(location.pathname)}</div>
          <div className={styles.headerWrapper}>
            <button className={styles.button} onClick={handlePrevMonth}>
              <ArrowLeft />
            </button>
            <div className={styles.month}>{months[month]}</div>
            <button className={styles.buttonFlip} onClick={handleNextMonth}>
              <ArrowLeft />
            </button>
          </div>
        </div>
        <div className={styles.days}>
          {days.map((day) => (
            <div className={styles.day} key={day}>
              {day}
            </div>
          ))}
        </div>
        {renderCalendar()}
      </div>
    </div>
  )
}

export default CalendarPage
