import React from 'react'
import styles from './Project.module.scss'
import Delete from '../../../svgs/Delete'
import Folder from '../../../svgs/Folder'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const Project = ({ projectName, deleteProject, onDelete, checked }) => {
  return (
    <div>
      {deleteProject ? (
        <div className={styles.withDelete}>
          <div className={styles.folder} onClick={onDelete}>
            <Folder />
          </div>
          <p>{capitalizeFirstLetter(projectName)}</p>
          <div className={styles.svg} onClick={onDelete}>
            <Delete />
          </div>
        </div>
      ) : (
        <div className={checked ? styles.checked : styles.project}>
          <p>{capitalizeFirstLetter(projectName)}</p>
        </div>
      )}
    </div>
  )
}

export default Project
