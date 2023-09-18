import React from 'react'
import styles from './Cell.module.scss'
import { Draggable } from '@hello-pangea/dnd'
import CalItem from '../CalItem/CalItem'
import Plus from '../svgs/Plus'

const getTasksByDate = (date, tasks) => {
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

const Cell = ({
  dateOrEmpty,
  totalCells,
  //   rowIndex,
  cellId,
  month,
  tasks,
  hoveredCellId,
  hoveredCell,
  handleClickCreate,
  areDatesEqual,
  handleSelectTask,
  isDragDisabled,
}) => {
  const isCurrentCellHovered = cellId === hoveredCellId
  const cellHoveredClass = isCurrentCellHovered ? styles.cellHovered : ''
  const cellHiddenClass = isCurrentCellHovered ? '' : styles.cellHidden

  if (!dateOrEmpty) {
    return <div className={styles.cell} key={`empty-${totalCells}`}></div>
  }

  const filteredTasks = getTasksByDate(dateOrEmpty, tasks)
  const isCurrentMonth = dateOrEmpty.getMonth() === month
  const isToday = dateOrEmpty.toDateString() === new Date().toDateString()

  const dateClasses = [
    styles.date,
    isToday ? styles.todayDate : '',
    isCurrentMonth ? styles.currentMonthDate : '',
  ].join(' ')

  const cellClasses = isToday ? `${styles.cell} ${styles.today}` : styles.cell

  return (
    <div
      className={`${cellClasses} ${cellHoveredClass}`}
      key={cellId}
      onMouseEnter={() => setHoveredCellId(cellId)}
      onMouseLeave={() => setHoveredCellId(null)}>
      {isCurrentMonth ? (
        <div className='flex flex-row items-center justify-between'>
          <div className={dateClasses}>{dateOrEmpty.getDate()}</div>
          {areDatesEqual(hoveredCell, dateOrEmpty) && isCurrentCellHovered && (
            <div
              className={`flex h-[20px] w-[20px] rounded-[5px] text-gray bg-gray hover:bg-grayHover hover:text-grayHover justify-center items-center mr-1 cursor-pointer ${cellHiddenClass}`}
              onClick={() => handleClickCreate(dateOrEmpty)}>
              <Plus />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.date}></div>
      )}
      // Используйте filteredTasks для рендеринга списка задач
      <div className={styles.tasks}>
        {filteredTasks.map((task, index) => (
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
      </div>
    </div>
  )
}

export default Cell
