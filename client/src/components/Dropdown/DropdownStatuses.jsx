import React from 'react'
import Dropdown from './Dropdown'
import { updateStatusesOrder, deleteStatus } from '../../features/statusSlice'
import useDeleteHandler from '../../hooks/useDeleteHandler'
import useDragHandler from '../../hooks/useDragHandler'
import useToggle from '../../hooks/useToggle'
import useRenderList from '../../hooks/useRenderList'
import { useSelector } from 'react-redux'
import StatusDraggable from '../Status/StatusDraggable'

const DropdownStatuses = ({ children, svg }) => {
  const { isOpen, isRotated, toggleDropdown, toggleRotation } = useToggle()
  const handleDeleteStatus = useDeleteHandler(deleteStatus, 'statuses')
  const onDragEnd = useDragHandler(updateStatusesOrder)
  const statuses = useSelector((state) => state.statuses)
  // console.log('statuses from DropdownStatuses: ', statuses)

  const renderStatus = (status, snapshot) => (
    <div className='w-full'>
      <StatusDraggable
        status={status}
        onDelete={() => handleDeleteStatus(status)}
        isDragging={snapshot.isDragging}
      />
    </div>
  )

  const renderList = useRenderList(
    statuses,
    renderStatus,
    handleDeleteStatus,
    onDragEnd
  )

  return (
    <>
      <Dropdown
        isOpen={isOpen}
        isRotated={isRotated}
        toggleDropdown={toggleDropdown}
        toggleRotation={toggleRotation}
        onDragEnd={onDragEnd}
        renderList={renderList}
        button={'Add status'}
        svg={svg}>
        {children}
      </Dropdown>
    </>
  )
}

export default DropdownStatuses
