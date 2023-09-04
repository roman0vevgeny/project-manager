import '@bangle.dev/core/style.css'
import '@bangle.dev/tooltip/style.css'
import '@bangle.dev/react-menu/style.css'
import styles from './Bangle.module.scss'
import { useDispatch } from 'react-redux'
import { updateTaskDescription } from '../../features/tasksSlice'
import React, { useState } from 'react'
import { BangleEditor, useEditorState } from '@bangle.dev/react'
import {
  link,
  bulletList,
  listItem,
  orderedList,
} from '@bangle.dev/base-components'
import {
  StaticMenu,
  Menu,
  BulletListButton,
  OrderedListButton,
  UndoButton,
  RedoButton,
} from '@bangle.dev/react-menu'
import TaskDescription from '../TaskDescription/TaskDescription'

function Bangle({ task }) {
  const [editor, setEditor] = useState()
  const [showEditor, setShowEditor] = useState(false)

  const description = task.description || null
  const dispatch = useDispatch()

  const isEmptyDescription = (description) => {
    return (
      description === '<p><br class="ProseMirror-trailingBreak"></p>' ||
      description === '<br class="ProseMirror-trailingBreak">' ||
      description === ''
    )
  }

  const handleButtonClick = () => {
    setShowEditor(true)
  }

  const handleDescriptionChange = () => {
    const element = document.getElementById('bangle-editor')
    const divElement = element.firstElementChild
    const htmlString = divElement.innerHTML

    let description
    if (isEmptyDescription(htmlString)) {
      description = null
    } else {
      description = htmlString
    }

    dispatch(
      updateTaskDescription({
        id: task.id,
        description: description,
      })
    )
    setShowEditor(false)
  }

  const editorState = useEditorState({
    specs: [
      link.spec({ openOnClick: true }),
      orderedList.spec(),
      bulletList.spec(),
      listItem.spec(),
    ],
    plugins: () => [
      link.plugins(),
      orderedList.plugins(),
      bulletList.plugins(),
      listItem.plugins(),
    ],
    initialValue: description,
  })

  return (
    <>
      {showEditor && !task.checked && (
        <div className={styles.main}>
          <BangleEditor
            state={editorState}
            id='bangle-editor'
            onReady={(editor) => {
              setEditor(editor)
            }}
          />
          {task.checked ? null : (
            <StaticMenu
              editor={editor}
              tooltipRender={() => null}
              renderMenu={() => (
                <Menu>
                  <div className='flex space-x-1 rounded-[6px]'>
                    <BulletListButton />
                    <OrderedListButton />
                  </div>
                  <div className='flex flex-grow ml-[5px]'>
                    <button
                      className={styles.button}
                      onClick={handleDescriptionChange}>
                      Save
                    </button>
                  </div>
                </Menu>
              )}
            />
          )}
        </div>
      )}
      {!showEditor && !task.checked && description === null && (
        <button className={styles.buttonOpen} onClick={handleButtonClick}>
          + Add a description
        </button>
      )}
      {description !== null &&
        description !== '' &&
        !showEditor &&
        (task.checked ? (
          <div className='pl-2 cursor-pointer w-full pr-1 pt-[3px]'>
            <TaskDescription description={description} width={true} />
          </div>
        ) : (
          <div
            className='pl-2 cursor-pointer w-full pr-1 pt-[3px]'
            onClick={handleButtonClick}>
            <TaskDescription description={description} width={true} />
          </div>
        ))}
    </>
  )
}

export default Bangle
