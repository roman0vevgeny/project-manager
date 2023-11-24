import React, { useState } from 'react'
import TaskNameModal from './TaskName/TaskNameModal'
import styles from './EditTaskModal.module.scss'
import TaskDescription from './TaskDescription/TaskDescription'
import TagForm from './TagForm/TagForm'
import Tag from '../Tag/Tag'
import Calend from './Calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTaskExpirationDate,
  updateTaskTags,
  updateTaskSubtasks,
  updateTaskIsFavorite,
  updateTaskProjects,
  deleteTask,
  addTask,
  setTaskPriority,
  updateTaskStatus,
  updateTaskDocuments,
  addUser,
  updateTaskUsers,
} from '../../features/tasksSlice'
import // addTaskToProject,
// removeTaskFromProject,
// updateTodoTasksInProject,
// updateProgressTasksInProject,
// updateDoneTasksInProject,
'../../features/projectSlice'
import {
  addTaskToUser,
  removeTaskFromUser,
  addTaskToUserDoneTasks,
  addTaskToUserProgressTasks,
  addTaskToUserTodoTasks,
} from '../../features/usersSlice'
import SubtaskBlock from './SubtaskBlock/SubtaskBlock'
import TaskHeader from './TaskHeader/TaskHeader'
import History from '../svgs/History'
import ProjectForm from './ProjectForm/ProjectForm'
import Trash from '../svgs/Trash'
import Copy from '../svgs/Copy'
import DropdownModal from '../Modal/DropdownModal'
import ModalMenuButton from '../Button/ModalMenuButton'
import Cal from '../svgs/Cal'
import Folder from '../svgs/Folder'
import TagSvg from '../svgs/TagSvg'
import Priority from '../svgs/Priority'
import PriorityBlock from './PriorityBlock/PriorityBlock'
import Status from '../svgs/Status'
import StatusBlock from './StatusBlock/StatusBlock'
import Archive from '../svgs/Archive'
import Drive from '../svgs/Drive'
import DocumentForm from './DocumentForm/DocumentForm'
import Deligate from '../svgs/Deligate'
import Contacts from '../svgs/Contacts'
import Coins from '../svgs/Coins'
import DeligateBlock from './DeligateBlock/DeligateBlock'
import { selectUserById } from '../../helpers/selectUserById'
import { v4 as uuidv4 } from 'uuid'
import StatusMenu from '../svgs/StatusMenu'
import ProjectButton from '../Button/ProjectButton'
import NewProjectForm from './ProjectForm/NewProjectForm'
import { removeTaskFromSection } from '../../features/sectionSlice'

const EditTaskModal = ({ onClose, task }) => {
  const [open, setOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openTag, setOpenTag] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openDocument, setOpenDocument] = useState(false)
  const [openDeligate, setOpenDeligate] = useState(false)
  // console.log('EditTaskModal - task:', task)
  // console.log('EditTaskModal - status:', task.status)

  if (!task) {
    // console.log('EditTaskModal - Redirecting to home page')
    onClose()
    // return <Navigate to='/' />
  }

  const dispatch = useDispatch()
  const allTags = useSelector((state) => state.tags)
  const allProjects = useSelector((state) => state.projects)
  const users = useSelector((state) => state.users.users)
  // console.log('EditTaskModal - users:', users)

  const { id, tags, description, checked, project } = task || {}

  const handleDeleteTag = (tagId) => {
    dispatch(
      updateTaskTags({
        id: task.id,
        tags: task.tags.filter((id) => id !== tagId),
      })
    )
  }

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
    // projects.forEach((projectId) => {
    //   // dispatch(removeTaskFromProject({ projectId, taskId }))
    // })
    users.forEach((user) => {
      dispatch(removeTaskFromUser({ userId: user.id, taskId }))
    })
    onClose()
  }

  // const handleProjectSelect = (projectId) => {
  //   if (projects.includes(projectId)) {
  //     // dispatch(removeTaskFromProject({ projectId, taskId: id }))
  //     dispatch(
  //       updateTaskProjects({
  //         id: task.id,
  //         projects: projects.filter((id) => id !== projectId),
  //       })
  //     )
  //     const project = allProjects.find((proj) => proj.id === projectId)
  //     if (project) {
  //       let updatedTodoTasks = [...project.todotasks]
  //       let updatedProgressTasks = [...project.progresstasks]
  //       let updatedDoneTasks = [...project.donetasks]

  //       switch (task.status) {
  //         case 'todo':
  //           updatedTodoTasks = updatedTodoTasks.filter((id) => id !== task.id)
  //           break
  //         case 'inprogress':
  //           updatedProgressTasks = updatedProgressTasks.filter(
  //             (id) => id !== task.id
  //           )
  //           break
  //         case 'done':
  //           updatedDoneTasks = updatedDoneTasks.filter((id) => id !== task.id)
  //           break
  //         default:
  //           break
  //       }

  //       // dispatch(
  //       //   updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
  //       // )
  //       // dispatch(
  //       //   updateProgressTasksInProject({
  //       //     projectId,
  //       //     tasks: updatedProgressTasks,
  //       //   })
  //       // )
  //       // dispatch(
  //       //   updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks })
  //       // )
  //     }
  //   } else {
  //     // dispatch(addTaskToProject({ projectId, taskId: id }))
  //     dispatch(
  //       updateTaskProjects({
  //         id: task.id,
  //         projects: [...projects, projectId],
  //       })
  //     )
  //     const project = allProjects.find((proj) => proj.id === projectId)
  //     if (project) {
  //       let updatedTodoTasks = [...project.todotasks]
  //       let updatedProgressTasks = [...project.progresstasks]
  //       let updatedDoneTasks = [...project.donetasks]

  //       switch (task.status) {
  //         case 'todo':
  //           updatedTodoTasks.push(task.id)
  //           break
  //         case 'inprogress':
  //           updatedProgressTasks.push(task.id)
  //           break
  //         case 'done':
  //           updatedDoneTasks.push(task.id)
  //           break
  //         default:
  //           break
  //       }

  //       // dispatch(
  //       //   updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
  //       // )
  //       // dispatch(
  //       //   updateProgressTasksInProject({
  //       //     projectId,
  //       //     tasks: updatedProgressTasks,
  //       //   })
  //       // )
  //       // dispatch(
  //       //   updateDoneTasksInProject({ projectId, tasks: updatedDoneTasks })
  //       // )
  //     }
  //   }
  // }

  // removeTaskFromSection(state, action) {
  //     const { projectId, sectionId, taskId } = action.payload
  //     const project = state.find((project) => project.id === projectId)
  //     if (project) {
  //       const section = project.sections.find(
  //         (section) => section.id === sectionId
  //       )
  //       if (section) {
  //         section.tasks = section.tasks.filter((id) => id !== taskId)
  //       }
  //     }
  //   },

  const handleProjectSelect = (projectId, allProjects, sectionId, task) => {
    // Найти текущий проект, где находится задача
    const currentProject = allProjects.find((proj) => proj.id === task.project)

    // Проверить, что задача действительно находится в предыдущей секции
    const checkIfCurrentProjectSectionsHasTask = currentProject.sections.find(
      (section) => section.tasks.includes(task.id)
    )

    if (checkIfCurrentProjectSectionsHasTask) {
      // Удалить задачу из предыдущей секции
      dispatch(
        removeTaskFromSection({
          taskId: task.id,
          sectionId: sectionId,
          projectId: currentProject.id,
        })
      )
    }

    // Обновить проект и секцию задачи в Redux
    dispatch(
      updateTaskProjects({
        id: task.id,
        project: projectId,
      })
    )
    dispatch(
      addTaskToSection({
        taskId: task.id,
        sectionId,
        projectId,
      })
    )
  }

  const handleUserSelect = (userId) => {
    // console.log('handleUserSelect - userId:', userId)
    // console.log('handleUserSelect - type of userId:', typeof userId)
    users.forEach((user) => {
      dispatch(removeTaskFromUser({ userId: user.id, taskId: task.id }))
    })
    dispatch(addTaskToUser({ userId, taskId: task.id }))
    if (task.status === 'todo') {
      dispatch(addTaskToUserTodoTasks({ userId, taskId: task.id }))
    } else if (task.status === 'inprogress') {
      dispatch(addTaskToUserProgressTasks({ userId, taskId: task.id }))
    } else if (task.status === 'done') {
      dispatch(addTaskToUserDoneTasks({ userId, taskId: task.id }))
    }
    // console.log('handleUserSelect - all users after adding:', users)
    dispatch(addUser({ id: task.id, userId: userId }))
    // console.log('handleUserSelect - task after adding:', task)
  }

  const handleDeleteUser = (userId) => {
    users.forEach((user) => {
      dispatch(removeTaskFromUser({ userId: user.id, taskId: task.id }))
    })
    dispatch(updateTaskUsers({ id: task.id }))
    // console.log('handleDeleteUser - userId:', userId)
    // console.log('handleDeleteUser - task after deleting:', task)
    // console.log('handleDeleteUser - all users after deleting:', users)
  }

  const handleDuplicateTask = () => {
    // const newIdForTask = uuidv4()
    const newTask = {
      name: task.name,
      description: description,
      tags: tags,
      subtasks: task.subtasks,
      projects: projects,
      expirationDate: task.expirationDate,
      priority: task.priority,
      status: 'todo',
      documents: task.documents,
      users: task.users,
      favorite: false,
      id: Date.now(),
    }
    const user = users.find((user) => user.id === task.users)
    // console.log('EditTaskModal - user:', user)
    // console.log('EditTaskModal - newIdForTask:', newIdForTask)
    dispatch(addTask(newTask))
    newTask.projects.forEach((projectId) => {
      // dispatch(addTaskToProject({ projectId, taskId: newTask.id }))
      const project = allProjects.find((proj) => proj.id === projectId)
      if (project) {
        // let updatedTodoTasks = [...project.todotasks]
        // dispatch(
        //   updateTodoTasksInProject({ projectId, tasks: updatedTodoTasks })
        // )
      }
    })
    if (user) {
      // console.log('EditTaskModal - newTask.id:', newTask.id)
      dispatch(addTaskToUser({ userId: user.id, taskId: newTask.id }))
      dispatch(addTaskToUserTodoTasks({ userId: user.id, taskId: newTask.id }))
      dispatch(addUser({ id: newTask.id, userId: user.id }))
    }
    onClose()
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleCloseProjectModal = () => {
    setOpenProject(false)
  }

  const handleCloseTagModal = () => {
    setOpenTag(false)
  }

  const handleClosePriorityModal = () => {
    setOpenPriority(false)
  }

  const handleOpenDocumentModal = () => {
    setOpenDocument(true)
  }

  const handleCloseDocumentModal = () => {
    setOpenDocument(false)
  }

  const handleOpenPriorityModal = () => {
    setOpenPriority(true)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseDeligateModal = () => {
    setOpenDeligate(false)
  }

  const handleOpenDeligateModal = () => {
    setOpenDeligate(true)
  }

  const handleOpenProjectModal = () => {
    setOpenProject(true)
  }

  const handleOpenTagModal = () => {
    setOpenTag(true)
  }

  const handleCloseStatusModal = () => {
    setOpenStatus(false)
  }

  const handleOpenStatusModal = () => {
    setOpenStatus(true)
  }

  const handleEscapePress = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleCloseModal()
      handleCloseProjectModal()
      handleCloseTagModal()
    }
  }

  // console.log('EditTaskModal - task.users:', task.users)

  return (
    <>
      {task && (
        <div onClose={onClose} className='flex flex-col bg-mainBg mx-8 mb-8'>
          <div className='sticky top-0 z-[301] bg-mainBg pt-8 pb-0 h-fit'>
            <TaskHeader
              task={task}
              onFavoriteChange={(newFavorite) =>
                dispatch(
                  updateTaskIsFavorite({ id: task.id, favorite: newFavorite })
                )
              }
              isNewTask={false}
              dispatch={dispatch}
              handleProjectSelect={handleProjectSelect}
            />
          </div>

          <div className='relative flex flex-row w-full h-full mt-6'>
            <div className='flex flex-col justify-between h-full flex-grow'>
              <div className='flex flex-col flex-grow'>
                {/* <TaskNameModal id={id} checked={checked} /> */}
                {description === '' && checked ? (
                  ' '
                ) : (
                  <TaskDescription
                    task={task}
                    checked={checked}
                    users={users}
                    projects={allProjects}
                  />
                )}

                {tags.length > 0 && (
                  <div className='flex flex-wrap ml-4 mt-1 mb-1 max-w-[530px]'>
                    {tags.map((tagId, index) => {
                      const tag = allTags.find((tag) => tag.id === tagId)
                      return (
                        tag && (
                          <Tag
                            color={tag.color}
                            tagName={tag.name}
                            deleteTag={!checked ? true : false}
                            key={index}
                            onDelete={() => handleDeleteTag(tagId)}
                            checked={checked}
                          />
                        )
                      )
                    })}
                  </div>
                )}
                <SubtaskBlock
                  subtasks={task.subtasks}
                  onSubtasksChange={(newSubtasks) =>
                    dispatch(
                      updateTaskSubtasks({ id: task.id, subtasks: newSubtasks })
                    )
                  }
                  checked={checked}
                  parentTask={task}
                />
              </div>
              <div className='m-2 flex'>
                <div className='mr-1 flex space-x-2 w-full'>
                  <button
                    type={'submit'}
                    onClick={handleDuplicateTask}
                    className='flex rounded-[5px] text-grayHover text-14 font-bold bg-nav justify-center items-center hover:bg-navButtonHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <Copy />
                    </div>
                  </button>
                  <button
                    type={'submit'}
                    className='flex rounded-[5px] text-grayHover text-14 font-bold bg-nav justify-center items-center hover:bg-navButtonHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <History />
                    </div>
                  </button>
                  {checked && (
                    <button
                      type={'submit'}
                      className='flex rounded-[5px] text-grayHover text-14 font-bold bg-nav justify-center items-center hover:bg-navButtonHover hover:text-grayHover my-1 h-[25px] px-3 w-[25px]'>
                      <div className=''>
                        <Archive />
                      </div>
                    </button>
                  )}
                  <button
                    type={'submit'}
                    onClick={() => handleDeleteTask(id, projects)}
                    className='flex rounded-[5px] text-grayHover text-14 font-bold bg-nav justify-center items-center hover:bg-redTag hover:text-redTag my-1 h-[25px] px-3 w-[25px]'>
                    <div className=''>
                      <Trash />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {!checked && (
              <>
                <div className={styles.verticalDevider}></div>
                <div className='pl-1 pr-1 mb-2 py-2 rounded-[10px]'>
                  <div>
                    <div className='relative flex flex-row'>
                      <ProjectButton
                        project={task.project}
                        task={task}
                        svgLeft={<Folder />}
                        children={'Add project'}
                        onClick={handleOpenProjectModal}
                        onClose={handleCloseProjectModal}
                      />
                      <DropdownModal
                        children={
                          <NewProjectForm
                            task={task}
                            // value={project}
                            allProjects={allProjects}
                            // onChange={(newProjects) =>
                            //   dispatch(
                            //     updateTaskProjects({
                            //       id: task.id,
                            //       project: newProject,
                            //     })
                            //   )
                            // }
                            isNewTask={false}
                            handleProjectSelect={handleProjectSelect}
                            // taskId={id}
                            onClose={handleCloseProjectModal}
                          />
                        }
                        open={openProject}
                        onClose={handleCloseProjectModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>

                    <div className='relative flex flex-row'>
                      <ModalMenuButton
                        svgLeft={<Cal />}
                        children={
                          (task.expirationDate &&
                            new Date(task.expirationDate).toLocaleDateString(
                              navigator.language,
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                              }
                            )) ||
                          'Add due date'
                        }
                        onClick={handleOpenModal}
                        expirationDate={
                          task.expirationDate &&
                          task.expirationDate.slice(0, -1)
                        }
                        checked={checked}
                        onClose={handleCloseModal}
                      />
                      <DropdownModal
                        children={
                          <Calend
                            expirationDate={task.expirationDate}
                            task={task}
                            dispatch={dispatch}
                            onChange={(newExpirationDate) =>
                              dispatch(
                                updateTaskExpirationDate({
                                  id: task.id,
                                  expirationDate: newExpirationDate,
                                })
                              )
                            }
                            checked={checked}
                            onClose={handleCloseModal}
                          />
                        }
                        open={open}
                        onClose={handleCloseModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<TagSvg />}
                        children={'Add tags'}
                        onClick={handleOpenTagModal}
                        onClose={handleCloseTagModal}
                      />
                      <DropdownModal
                        children={
                          <TagForm
                            value={tags}
                            onChange={(newTags) =>
                              dispatch(
                                updateTaskTags({ id: task.id, tags: newTags })
                              )
                            }
                            isNewTask={false}
                            taskId={id}
                          />
                        }
                        open={openTag}
                        onClose={handleCloseTagModal}
                        noBorder={true}
                        stopPropagation={true}
                        onEscapePress={handleEscapePress}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<Priority />}
                        children={
                          task.priority ? `${task.priority}` : 'Set priority'
                        }
                        onClick={handleOpenPriorityModal}
                        onClose={handleClosePriorityModal}
                        priority={task.priority}
                      />
                      <DropdownModal
                        children={
                          <PriorityBlock
                            task={task}
                            onPriorityChange={(newPriority) =>
                              dispatch(
                                setTaskPriority({
                                  id: task.id,
                                  priority: newPriority,
                                })
                              )
                            }
                            onClose={handleClosePriorityModal}
                          />
                        }
                        open={openPriority}
                        onClose={handleClosePriorityModal}
                        noBorder={true}
                        stopPropagation={true}
                        // onEscapePress={handleEscapePress}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<StatusMenu />}
                        onClick={handleOpenStatusModal}
                        onClose={handleCloseStatusModal}
                        status={task.status}
                      />
                      <DropdownModal
                        children={
                          <StatusBlock
                            task={task}
                            onStatusChange={(newStatus) =>
                              dispatch(
                                updateTaskStatus({
                                  id: task.id,
                                  status: newStatus,
                                })
                              )
                            }
                            onClose={handleCloseStatusModal}
                          />
                        }
                        open={openStatus}
                        onClose={handleCloseStatusModal}
                        noBorder={true}
                        stopPropagation={true}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<Drive />}
                        children={
                          task.documents && task.documents.length > 0
                            ? `Drive docs: ${task.documents.length}`
                            : 'Add documents'
                        }
                        onClick={handleOpenDocumentModal}
                        onClose={handleCloseDocumentModal}
                      />
                      <DropdownModal
                        children={
                          <DocumentForm
                            value={task.documents}
                            task={task}
                            onChange={(newDocuments) =>
                              dispatch(
                                updateTaskDocuments({
                                  id: task.id,
                                  documents: newDocuments,
                                })
                              )
                            }
                            isNewTask={false}
                            onClose={handleCloseDocumentModal}
                          />
                        }
                        open={openDocument}
                        onClose={handleCloseDocumentModal}
                        noBorder={true}
                        stopPropagation={true}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<Deligate />}
                        children={
                          task.users
                            ? `Deligated to: ${selectUserById(
                                users,
                                task.users
                              )}`
                            : 'Deligate'
                        }
                        onClick={handleOpenDeligateModal}
                        onClose={handleCloseDeligateModal}
                      />
                      <DropdownModal
                        children={
                          <DeligateBlock
                            users={users}
                            task={task}
                            // onDeligateChange={(user) => {
                            //   dispatch(removeTaskFromUser({ userId: users.id }))
                            //   dispatch(
                            //     addTaskToUser({
                            //       userId: user,
                            //       taskId: task.id,
                            //     })
                            //   )
                            //   dispatch(
                            //     addUser({
                            //       id: task.id,
                            //       userId: user,
                            //     })
                            //   )
                            //   console.log('EditTaskModal - user (new):', user)
                            // }}
                            onDeligateChange={(user) => handleUserSelect(user)}
                            onDelete={(user) => handleDeleteUser(user)}
                            isNewTask={false}
                            onClose={handleCloseDeligateModal}
                          />
                        }
                        open={openDeligate}
                        onClose={handleCloseDeligateModal}
                        noBorder={true}
                        stopPropagation={true}
                      />
                    </div>
                    <div className='w-[227px] h-[1px] bg-[var(--stroke)] my-[5px]'></div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<Contacts />}
                        children={'Add contacts'}
                        onClose={handleCloseDocumentModal}
                      />
                    </div>
                    <div className='relative flex flex-row mr-2'>
                      <ModalMenuButton
                        svgLeft={<Coins />}
                        children={'Add expenses'}
                        onClose={handleCloseDocumentModal}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default EditTaskModal
