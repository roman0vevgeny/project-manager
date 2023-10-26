// import styles from './EditorTipTapMain.module.scss'
// import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import React, { useState, useEffect, useCallback } from 'react'
// import Link from '@tiptap/extension-link'
// import Code from '@tiptap/extension-code'
// import Bold from '@tiptap/extension-bold'
// import { Extension } from '@tiptap/core'
// import Paragraph from '@tiptap/extension-paragraph'
// import Placeholder from '@tiptap/extension-placeholder'
// import Mention from '@tiptap/extension-mention'
// import { useDispatch } from 'react-redux'
// import {
//   updateTaskDescription,
//   updateTaskName,
// } from '../../../features/tasksSlice'
// import {
//   Bold as BoldIcon,
//   Italic,
//   Strike,
//   Code as CodeIcon,
//   Link as LinkIcon,
//   UnLink,
// } from '../UI/Icons'
// import LinkModal from './LinkModal.jsx'
// import suggestion from '../suggestion'

// const CustomParagraph = Extension.create({
//   name: 'customParagraph',
//   addExtensions() {
//     return [
//       Paragraph.extend({
//         addKeyboardShortcuts() {
//           return {
//             Enter: () => {
//               this.editor.commands.insertContent('<br>')
//               return true
//             },
//           }
//         },
//       }),
//     ]
//   },
// })

// const EditorTipTapMain = ({ taskDescription, id, name, users }) => {
//   const [isEditable, setIsEditable] = useState(false)
//   const [showLinkModal, setShowLinkModal] = useState(false)
//   const dispatch = useDispatch()
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       CustomParagraph,
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

//   const CustomParagraphTitle = Paragraph.extend({
//     addKeyboardShortcuts() {
//       return {
//         Enter: () => this.editor.commands.blur(),
//       }
//     },
//   })

//   const titleEditor = useEditor({
//     extensions: [
//       StarterKit,
//       CustomParagraphTitle,
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
//         suggestion,
//       }),
//       // renderLabel({ options, node }) {
//       //   return `${options.suggestion.char}${
//       //     node.attrs.label ?? node.attrs.id
//       //   }`
//       // },
//       // suggestion: {
//       //   items: users,
//       //   renderItem(props) {
//       //     return (
//       //       <div
//       //         className={props.selected ? styles.selectedUser : ''}
//       //         onClick={props.onClick}>
//       //         {props.item.name}
//       //       </div>
//       //     )
//       //   },

//       //   onSelect(props) {
//       //     const userId = props.item.id
//       //     const taskId = props.editor.options.taskId
//       //     dispatch(updateTaskUsers({ id: taskId, userId: userId }))
//       //   },
//       // },
//       // }),
//     ],
//     content: name ? name : '',
//   })

//   const setLink = useCallback(() => {
//     console.log('setLink')
//     setShowLinkModal(true)
//     console.log('showLinkModal: ', showLinkModal)
//   }, [editor])

//   useEffect(() => {
//     if (editor) {
//       editor.setEditable(isEditable)
//     }
//   }, [isEditable, editor])

//   return (
//     <>
//       <div className={isEditable ? styles.container : 'border-1 border-mainBg'}>
//         {editor && (
//           <div className='relative p-0 w-full'>
//             <BubbleMenu
//               editor={editor}
//               tippyOptions={{ duration: 100 }}
//               className={styles.menu}>
//               <button
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 className={
//                   editor.isActive('bold') ? styles.isActive : styles.menuButton
//                 }>
//                 {BoldIcon()}
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//                 className={
//                   editor.isActive('italic')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {Italic()}
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleStrike().run()}
//                 className={
//                   editor.isActive('strike')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {Strike()}
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleCode().run()}
//                 className={
//                   editor.isActive('code') ? styles.isActive : styles.menuButton
//                 }>
//                 {CodeIcon()}
//               </button>
//               <button
//                 onClick={setLink}
//                 className={
//                   editor.isActive('link') ? styles.isActive : styles.menuButton
//                 }>
//                 {LinkIcon()}
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().unsetLink().run()}
//                 disabled={!editor.isActive('link')}
//                 className={
//                   editor.isActive('link') ? styles.isActive : styles.menuButton
//                 }>
//                 {UnLink()}
//               </button>
//               {showLinkModal && (
//                 <div className='absolute top-0 -left-1'>
//                   <LinkModal
//                     editor={editor}
//                     show={showLinkModal}
//                     href={editor.getAttributes('link').href}
//                     onClose={() => setShowLinkModal(false)}
//                     onConfirm={(url) => {
//                       if (url === '') {
//                         editor
//                           .chain()
//                           .focus()
//                           .extendMarkRange('link')
//                           .unsetLink()
//                           .run()
//                         return
//                       }
//                       editor
//                         .chain()
//                         .focus()
//                         .extendMarkRange('link')
//                         .setLink({ href: url })
//                         .run()
//                     }}
//                     onCancel={() => {}}
//                   />
//                 </div>
//               )}
//             </BubbleMenu>
//           </div>
//         )}
//         {titleEditor && (
//           <div className='relative p-0 w-full'>
//             <BubbleMenu
//               editor={titleEditor}
//               tippyOptions={{ duration: 100 }}
//               className={styles.menu}>
//               <button
//                 onClick={() => titleEditor.chain().focus().toggleItalic().run()}
//                 className={
//                   editor.isActive('italic')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {Italic()}
//               </button>
//               <button
//                 onClick={() => titleEditor.chain().focus().toggleStrike().run()}
//                 className={
//                   editor.isActive('strike')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {Strike()}
//               </button>
//               <button
//                 onClick={() => titleEditor.chain().focus().toggleCode().run()}
//                 className={
//                   editor.isActive('code') ? styles.isActive : styles.menuButton
//                 }>
//                 {CodeIcon()}
//               </button>
//               <button
//                 onClick={setLink}
//                 className={
//                   titleEditor.isActive('link')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {LinkIcon()}
//               </button>
//               <button
//                 onClick={() => titleEditor.chain().focus().unsetLink().run()}
//                 disabled={!titleEditor.isActive('link')}
//                 className={
//                   titleEditor.isActive('link')
//                     ? styles.isActive
//                     : styles.menuButton
//                 }>
//                 {UnLink()}
//               </button>
//               {showLinkModal && (
//                 <div className='absolute top-0 -left-1'>
//                   <LinkModal
//                     editor={titleEditor}
//                     show={showLinkModal}
//                     href={titleEditor.getAttributes('link').href}
//                     onClose={() => setShowLinkModal(false)}
//                     onConfirm={(url) => {
//                       if (url === '') {
//                         titleEditor
//                           .chain()
//                           .focus()
//                           .extendMarkRange('link')
//                           .unsetLink()
//                           .run()
//                         return
//                       }
//                       titleEditor
//                         .chain()
//                         .focus()
//                         .extendMarkRange('link')
//                         .setLink({ href: url })
//                         .run()
//                     }}
//                     onCancel={() => {}}
//                   />
//                 </div>
//               )}
//             </BubbleMenu>
//           </div>
//         )}
//         <EditorContent
//           editor={titleEditor}
//           className={isEditable ? styles.textActiveBig : styles.textBig}
//           onClick={() => setIsEditable(true)}
//         />
//         <EditorContent
//           editor={editor}
//           className={isEditable ? styles.textActive : styles.text}
//           onClick={() => setIsEditable(true)}
//         />
//       </div>
//       {isEditable && (
//         <div className='flex mt-2 w-full justify-between'>
//           <div></div>
//           <div className='flex space-x-2 mr-4'>
//             <button
//               className={styles.saveButton}
//               onClick={() => {
//                 dispatch(
//                   updateTaskDescription({
//                     id,
//                     description:
//                       editor.getHTML() === '<p></p>' ? '' : editor.getHTML(),
//                   })
//                 )
//                 dispatch(
//                   updateTaskName({
//                     id,
//                     name:
//                       titleEditor.getHTML() === '<p></p>'
//                         ? ''
//                         : titleEditor.getHTML(),
//                   })
//                 )
//                 setIsEditable(false)
//               }}>
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

// export default EditorTipTapMain
