// import { useDispatch, useSelector } from 'react-redux'

// const useDeleteHandler = (deleteAction, updateAction) => {
//   const dispatch = useDispatch()
//   const tasks = useSelector((state) => state.tasks.tasks)

//   const handleDelete = (item) => {
//     const findTasks = tasks.filter((task) =>
//       task[updateAction].includes(item.id)
//     )
//     for (let task of findTasks) {
//       const newItems = task[updateAction].filter((itemId) => itemId !== item.id)
//       dispatch({
//         type: `updateTask${updateAction}`,
//         payload: { id: task.id, [updateAction]: newItems },
//       })
//     }
//     dispatch(deleteAction(item.id))
//   }

//   return handleDelete
// }

// export default useDeleteHandler

import { useDispatch, useSelector } from 'react-redux'

const useDeleteHandler = (deleteAction, updateAction) => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)

  const handleDelete = (item) => {
    const findTasks = tasks.filter((task) =>
      task[updateAction]?.includes(item.id)
    )
    for (let task of findTasks) {
      const newItems = task[updateAction]?.filter(
        (itemId) => itemId !== item.id
      )
      dispatch({
        type: `updateTask${updateAction}`,
        payload: { id: task.id, [updateAction]: newItems },
      })
    }

    // Проверяем, есть ли действие для удаления
    if (deleteAction) {
      dispatch(deleteAction(item.id))
    } else {
      console.error(`No delete action provided for ${updateAction}`)
    }
  }

  return handleDelete
}

export default useDeleteHandler
