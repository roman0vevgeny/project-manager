import React, { useState, useRef } from 'react'
import CheckBox from '../../CheckBox/CheckBox'
import Subtask from './Subtask/Subtask'
import SubtaskInput from './SubtaskInput/SubtaskInput'
import styles from './SubtaskBlock.module.scss'

const SubtaskBlock = ({ subtasks, onSubtasksChange, checked }) => {
  const [subtaskInput, setSubtaskInput] = useState('')
  const inputRef = useRef(null)

  const handleAddSubtask = (subtask) => {
    onSubtasksChange([...subtasks, subtask])
  }

  const handleDeleteSubtask = (subtaskId) => {
    onSubtasksChange(subtasks.filter((subtask) => subtask.id !== subtaskId))
  }

  const handleSubtaskCheckedChange = (subtaskId, checked) => {
    onSubtasksChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, checked: checked } : subtask
      )
    )
  }

  const handleSubtaskNameChange = (subtaskId, subtaskName) => {
    onSubtasksChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, name: subtaskName } : subtask
      )
    )
  }

  const handleSubtaskSubmit = (e) => {
    e.preventDefault()
    if (subtaskInput.trim()) {
      const newSubtask = {
        id: new Date().toISOString(),
        name: subtaskInput,
        checked: false,
      }
      handleAddSubtask(newSubtask)
      setSubtaskInput('')
    }
  }

  return (
    <div className='mb-4'>
      {subtasks &&
        subtasks.map((subtask) => (
          <div key={subtask.id} className='flex items-start mx-2 mb-1'>
            <button
              className={styles.checkbox}
              onClick={(e) => {
                e.preventDefault()
                handleSubtaskCheckedChange(subtask.id, !subtask.checked)
              }}>
              <CheckBox
                checked={subtask.checked}
                toggleChecked={() =>
                  handleSubtaskCheckedChange(subtask.id, !subtask.checked)
                }
              />
            </button>
            <Subtask
              subtask={subtask}
              checked={checked}
              onChange={handleSubtaskNameChange}
              onDelete={() => handleDeleteSubtask(subtask.id)}
            />
          </div>
        ))}
      {!checked && (
        <SubtaskInput
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          onSubmit={handleSubtaskSubmit}
          inputRef={inputRef}
        />
      )}
    </div>
  )
}

export default SubtaskBlock
