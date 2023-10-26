import React, { useRef, useState, useEffect } from 'react'
import Button from '../Button/Button'
import Edit from '../svgs/Edit'
import styles from './SectionName.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import DropdownModal from '../Modal/DropdownModal'
import SortMenu from '../SortMenu/SortMenu'
import SortItem from '../SortItem/SortItem'
import Information from '../svgs/Information'
import Sort from '../svgs/Sort'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionUserName = ({ name, userId, noSvg }) => {
  const inputRef = useRef(null)

  const [userName, setUserName] = useState(name)
  const [warning, setWarning] = useState(false)
  const [open, setOpen] = useState(false)
  //   const [openIcon, setOpenIcon] = useState(false)
  const [sortType, setSortType] = useState(null)

  const dispatch = useDispatch()

  // const user = useSelector((state) =>
  //   state.users.users.find((user) => user.id === userId)
  // )

  const handleChange = (e) => {
    const newValue = e.target.value
    setUserName(newValue)
    if (newValue.length > 20) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }

  //   const handleIconChange = (icon) => {
  //     dispatch(updateProjectIcon({ projectId: project.id, icon: icon }))
  //     console.log('icon: ', icon)
  //   }

  const handleSortChange = (type) => {
    setSortType(type)
  }

  const handleToggleModal = () => {
    setOpen((prev) => !prev)
  }

  //   const handleOpenIcon = () => {
  //     setOpenIcon(true)
  //     console.log('opened')
  //   }

  //   const handleCloseIcon = () => {
  //     setOpenIcon(false)
  //     console.log('closed')
  //   }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleFocus = () => {
    inputRef.current.focus()
  }

  // const handleMouseDown = (e) => {
  //   if (!editable) {
  //     e.preventDefault()
  //   }
  //   return
  // }

  // const handleBlur = () => {
  //   if (userName.length <= 20) {
  //     dispatch(updateUserName({ name: userName, id: userId }))
  //   }
  // }

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     inputRef.current.blur()
  //     if (userName.length <= 20) {
  //       dispatch(updateUserName({ name: userName, id: userId }))
  //     }
  //   }
  // }

  useEffect(() => {
    setUserName(name)
  }, [name])

  return (
    <div>
      <div className='flex flex-row justify-between mx-2 items-center mb-[5px]'>
        {/* {!noSvg && (
          <div className='relative flex'>
            <div className={styles.iconBlock} onClick={handleOpenIcon}>
              {getIconFromName(project.icon)}
            </div>
            <DropdownModal
              children={
                <SectionIcon
                  projectIcon={project.icon}
                  onIconChange={handleIconChange}
                  onClose={handleCloseIcon}
                />
              }
              icon={true}
              open={openIcon}
              onClose={handleCloseIcon}
            />
          </div>
        )} */}
        <div className={styles.input}>{capitalizeFirstLetter(userName)}</div>
        <div className='flex flex-row'>
          {/* {editable && <Button svgLeft={<Edit />} onClick={handleFocus} />} */}
        </div>
        {sortType && (
          <SortItem sortType={sortType} onDelete={() => setSortType(null)} />
        )}
        <div className='relative flex flex-row'>
          <Button svgLeft={<Sort />} onClick={handleToggleModal} />
          <DropdownModal
            children={
              <SortMenu
                onSortChange={handleSortChange}
                onClose={handleCloseModal}
              />
            }
            open={open}
            onClose={handleCloseModal}
          />
        </div>
        {/* <div className='flex flex-row'>
          {editable && (
            <Button svgLeft={<Information />} onClick={handleFocus} />
          )}
        </div> */}
      </div>
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionUserName
