import React from 'react'
import CheckBox from '../CheckBox/CheckBox'
import styles from './TaskSubtasks.module.scss'
import TaskSubtask from './TaskSubtask/TaskSubtask'

const TaskSubtasks = ({ onSubtasksChange, subtasks, checked }) => {
  const handleSubtaskCheckedChange = (subtaskId, checked) => {
    onSubtasksChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, checked: checked } : subtask
      )
    )
  }

  return (
    <div className='mb-2 mt-1'>
      {subtasks &&
        subtasks.map((subtask) => (
          <div key={subtask.id} className='flex items-start mr-2 mb-1'>
            <button
              className={styles.checkbox}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleSubtaskCheckedChange(subtask.id, !subtask.checked)
              }}>
              <CheckBox
                checked={subtask.checked}
                toggleChecked={() => {
                  handleSubtaskCheckedChange(subtask.id, !subtask.checked)
                }}
              />
            </button>
            <TaskSubtask
              subtask={subtask}
              checked={subtask.checked}
              taskChecked={checked}
            />
          </div>
        ))}
    </div>
  )
}

export default TaskSubtasks
