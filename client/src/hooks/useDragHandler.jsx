import { useDispatch } from 'react-redux'

const useDragHandler = (updateOrderAction) => {
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return
    }

    dispatch(
      updateOrderAction({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    )
  }

  return onDragEnd
}

export default useDragHandler
