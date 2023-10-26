import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import styles from '../TaskModal/DeligateBlock/DeligateBlock.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../features/tasksSlice'
import { addTaskToUser } from '../../features/usersSlice'

const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)

  const { id } = props

  const selectItem = (index) => {
    const item = props.items[index]
    console.log('item: ', item)

    if (item) {
      props.command({ id: item })
    }

    const user = users.find((user) => user.name === item)
    dispatch(addUser({ id, userId: user.id }))
    dispatch(addTaskToUser({ userId: user.id, taskId: id }))
  }

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    )
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

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

  const getUserFirstLetter = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className='items'>
      {props.items.length ? (
        users.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={index}
            onClick={() => selectItem(index)}>
            <span
              className={
                'flex text-12 justify-center items-center min-w-[20px] h-[20px] mr-1 rounded-full' +
                ' ' +
                getUserBgColor(item.color) +
                ' ' +
                getUserTextColor(item.color)
              }>
              {getUserFirstLetter(item.name)}
            </span>
            <span
              className={
                'text-13 pb-[2px]' + ' ' + getUserTextColor(item.color)
              }>
              {item.name}
            </span>
            <span className='text-13 truncate leading-1.5'>{`(${item.email})`}</span>
          </button>
        ))
      ) : (
        <div className='item'>No result</div>
      )}
    </div>
  )
})

export default MentionList
