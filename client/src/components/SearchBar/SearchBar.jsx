import React, { useState, useRef } from 'react'
import styles from './SearchBar.module.scss'
import Search from '../svgs/Search'
import Close from '../svgs/Close'
import TaskCard from './TaskCard/TaskCard'
import { useSelector } from 'react-redux'
import ArrowLeft from '../svgs/ArrowLeft'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [limitTasks, setLimitTasks] = useState(true)
  const inputRef = useRef(null)

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleClearInput = () => {
    setSearchValue('')
    setIsSearchFocused(true)
    setLimitTasks(true)
  }

  const handleCloseInput = () => {
    setSearchValue('')
    setIsSearchFocused(false)
    setLimitTasks(true)
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const tasks = useSelector((state) => state.tasks.tasks)

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div className='relative'>
      <div className={styles.main}>
        <div className={styles.icon}>
          <Search />
        </div>
        <input
          className={
            isSearchFocused ? styles.inputActive : styles.inputInactive
          }
          placeholder='Search tasks'
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleSearchFocus}
          ref={inputRef}
        />
        {searchValue && (
          <button
            type='button'
            className={styles.clear}
            onClick={handleClearInput}>
            <Close />
          </button>
        )}
        {isSearchFocused ? (
          <button className={styles.close} onClick={handleCloseInput}>
            <ArrowLeft />
          </button>
        ) : (
          <button className={styles.closeNone} onClick={handleCloseInput}>
            <ArrowLeft />
          </button>
        )}
      </div>
      {searchValue && isSearchFocused && (
        <div
          className={
            !limitTasks && filteredTasks.length > 14
              ? styles.searchPopupLimited
              : styles.searchPopup
          }>
          {filteredTasks.length > 0 ? (
            filteredTasks
              .slice(0, limitTasks ? 12 : filteredTasks.length)
              .map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className={styles.item}>
              <p>No tasks found</p>
            </div>
          )}
          {filteredTasks.length > 12 && limitTasks && (
            <div
              className={styles.limitButton}
              onClick={() => setLimitTasks(false)}>
              <p>...</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
