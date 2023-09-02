import React from 'react'
import NavButton from '../Button/NavButton'
import AllTasks from '../svgs/AllTasks'
import Today from '../svgs/Today'
import Projects from '../svgs/Projects'
import Star from '../svgs/Star'
import styles from './Navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskIsFavorite } from '../../features/tasksSlice'
import Dropdown from '../Dropdown/Dropdown'
import TagSvg from '../svgs/TagSvg'
import DropdownFavorites from '../Dropdown/DropdownFavorites'
import { createSelector } from '@reduxjs/toolkit'
import {
  selectTotalTasks,
  selectDueTasks,
  selectExpiredTasks,
} from '../../features/tasksSelectors'
import Expired from '../svgs/Expired'
import DropdownProjects from '../Dropdown/DropdownProjects'

const Navbar = () => {
  const dispatch = useDispatch()
  const selectTasks = (state) => state.tasks.tasks

  const totalTasks = useSelector(selectTotalTasks)
  // console.log('totalTasks', totalTasks)
  const dueTasks = useSelector(selectDueTasks)
  // console.log('dueTasks', dueTasks)
  const expiredTasks = useSelector(selectExpiredTasks)
  // console.log('expiredTasks', expiredTasks)

  const selectFavoriteTasks = createSelector([selectTasks], (tasks) =>
    tasks.filter((task) => task.favorite)
  )
  const favorites = useSelector(selectFavoriteTasks)
  const view = localStorage.getItem('view')

  const handleRemoveFavorite = (task) => {
    dispatch(updateTaskIsFavorite(task.id))
  }

  return (
    <div className={styles.main}>
      <NavButton
        children={'All tasks'}
        svgLeft={<AllTasks />}
        counter={totalTasks}
        to={`/home${view}`}
      />
      <NavButton
        children={'Today'}
        svgLeft={<Today />}
        counter={dueTasks}
        to={`/today${view}`}
      />
      <NavButton
        children={'Expired'}
        svgLeft={<Expired />}
        counter={expiredTasks}
        to={`/expired${view}`}
      />
      <div className={styles.sectionDevider}></div>
      <DropdownFavorites
        children={'Favorites'}
        items={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        svg={<Star />}
      />
      <Dropdown children={'Tags'} svg={<TagSvg />} className='m-0 p-0' />
      <DropdownProjects
        children={'Projects'}
        svg={<Projects />}
        className='m-0 p-0'
      />
    </div>
  )
}

export default Navbar
