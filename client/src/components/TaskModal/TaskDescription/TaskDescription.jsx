import React from 'react'
// import Bangle from '../../TextEditor/Bangle'
// import EditorTipTapMain from '../../Editor/EditorTipTapMain/EditorTipTapMain'
// import Editor from '../../Editor/Editor'
import { DescriptionEditor, TitleEditor } from '../../EditorTest/EditorTest'
// import { EditorState } from '@tiptap/pm/state'

const TaskDescription = ({ task, users, projects }) => {
  return (
    <div className='flex flex-col justify-between mx-2 items-start my-2 w-full'>
      <TitleEditor
        task={task}
        name={task.name}
        users={users}
        projects={projects}
        taskDescription={task.description}
      />
      {/* <DescriptionEditor taskDescription={task.description} id={task.id} /> */}
    </div>
  )
}

export default TaskDescription
