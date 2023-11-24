import React, { useEffect, useState } from 'react'
import styles from './ModalMenuButton.module.scss'
import Plus from '../svgs/Plus'
// import History from '../svgs/History'
import { useSelector } from 'react-redux'
import GoToButton from '../svgs/GoToButton'
import { NavLink } from 'react-router-dom'

const ProjectButton = ({ task, project, children, svgLeft, onClick }) => {
  //   console.log('project from ProjectButton: ', project)
  const allProjects = useSelector((state) => state.projects)
  const taskProject = allProjects.find((proj) => proj.id === task.project)
  //   console.log('taskProject from ProjectButton: ', taskProject)
  const view = localStorage.getItem('view')
  const allSections = useSelector((state) => state.sections)

  const getSectionFromTaskId = (taskId) => {
    const section = allSections.find((section) =>
      section.tasks.includes(taskId)
    )
    return section
  }

  return (
    <>
      <button className={styles.main} onClick={onClick}>
        <div className={styles.icon}>
          <div className={'pb-[1px] truncate text-grayHover'}>
            {svgLeft && svgLeft}
          </div>
          <div>
            {project ? (
              <div className='flex space-x-1 max-w-[155px] items-center pt-[2px]'>
                <p className='truncate text-grayHover text-13 m-0 h-[14px]'>
                  {taskProject.name}
                </p>
                <p>/</p>
                <p className='truncate text-grayHover text-13 m-0 h-[14px]'>
                  {getSectionFromTaskId(task.id).name}
                </p>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
        {project ? (
          <NavLink to={`/projects/${taskProject.id}${view}`}>
            <div className={styles.goTo}>
              <GoToButton />
            </div>
          </NavLink>
        ) : (
          <div className={styles.counter}>
            <Plus />
          </div>
        )}
      </button>
    </>
  )
}

export default ProjectButton
