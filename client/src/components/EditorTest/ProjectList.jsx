import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  addProject,
  updateTodoTasksInProject,
  updateProgressTasksInProject,
  updateDoneTasksInProject,
  //   removeTaskFromProject,
  addTaskToProject,
} from '../../features/projectSlice'
import { updateTaskProjects } from '../../features/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProjectList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  //   const [items, setItems] = useState([])

  //   setItems(props.items)

  const dispatch = useDispatch()
  const { id, query } = props

  const projects = useSelector((state) => state.projects)
  const allTasks = useSelector((state) => state.tasks.tasks)
  const task = allTasks.find((task) => task.id === id)

  console.log('ProjectList - id: ', id)
  console.log('ProjectList - projects: ', projects)
  console.log('ProjectList - query: ', query)
  console.log('ProjectList - task: ', task)

  const createNewProjectAndAddToTask = (query, newProject) => {
    const projectId = newProject.id
    console.log('projectId: ', projectId)
    console.log(
      'createNewProjectAndAddToTask - props.items before:',
      props.items
    )
    dispatch(addTaskToProject({ projectId, taskId: task.id }))
    dispatch(
      updateTaskProjects({
        id: task.id,
        projects: [projectId, ...task.projects],
      })
    )
    console.log(
      'createNewProjectAndAddToTask - props.items after:',
      props.items
    )
    console.log('newProject: ', newProject)
    let updatedTodoTasks = [...newProject.todotasks]
    let updatedProgressTasks = [...newProject.progresstasks]
    let updatedDoneTasks = [...newProject.donetasks]

    switch (task.status) {
      case 'todo':
        updatedTodoTasks.push(task.id)
        break
      case 'inprogress':
        updatedProgressTasks.push(task.id)
        break
      case 'done':
        updatedDoneTasks.push(task.id)
        break
      default:
        break
    }

    dispatch(updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks }))
    dispatch(
      updateProgressTasksInProject({
        projectId,
        tasks: updatedProgressTasks,
      })
    )
    dispatch(updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks }))
  }

  const addExistingProjectToTask = (projectId) => {
    dispatch(addTaskToProject({ projectId, taskId: task.id }))
    dispatch(
      updateTaskProjects({
        id: task.id,
        projects: [...task.projects, projectId],
      })
    )
    console.log('addExistingProjectToTask - props.items before:', props.items)
    const project = projects.find((proj) => proj.id === projectId)
    if (project) {
      let updatedTodoTasks = [...project.todotasks]
      let updatedProgressTasks = [...project.progresstasks]
      let updatedDoneTasks = [...project.donetasks]

      switch (task.status) {
        case 'todo':
          updatedTodoTasks.push(task.id)
          break
        case 'inprogress':
          updatedProgressTasks.push(task.id)
          break
        case 'done':
          updatedDoneTasks.push(task.id)
          break
        default:
          break
      }

      dispatch(updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks }))
      dispatch(
        updateProgressTasksInProject({
          projectId,
          tasks: updatedProgressTasks,
        })
      )
      dispatch(updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks }))
      console.log('addExistingProjectToTask - props.items after:', props.items)
    }
  }

  const selectItem = (index) => {
    const item = props.items[index]
    console.log('item from selectItem: ', item)
    console.log('items from selectItem: ', props.items)

    if (item) {
      props.command({ id: item })
    }
    const existingProject = projects.find((project) => project.name === item)
    console.log('existingProject: ', existingProject)
    const projectId = existingProject.id
    console.log('projectId: ', projectId)
    const taskProjects = task.projects
    if (!taskProjects.includes(projectId)) {
      addExistingProjectToTask(projectId)
    }
  }

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    )
    console.log('Up Handler - selectedIndex: ', selectedIndex)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
    console.log('Down Handler - selectedIndex: ', selectedIndex)
  }

  const enterHandler = () => {
    if (selectedIndex >= props.items.length) {
      if (query) {
        console.log('Enter Handler - query: ', query)
        const existingProject = projects.find(
          (project) => project.name === query
        )
        if (!existingProject) {
          console.log('Enter Handler - Creating New Project')
          const newProject = {
            id: Date.now().toString(),
            name: query,
            tasks: [],
            icon: 'case',
            todotasks: [],
            progresstasks: [],
            donetasks: [],
          }
          dispatch(addProject(newProject))
          //   setItems([...items, newProject.name])
          console.log('Enter Handler - props.items before:', props.items)
          props.command({ id: query })
          console.log('Enter Handler - props.items after:', props.items)
          createNewProjectAndAddToTask(query, newProject)
          console.log(
            'Enter Handler - New Project Created - selectedIndex: ',
            selectedIndex
          )
        }
      }
    } else {
      selectItem(selectedIndex)
    }
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

  return (
    <div className='items'>
      {props.items.length ? (
        projects.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={index}
            onClick={() => selectItem(index)}>
            <span className='mx-1 text-13 py-[3px]'>{item.name}</span>
          </button>
        ))
      ) : (
        <button className='item is-selected' onClick={() => enterHandler()}>
          <div className='ml-1 text-13 py-[3px]'>Create</div>
          <div className='mr-1 text-13 py-[3px]'>{`"${query}"`}</div>
        </button>
      )}
    </div>
  )
})

export default ProjectList
