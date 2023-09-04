import React from 'react'
import Bangle from '../../TextEditor/Bangle'

const TaskDescription = ({ task }) => {
  return (
    <div className='flex flex-col justify-between mx-2 items-start my-2 w-full'>
      <Bangle task={task} />
    </div>
  )
}

export default TaskDescription
