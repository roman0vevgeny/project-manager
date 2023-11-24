import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const useRenderList = (items, renderItem, deleteHandler, dragHandler) => {
  //   console.log('items', items)
  items.map((item, index) => {
    // console.log('item.id', item.id)
  })
  return (
    <DragDropContext onDragEnd={dragHandler}>
      <Droppable droppableId={'1'}>
        {(provided, snapshot) => (
          <div
            className='px-1'
            // className={snapshot.isDraggingOver ? '' : ''}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${item.id}`}
                  index={index}>
                  {(provided, snapshot) => (
                    <li
                      className='flex'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      {renderItem(item, snapshot, () =>
                        deleteHandler ? deleteHandler(item) : undefined
                      )}
                    </li>
                  )}
                </Draggable>
              ))
            ) : (
              <p className='text-14 flex px-7 py-[2px] text-grayHover'>
                No items yet
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default useRenderList
