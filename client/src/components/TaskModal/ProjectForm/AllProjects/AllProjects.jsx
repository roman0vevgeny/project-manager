import React from 'react'
import Project from '../Project/Project'
import styles from './AllProjects.module.scss'

const AllProjects = ({
  projects,
  taskProjects,
  onAddProject,
  onDeleteProject,
}) => {
  const handleProjectClick = (projectId) => {
    if (taskProjects?.includes(projectId)) {
      onDeleteProject(projectId)
    } else {
      onAddProject(projectId)
    }
  }

  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
          className={
            taskProjects && taskProjects.includes(project.id)
              ? styles.selected
              : ''
          }>
          <Project projectName={project.name} />
        </div>
      ))}
    </div>
  )
}

export default AllProjects
