import React from 'react'
import { useSelector } from 'react-redux'

const ProjectBoards = () => {
  const allTasks = useSelector((state) => state.tasks.tasks)
  console.log(allTasks)

  return (
    <>
      {allTasks.map((task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <p>
            {task.subtasks.map((subtask) => (
              <div key={subtask.id}>
                <h2>{subtask.name}</h2>
                <p>{subtask.checked ? 'Done' : 'Not done'}</p>
              </div>
            ))}
          </p>
          <p>
            {task.projects.map((project) => (
              <div key={project.id}>
                <h2>{project.name}</h2>
              </div>
            ))}
          </p>
          <p>
            {task.tags.map((tag) => (
              <div key={tag.id}>
                <h2>{tag.name}</h2>
                <p>{tag.color}</p>
              </div>
            ))}
          </p>
        </div>
      ))}
    </>
  )
}
export default ProjectBoards
