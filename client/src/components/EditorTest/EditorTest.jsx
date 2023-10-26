import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import styles from './EditorTest.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import BubbleMenuComponent from '../Editor/BubbleMenu/BubbleMenuComponent'
import suggestion from './suggestion'
import { suggestionProjects } from './suggestionProjects.jsx'
import {
  updateTaskDescription,
  // updateTaskDescription,
  updateTaskName,
} from '../../features/tasksSlice.js'
import Link from '@tiptap/extension-link'
import Code from '@tiptap/extension-code'
import Bold from '@tiptap/extension-bold'
import Placeholder from '@tiptap/extension-placeholder'

const TitleEditor = ({ taskDescription, name, users, task }) => {
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects)

  const id = task.id

  const setLink = () => {
    setShowLinkModal(true)
  }

  // const handleEditorKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.stopPropagation()
  //     e.preventDefault()
  //     saveChanges()
  //   }
  // }

  // const saveChanges = () => {
  //   dispatch(
  //     updateTaskName({
  //       id,
  //       name: editor.getHTML() === '<p></p>' ? '' : editor.getHTML(),
  //     })
  //   )
  //   setIsEditable(false)
  // }

  const saveChanges = () => {
    let parent = document.querySelector('.tiptap.ProseMirror')
    let paragraphs = parent.querySelectorAll('p')
    for (let paragraph of paragraphs) {
      let spans = paragraph.querySelectorAll('span')
      for (let span of spans) {
        paragraph.removeChild(span)
      }
    }
    dispatch(
      updateTaskName({
        id: id,
        name: parent.innerHTML === '<p></p>' ? '' : parent.innerHTML,
      })
    )
    dispatch(
      updateTaskDescription({
        id: id,
        name:
          descriptionEditor.getHTML() === '<p></p>'
            ? ''
            : descriptionEditor.getHTML(),
      })
    )
    setIsEditable(false)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        renderLabel: ({ node }) => {
          return `@${node.attrs.label ?? node.attrs.id}`
        },
        suggestion: suggestion(users, id),
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        renderLabel: ({ node }) => {
          return `#${node.attrs.label ?? node.attrs.id}`
        },
        suggestion: suggestionProjects(projects, id),
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'link',
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: 'bold',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'codeBlock',
        },
      }),
      Placeholder.configure({
        showOnlyWhenEditable: false,
        placeholder: 'Enter a title for this task...',
        emptyEditorClass: 'is-editorTitle-empty',
        emptyNodeClass: 'is-emptyTitle',
      }),
    ],
    content: name ? name : '',
  })

  const descriptionEditor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'link',
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: 'bold',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'codeBlock',
        },
      }),
      Placeholder.configure({
        showOnlyWhenEditable: false,
        placeholder: 'Description',
        emptyEditorClass: '.is-editor-empty ',
        emptyNodeClass: '.is-empty ',
      }),
    ],
    content: taskDescription ? taskDescription : '',
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
    if (descriptionEditor) {
      descriptionEditor.setEditable(isEditable)
    }
  }, [isEditable, editor, descriptionEditor])

  if (!editor) {
    return null
  }

  return (
    <div className='w-[500px] font-bold text-20 text-task'>
      <div
        className={isEditable ? styles.container : 'border-1 border-mainBg'}
        onClick={() => setIsEditable(true)}>
        <div>
          <EditorContent editor={editor} />
          <BubbleMenuComponent
            editor={editor}
            setLink={setLink}
            showLinkModal={showLinkModal}
            setShowLinkModal={setShowLinkModal}
          />
        </div>
        <div className='text-14 font-medium text-gray pb-8'>
          <EditorContent editor={descriptionEditor} />
          <BubbleMenuComponent
            editor={descriptionEditor}
            setLink={setLink}
            showLinkModal={showLinkModal}
            setShowLinkModal={setShowLinkModal}
          />
        </div>
      </div>

      {isEditable && (
        <div className='flex mt-2 w-full justify-between'>
          <div></div>
          <div className='flex space-x-2'>
            <button className={styles.saveButton} onClick={saveChanges}>
              Save
            </button>
            <button
              className={styles.saveButton}
              onClick={() => setIsEditable(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const DescriptionEditor = ({ taskDescription }) => {
  const [showLinkModal, setShowLinkModal] = useState(false)

  const setLink = () => {
    setShowLinkModal(true)
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: taskDescription ? taskDescription : '',
  })

  if (!editor) {
    return null
  }

  return (
    <div className='description-editor'>
      <EditorContent editor={editor} />
      <BubbleMenuComponent
        editor={editor}
        setLink={setLink}
        showLinkModal={showLinkModal}
        setShowLinkModal={setShowLinkModal}
      />
    </div>
  )
}

export { TitleEditor, DescriptionEditor }
