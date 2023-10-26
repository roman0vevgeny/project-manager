// import React, { useState } from 'react'
// import styles from './Editor.module.scss'
// import { useDispatch } from 'react-redux'
// import {
//   updateTaskDescription,
//   updateTaskName,
// } from '../../features/tasksSlice.js'
// import EditorWrapper from './EditorWrapper'
// import { useEditor } from '@tiptap/react'
// import { StarterKit } from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import Code from '@tiptap/extension-code'
// import Bold from '@tiptap/extension-bold'
// import Mention from '@tiptap/extension-mention'
// import Placeholder from '@tiptap/extension-placeholder'
// import useEditorState from '../../hooks/useEditorState'
// import { Extension } from '@tiptap/core'

// const Editor = ({ taskDescription, id, name, users }) => {
//   const [isEditable, setIsEditable] = useState(false)
//   const [showLinkModal, setShowLinkModal] = useState(false)
//   const dispatch = useDispatch()

//   const titleEditor = useEditor({
//     extensions: [
//       StarterKit,
//       // CustomParagraphTitle,
//       Link.configure({
//         openOnClick: true,
//         HTMLAttributes: {
//           class: 'link',
//         },
//       }),
//       Bold.configure({
//         HTMLAttributes: {
//           class: 'bold',
//         },
//       }),
//       Code.configure({
//         HTMLAttributes: {
//           class: 'codeBlock',
//         },
//       }),
//       Placeholder.configure({
//         showOnlyWhenEditable: false,
//         emptyEditorClass: 'is-editorTitle-empty',
//         emptyNodeClass: 'is-emptyTitle',
//       }),
//       Mention.configure({
//         HTMLAttributes: {
//           class: 'mention',
//         },
//         // suggestion,
//       }),
//     ],
//     content: name ? name : '',
//   })

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       // CustomParagraph,
//       Link.configure({
//         openOnClick: true,
//         HTMLAttributes: {
//           class: 'link',
//         },
//       }),
//       Bold.configure({
//         HTMLAttributes: {
//           class: 'bold',
//         },
//       }),
//       Code.configure({
//         HTMLAttributes: {
//           class: 'codeBlock',
//         },
//       }),
//       Placeholder.configure({
//         showOnlyWhenEditable: false,
//         emptyEditorClass: 'is-editor-empty',
//         emptyNodeClass: 'is-empty',
//       }),
//     ],
//     content: taskDescription ? taskDescription : '',
//   })

//   const setLink = () => {
//     setShowLinkModal(true)
//   }

//   const handleEditorKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.stopPropagation()
//       e.preventDefault()
//       saveChanges()
//     }
//   }

//   const saveChanges = () => {
//     dispatch(
//       updateTaskDescription({
//         id,
//         description: editor.getHTML() === '<p></p>' ? '' : editor.getHTML(),
//       })
//     )
//     dispatch(
//       updateTaskName({
//         id,
//         name: titleEditor.getHTML() === '<p></p>' ? '' : titleEditor.getHTML(),
//       })
//     )
//     setIsEditable(false)
//   }

//   if (!editor) {
//     return null
//   }

//   return (
//     <>
//       <div className={isEditable ? styles.container : 'border-1 border-mainBg'}>
//         <EditorWrapper
//           editor={titleEditor}
//           className={isEditable ? styles.textActiveBig : styles.textBig}
//           onClick={() => setIsEditable(true)}
//           onKeyDown={handleEditorKeyDown}
//           setLink={setLink}
//           users={users}
//           showLinkModal={showLinkModal}
//           setShowLinkModal={setShowLinkModal}
//         />
//         <EditorWrapper
//           editor={editor}
//           className={isEditable ? styles.textActive : styles.text}
//           onClick={() => setIsEditable(true)}
//           setLink={setLink}
//           users={users}
//           showLinkModal={showLinkModal}
//           setShowLinkModal={setShowLinkModal}
//         />
//       </div>
//       {isEditable && (
//         <div className='flex mt-2 w-full justify-between'>
//           <div></div>
//           <div className='flex space-x-2 mr-4'>
//             <button className={styles.saveButton} onClick={saveChanges}>
//               Save
//             </button>
//             <button
//               className={styles.saveButton}
//               onClick={() => setIsEditable(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// const Editor = ({ taskDescription, id, name }) => {
//   const dispatch = useDispatch()
//   const [
//     editor,
//     titleEditor,
//     isEditable,
//     setIsEditable,
//     showLinkModal,
//     setShowLinkModal,
//   ] = useEditorState(name, taskDescription, id)

//   const setLink = () => {
//     setShowLinkModal(true)
//   }

//   const handleEditorKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.stopPropagation()
//       e.preventDefault()
//       saveChanges()
//     }
//   }

//   const saveChanges = () => {
//     dispatch(
//       updateTaskDescription({
//         id,
//         description: editor.getHTML() === '<p></p>' ? '' : editor.getHTML(),
//       })
//     )
//     dispatch(
//       updateTaskName({
//         id,
//         name: titleEditor.getHTML() === '<p></p>' ? '' : titleEditor.getHTML(),
//       })
//     )
//     setIsEditable(false)
//   }

//   // if (!editor) {
//   //   return null
//   // }

//   return (
//     <>
//       <div className={isEditable ? styles.container : 'border-1 border-mainBg'}>
//         <EditorWrapper
//           editor={titleEditor}
//           className={isEditable ? styles.textActiveBig : styles.textBig}
//           onClick={() => setIsEditable(true)}
//           onKeyDown={() => handleEditorKeyDown()}
//           setLink={setLink}
//         />
//         <EditorWrapper
//           editor={editor}
//           className={isEditable ? styles.textActive : styles.text}
//           onClick={() => setIsEditable(true)}
//           setLink={setLink}
//         />
//       </div>
//       {isEditable && (
//         <div className='flex mt-2 w-full justify-between'>
//           <div></div>
//           <div className='flex space-x-2 mr-4'>
//             <button className={styles.saveButton} onClick={saveChanges}>
//               Save
//             </button>
//             <button
//               className={styles.saveButton}
//               onClick={() => setIsEditable(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Editor
