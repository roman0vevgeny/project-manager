import React from 'react'
import styles from './ProjectDraggable.module.scss'
import Delete from '../../../svgs/Delete'
import Folder from '../../../svgs/Folder'
import { useNavigate } from 'react-router-dom'
import FolderClosed from '../../../svgs/FolderClosed'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const ProjectDraggable = ({
  projectName,
  onDelete,
  isDragging,
  projectId,
  tasks,
}) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/projects/${projectId}`)}>
      <div
        className={
          styles.withDelete +
          ' ' +
          (isDragging
            ? 'shadow-lg bg-gray text-grayHover border-1 border-grayHover'
            : 'border-1 border-transparent border-b-borderMain')
        }>
        <div className='flex items-center'>
          <div className={styles.folder}>
            <Folder />
          </div>
          <p>{capitalizeFirstLetter(projectName)}</p>
          <div className={styles.svg} onClick={onDelete}>
            <Delete />
          </div>
        </div>

        <div className='flex min-w-[15px] justify-center items-center'>
          {tasks}
        </div>
      </div>
    </div>
  )
}

export default ProjectDraggable
