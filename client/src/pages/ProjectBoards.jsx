import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './Home.module.scss'
import SectionProjectName from '../components/SectionName/SectionProjectName'
import CreateButton from '../components/Button/CreateButton'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ScrollButton from '../components/Button/ScrollButton'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Modal from '../components/Modal/Modal'
import EditTaskModal from '../components/TaskModal/EditTaskModal'
import InfoBlock from '../components/Info/IndoBlock'
import {
  moveTaskBetweenSections,
  updateTaskOrder,
} from '../features/sectionSlice'
import { updateSectionsOrder } from '../features/projectSlice'
import { useParams } from 'react-router-dom'
import { selectTaskById } from '../helpers/selectTaskById'
import BoardItem from '../components/BoardItem.jsx/BoardItem'
import SectionSectionName from '../components/SectionName/SectionSectionName'
import Plus from '../components/svgs/Plus'
import SectionIcon from '../components/svgs/SectionIcon'
import SectionInputName from '../components/SectionName/SectionInputName'

const ProjectBoards = () => {
  const [isShowButton, setIsShowButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [showAddSectionInput, setShowAddSectionInput] = useState(false)

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
      // } else {
      //   // Moving sections between different projects
      //   const sourceProject = allSections.find(
      //     (project) => project.id === Number(sourceId)
      //   )
      //   const destinationProject = allSections.find(
      //     (project) => project.id === Number(destinationId)
      //   )
      //   const movedSection = sourceProject.sections[source.index]
      //   const newDestinationSections = [...destinationProject.sections]
      //   newDestinationSections.splice(destination.index, 0, movedSection)
      //   const destinationIndex = parseInt(destination.index, 10)
      //   dispatch(
      //     moveSectionBetweenProjects({
      //       sourceProjectId: Number(sourceId),
      //       destinationProjectId: Number(destinationId),
      //       sectionId: movedSection,
      //       destinationIndex: destinationIndex,
      //     })
      //   )
      // }
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

  const handleOpenModal = () => {
    setOpen(true)
  }

  const renderSectionName = (section, isDragging) => {
    return (
      <SectionSectionName
        projectId={projectId}
        section={section}
        noSvg={true}
        editable={true}
        isDragging={isDragging}
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
      <div className='flex mx-8'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={`${project.id}`}
            type='section'
            direction='horizontal'>
            {(provided, snapshot) => {
              const { droppableProps, innerRef, ...rest } = provided
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...rest}
                  className={snapshot.isDraggingOver ? 'flex' : 'flex'}>
                  {project.sections.map((sectionId, index) => {
                    const section = allSections.find(
                      (section) => section.id === sectionId
                    )
                    if (section) {
                      return (
                        <>
                          <Draggable
                            key={section.id}
                            draggableId={`${section.id}`}
                            index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={
                                  snapshot.isDragging
                                    ? 'flex border-1 border-checkbox rounded-[13px] bg-mainBg mx-2 outline-none overflow-hidden transition-colors duration-200 ease-in-out'
                                    : 'flex bg-mainBg mx-2 outline-none rounded-[10px] h-[calc(100vh-300px)] transition-colors duration-200 ease-in-out'
                                }>
                                <div>
                                  <div className='sticky top-0 z-[1] bg-mainBg transition-all duration-200 ease-in-out rounded-[15px]'>
                                    {renderSectionName(
                                      section,
                                      snapshot.isDragging
                                    )}
                                  </div>
                                  <section>
                                    <div>
                                      <div>
                                        <Droppable
                                          droppableId={`${section.id}`}>
                                          {(provided, snapshot) => {
                                            const {
                                              droppableProps,
                                              innerRef,
                                              ...rest
                                            } = provided
                                            return (
                                              <div
                                                className={
                                                  snapshot.isDraggingOver
                                                    ? styles.draggingOverBoards
                                                    : styles.notDraggingOverBoards
                                                }
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                {...rest}>
                                                {section.tasks.map(
                                                  (task, index) => (
                                                    <Draggable
                                                      key={task}
                                                      draggableId={`${task}`}
                                                      index={index}>
                                                      {(provided, snapshot) => (
                                                        <div
                                                          ref={
                                                            provided.innerRef
                                                          }
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}>
                                                          <div
                                                            onClick={
                                                              handleOpenModal
                                                            }>
                                                            <BoardItem
                                                              taskId={task}
                                                              onSelectTask={
                                                                handleSelectTask
                                                              }
                                                              onClick={() =>
                                                                handleSelectTask(
                                                                  task
                                                                )
                                                              }
                                                              isDragging={
                                                                snapshot.isDragging
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      )}
                                                    </Draggable>
                                                  )
                                                )}
                                                {!snapshot.isDraggingOver && (
                                                  <div>
                                                    <div className='flex items-center justify-start mx-2 my-1 cursor-pointer py-2 hover:bg-nav rounded-[15px] space-x-2 text-blueTag hover:text-task'>
                                                      <div className='ml-3'>
                                                        <Plus />
                                                      </div>
                                                      <div className='text-13'>
                                                        Add task
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
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
                              </div>
                            )}
                          </Draggable>
                          {!snapshot.isDraggingOver && !showAddSectionInput && (
                            <div
                              className='relative w-0 h-[calc(100vh-200px)]'
                              onMouseEnter={() => setHoveredSection(section.id)}
                              onMouseLeave={() => setHoveredSection(null)}
                              key={`section.id` + 1}>
                              <div
                                className={`absolute top-0 left-[-15px] w-[15px] h-[calc(100vh-183px)] items-center justify-start mx-2 my-1 cursor-pointer py-2 rounded-[15px] space-x-3 text-grayHover ${
                                  hoveredSection === section.id
                                    ? 'opacity-100 transition-all duration-500 ease-in-out delay-200'
                                    : 'opacity-0 transition-all duration-500 ease-in-out delay-200'
                                }`}
                                onClick={() => setShowAddSectionInput(true)}>
                                {hoveredSection === section.id && (
                                  <div className='relative w-0 h-[calc(100vh-200px)]'>
                                    <div className={styles.after}></div>
                                    <div className='absolute top-[50%] left-[-47px] flex flex-row items-center p-1 bg-mainBg'>
                                      <div className='flex mr-1 text-blueTag'>
                                        <Plus />
                                      </div>
                                      <div className='flex text-13 w-[80px] text-blueTag'>
                                        Add section
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {!snapshot.isDraggingOver &&
                            showAddSectionInput &&
                            hoveredSection === section.id && (
                              <div>
                                <div className='flex w-[369px] items-center justify-start px-2 cursor-pointer rounded-[10px] text-grayHover'>
                                  {showAddSectionInput && (
                                    <SectionInputName
                                      project={project}
                                      sectionId={section.id}
                                      showAddSectionInput={() =>
                                        setShowAddSectionInput(false)
                                      }
                                      hoveredSection={() =>
                                        setHoveredSection(null)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                        </>
                      )
                    }

                    return null
                  })}
                  {!snapshot.isDraggingOver && (
                    <div>
                      <div className='flex w-[353px] items-center justify-start mx-2 my-1 cursor-pointer py-2 bg-nav rounded-[15px] space-x-3 text-grayHover hover:bg-navButtonHover'>
                        <div className='ml-5'>
                          <SectionIcon />
                        </div>
                        <div className='text-14 font-bold'>Add section</div>
                      </div>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }

  return (
    <>
      {project ? (
        <div>
          {countAllSectionsTasks(findSectionsFromProject(project.sections)) ===
          0 ? (
            <div className='text-task m-0 p-0 transition-all duration-200 ease-in-out'>
              <InfoBlock location={location.pathname} />
              <p>Project is empty</p>
              <p className='text-gray'>Add tasks to it</p>
            </div>
          ) : (
            <div className='m-0 space-y-0'>
              <div className='sticky top-0 z-[2] bg-mainBg transition-all duration-200 ease-in-out mx-8'>
                <div className='flex w-full'>
                  <SectionProjectName
                    name={project.name}
                    projectId={project.id}
                    noSvg={false}
                    editable={true}
                  />
                </div>
              </div>
              <div className={styles.mainBoards} ref={sectionRef}>
                {renderSections()}
              </div>
            </div>
          )}
          {isShowButton && <ScrollButton sectionRef={sectionRef} />}

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

export default ProjectBoards
