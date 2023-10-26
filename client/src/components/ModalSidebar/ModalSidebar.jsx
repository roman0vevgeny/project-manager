import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTaskExpirationDate,
  updateTaskProjects,
  updateTaskTags,
  setTaskPriority,
  updateTaskStatus,
  updateTaskDocuments,
  updateTaskUsers,
  removeTaskFromUser,
} from '../../features/tasksSlice'
import {
  updateDoneTasksInProject,
  updateTodoTasksInProject,
  updateProgressTasksInProject,
} from '../../features/projectSlice'
import { selectTaskById } from '../../helpers/selectTaskById'
import { selectUserById } from '../../helpers/selectUserById'
import ModalMenuButton from '../Button/ModalMenuButton'
import DropdownModal from '../Dropdown/DropdownModal'
import Calend from '../TaskModal/Calend/Calend'
import TagForm from '../TaskModal/TagForm/TagForm'
import PriorityBlock from '../TaskModal/PriorityBlock/PriorityBlock'
import StatusBlock from '../TaskModal/StatusBlock/StatusBlock'
import DocumentForm from '../TaskModal/DocumentForm/DocumentForm'
import DeligateBlock from '../TaskModal/DeligateBlock/DeligateBlock'
import ProjectForm from '../TaskModal/ProjectForm/ProjectForm'
import Folder from '../svgs/Folder'
import Cal from '../svgs/Cal'
import TagSvg from '../svgs/TagSvg'
import Priority from '../svgs/Priority'
import Status from '../svgs/Status'
import Drive from '../svgs/Drive'
import Deligate from '../svgs/Deligate'
import Contacts from '../svgs/Contacts'
import Coins from '../svgs/Coins'

const ModalSidebar = () => {
  const dispatch = useDispatch()

  return (
    <>
      <div className={styles.verticalDevider}></div>
      <div className='pl-1 pr-1 mb-2 py-2 rounded-[10px]'>
        <div>
          <div className='relative flex flex-row'>
            <ModalMenuButton
              svgLeft={<Folder />}
              children={'Add project'}
              onClick={handleOpenProjectModal}
              onClose={handleCloseProjectModal}
            />
            <DropdownModal
              children={
                <ProjectForm
                  value={projects}
                  onChange={(newProjects) =>
                    dispatch(
                      updateTaskProjects({
                        id: task.id,
                        projects: newProjects,
                      })
                    )
                  }
                  isNewTask={false}
                  handleProjectSelect={handleProjectSelect}
                  taskId={id}
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
                task.expirationDate && task.expirationDate.slice(0, -1)
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
                    dispatch(updateTaskTags({ id: task.id, tags: newTags }))
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
                task.priority ? `Priority: ${task.priority}` : 'Set priority'
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
              svgLeft={<Status />}
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
                task.users &&
                `Deligated to: ${selectUserById(users, task.users) || ''}`
              }
              onClick={handleOpenDeligateModal}
              onClose={handleCloseDeligateModal}
            />
            <DropdownModal
              children={
                <DeligateBlock
                  users={users}
                  task={task}
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
  )
}

export default ModalSidebar
