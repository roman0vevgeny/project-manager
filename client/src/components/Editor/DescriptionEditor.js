// import StarterKit from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import Bold from '@tiptap/extension-bold'
// import Code from '@tiptap/extension-code'
// import Placeholder from '@tiptap/extension-placeholder'
// import { Extension } from '@tiptap/core'
// import Paragraph from '@tiptap/extension-paragraph'

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

// const DescriptionEditor = (taskDescription, id, mentionExtension) => {
//   return {
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
//   }
// }

// export default DescriptionEditor

// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// // import { TypeSuggestion } from './TypeSuggestion'
// import { StarterKit } from '@tiptap/starter-kit'

// const DescriptionEditor = ({ taskDescription, id }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: taskDescription ? taskDescription : '',
//     editorProps: {
//       attributes: {
//         id,
//       },
//     },
//   })

//   console.log('DescriptionEditor instance:', editor)
//   console.log('DescriptionEditor id:', id)

//   return (
//     <div className='description-editor'>
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default DescriptionEditor
