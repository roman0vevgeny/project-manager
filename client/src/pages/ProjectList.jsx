import React, { useState, useRef, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import ListItem from '../components/ListItem/ListItem'
import styles from './Home.module.scss'
import SectionProjectName from '../components/SectionName/SectionProjectName'
import CreateButton from '../components/Button/CreateButton'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import InfoBlock from '../components/Info/IndoBlock'
import ScrollButton from '../components/Button/ScrollButton'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import {
  updateTaskOrder,
  moveTaskBetweenSections,
} from '../features/sectionSlice'
import { useParams } from 'react-router-dom'
import { selectTaskById } from '../helpers/selectTaskById'
import SectionSectionName from '../components/SectionName/SectionSectionName'

const ProjectList = () => {
  const [isShowButton, setIsShowButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  let location = useLocation()
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const allSections = useSelector((state) => state.sections)

  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )

  const findSectionsFromProject = (projectSections) => {
    const sections = []
    for (let sectionId of projectSections) {
      const section = allSections.find((section) => section.id === sectionId)
      if (section) {
        sections.push(section)
      }
    }
    return sections
  }

  const handleSelectTask = (task) => {
    setSelectedTaskId(task)
  }

  const selectedTask = useSelector((state) =>
    selectTaskById(state, selectedTaskId)
  )
  const sectionRef = useRef(null)

  const handleScroll = useCallback(() => {
    const position = sectionRef.current.scrollTop
    if (position > 300) {
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }
  }, [sectionRef])

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [sectionRef])

  const onDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) {
      return
    }
    const sourceId = source.droppableId
    console.log('sourceId: ', sourceId)
    const destinationId = destination.droppableId
    console.log('destinationId: ', destinationId)
    if (type === 'section') {
      // Двигаю секции
      const newSections = [...project.sections]
      console.log('newSections: ', newSections)
      const [movedSection] = newSections.splice(source.index, 1)
      console.log('movedSection: ', movedSection)
      newSections.splice(destination.index, 0, movedSection)
      console.log('newSections after splice: ', newSections)
      dispatch(
        updateSectionsOrder({
          projectId: project.id,
          sections: newSections,
        })
      )
    } else {
      // Перемещение задач
      if (sourceId === destinationId) {
        // Двигаю задачу внутри одной секции
        const section = allSections.find((section) => section.id === sourceId)
        const newTasks = [...section.tasks]
        const [movedTask] = newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, movedTask)
        dispatch(
          updateTaskOrder({
            sectionId: sourceId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        )
      } else {
        // Двигаю между секциями задачу
        const sourceSection = allSections.find(
          (section) => section.id === sourceId
        )
        const destinationSection = allSections.find(
          (section) => section.id === destinationId
        )
        const movedTask = sourceSection.tasks[source.index]
        const newDestinationTasks = [...destinationSection.tasks]
        newDestinationTasks.splice(destination.index, 0, movedTask)

        dispatch(
          moveTaskBetweenSections({
            projectId: projectId,
            sourceSectionId: sourceId,
            destinationSectionId: destinationId,
            taskId: movedTask,
            destinationIndex: destination.index,
          })
        )
      }
    }
  }

  const renderCreateButton = (bigButton, projectId) => {
    return <CreateButton bigButton={bigButton} projectId={projectId} />
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const renderSectionName = (section) => {
    return (
      <SectionSectionName
        projectId={projectId}
        section={section}
        noSvg={true}
        editable={true}
      />
    )
  }

  const countAllSectionsTasks = (sections) => {
    let count = 0
    for (let section of sections) {
      count += section.tasks.length
    }
    return count
  }

  const renderSections = () => {
    return (
      <div className={styles.newScrollable}>
        <DragDropContext onDragEnd={onDragEnd}>
          {project.sections.map((sectionId) => {
            const section = allSections.find(
              (section) => section.id === sectionId
            )
            if (section) {
              return (
                <div
                  className='flex flex-col w-full justify-center'
                  key={section.id}>
                  <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out'>
                    {renderSectionName(section)}
                  </div>
                  <section className={styles.scrollableBlockList}>
                    <div className='w-full'>
                      <div className='z-[0]'>
                        <Droppable
                          droppableId={`${section.id}`}
                          className='z-[0]'>
                          {(provided, snapshot) => {
                            const { droppableProps, innerRef, ...rest } =
                              provided
                            return (
                              <div
                                className={
                                  snapshot.isDraggingOver
                                    ? styles.draggingOverList
                                    : styles.notDraggingOverList
                                }
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                {...rest}>
                                {section.tasks.map((task, index) => (
                                  <Draggable
                                    key={task}
                                    draggableId={`${task}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <div onClick={handleOpenModal}>
                                          <ListItem
                                            taskId={task}
                                            onSelectTask={handleSelectTask}
                                            onClick={() =>
                                              handleSelectTask(task)
                                            }
                                            isDragging={snapshot.isDragging}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}

                                {provided.placeholder}
                              </div>
                            )
                          }}
                        </Droppable>
                        <div className='flex justify-between mr-5 mt-5'>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )
            }
            return null
          })}
        </DragDropContext>
      </div>
    )
  }

  return (
    <>
      {project ? (
        <div className={styles.main} ref={sectionRef}>
          {countAllSectionsTasks(findSectionsFromProject(project.sections)) ===
          0 ? (
            <div className='text-task m-0 transition-all duration-200 ease-in-out'>
              <InfoBlock location={location.pathname} />
              <p>Project is empty</p>
              <p className='text-gray'>Add tasks to it</p>
            </div>
          ) : (
            <div className=''>
              <div className='flex'>
                <div className='flex w-full justify-center pb-2'>
                  <SectionProjectName
                    name={project.name}
                    projectId={project.id}
                    noSvg={false}
                    editable={true}
                  />
                </div>
              </div>
              <div className='mx-4'>{renderSections()}</div>

              {isShowButton && <ScrollButton sectionRef={sectionRef} />}
            </div>
          )}
          {renderCreateButton(true, projectId)}

          <Modal
            open={selectedTaskId !== null}
            onClose={() => handleSelectTask(null)}
            children={
              selectedTask ? (
                <EditTaskModal
                  task={selectedTask}
                  onClose={() => handleSelectTask(null)}
                />
              ) : (
                <div>Задача не найдена</div>
              )
            }
          />
        </div>
      ) : (
        <div className='m-2 flex h-fit justify-center'>
          <div className='flex px-4 py-1 bg-yellowTag text-yellowTag text-14 rounded-md w-fit'>
            Project not found or deleted
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectList
