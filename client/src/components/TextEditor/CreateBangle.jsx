import '@bangle.dev/core/style.css'
import '@bangle.dev/tooltip/style.css'
import '@bangle.dev/react-menu/style.css'
import styles from './Bangle.module.scss'
import React, { useState, useEffect } from 'react'
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
} from '@bangle.dev/react-menu'
import TaskDescription from '../TaskDescription/TaskDescription'

function CreateBangle({ description, setDescription }) {
  const [editor, setEditor] = useState()
  const [showEditor, setShowEditor] = useState(false)
  const [localDescription, setLocalDescription] = useState(description)
  console.log('localDescription: ', localDescription)

  const isEmptyDescription = (localDescription) => {
    console.log('isEmptyDescription: ', localDescription)
    return (
      localDescription === '<p><br class="ProseMirror-trailingBreak"></p>' ||
      localDescription === '<br class="ProseMirror-trailingBreak">' ||
      localDescription === ''
    )
  }

  const handleButtonClick = () => {
    setShowEditor(true)
  }

  const handleDescriptionChange = () => {
    const element = document.getElementById('bangle-editor')
    const divElement = element.firstElementChild
    const htmlString = divElement.innerHTML
    console.log('htmlString: ', htmlString)

    let localDescription
    if (isEmptyDescription(htmlString)) {
      setLocalDescription('')
    } else {
      setLocalDescription(htmlString)
    }
    setDescription(localDescription)
    console.log('setDescription: ', localDescription)
    setShowEditor(false)
  }

  useEffect(() => {
    console.log('description: ', description)
    if (description !== localDescription) {
      setDescription(localDescription)
    }
  }, [localDescription])

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
    initialValue: description !== '' ? description : localDescription,
  })

  return (
    <div className='flex flex-col justify-between mx-2 items-start my-2 w-full'>
      {showEditor && (
        <div className={styles.main}>
          <BangleEditor
            state={editorState}
            id='bangle-editor'
            onReady={(editor) => {
              setEditor(editor)
            }}
          />
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
        </div>
      )}
      {!showEditor && (description === '' || localDescription === '') && (
        <button className={styles.buttonOpen} onClick={handleButtonClick}>
          + Add a description
        </button>
      )}
      {description !== '' && localDescription !== '' && !showEditor && (
        <div
          className='pl-2 cursor-pointer w-full pr-1 pt-[3px]'
          onClick={handleButtonClick}>
          <TaskDescription description={description} width={true} />
        </div>
      )}
    </div>
  )
}

export default CreateBangle
