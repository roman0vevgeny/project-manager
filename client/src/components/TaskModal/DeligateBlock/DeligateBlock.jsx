import React, { useEffect, useState } from 'react'
import styles from './DeligateBlock.module.scss'
import { useDispatch } from 'react-redux'
import { removeTaskFromUser } from '../../../features/usersSlice'
import { updateTaskUsers } from '../../../features/tasksSlice'
import Delete from '../../svgs/Delete'

const DeligateBlock = ({
  users,
  task,
  onDeligateChange,
  onDelete,
  onClose,
}) => {
  const [newDeligate, setNewDeligate] = useState(null)

  const dispatch = useDispatch()

  console.log('DeligateBlock - users:', users)

  const notTaskUsers = users.filter((user) => user.id !== task.users)
  console.log('DeligateBlock - notTaskUsers:', notTaskUsers)

  const taskUsers = users.filter((user) => user.id === task.users)

  const handleChooseUser = (user) => {
    if (task.id) {
      onDeligateChange(user.id, task.id)
      console.log('DeligateBlock - user.id:', user.id)
    } else {
      setNewDeligate(user.id)
      onDeligateChange(user.id, null)
    }
    onClose()
  }

  const getUserFirstLetter = (name) => {
    return name.charAt(0).toUpperCase()
  }

  //   const handleDeleteUser = (user) => {
  //     dispatch(
  //       updateTaskUsers({
  //         id: task.id,
  //       }),
  //       removeTaskFromUser({ userId: user.id, taskId: task.id })
  //     )
  //   }

  const getUserBgColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blue
      case 'green':
        return styles.green
      case 'pink':
        return styles.pink
      case 'purple':
        return styles.purple
      case 'red':
        return styles.red
      case 'yellow':
        return styles.yellow
      case 'sea':
        return styles.sea
      case 'gray':
        return styles.gray
      default:
        return styles.blue
    }
  }

  const getUserTextColor = (color) => {
    switch (color) {
      case 'blue':
        return styles.blueText
      case 'green':
        return styles.greenText
      case 'pink':
        return styles.pinkText
      case 'purple':
        return styles.purpleText
      case 'red':
        return styles.redText
      case 'yellow':
        return styles.yellowText
      case 'sea':
        return styles.seaText
      case 'gray':
        return styles.grayText
      default:
        return styles.blueText
    }
  }

  return (
    <div className='flex flex-col'>
      {taskUsers &&
        taskUsers.map((user) => (
          <div
            key={user.id}
            className={styles.main}
            onClick={() => onDelete(user)}>
            <div
              className={
                styles.user +
                ' ' +
                getUserBgColor(user.color) +
                ' ' +
                getUserTextColor(user.color)
              }>
              {getUserFirstLetter(user.name)}
            </div>
            <div className={styles.name + ' ' + getUserTextColor(user.color)}>
              {user.name}
            </div>
            <div className='text-13 mt-1 pb-[3px] ml-1 truncate'>
              {`(${user.email})`}
            </div>
            <button className={styles.svg} onClick={() => onDelete(user)}>
              <Delete />
            </button>
          </div>
        ))}
      {taskUsers && taskUsers.length > 0 && (
        <div className='flex w-full h-[1px] bg-[var(--stroke)]'></div>
      )}

      <div className={styles.container}>
        {notTaskUsers.map((user) => (
          <div
            key={user.id}
            className={styles.main}
            onClick={() => handleChooseUser(user)}>
            <div
              className={
                styles.user +
                ' ' +
                getUserBgColor(user.color) +
                ' ' +
                getUserTextColor(user.color)
              }>
              {getUserFirstLetter(user.name)}
            </div>
            <div className={styles.name + ' ' + getUserTextColor(user.color)}>
              {user.name}
            </div>
            <div className='text-13 mt-1 pb-[3px] ml-1 truncate'>
              {`(${user.email})`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeligateBlock
