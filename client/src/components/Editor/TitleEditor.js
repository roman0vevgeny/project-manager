// import React from 'react'
// // import styles from './TitleEditor.module.scss'
// import StarterKit from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import Bold from '@tiptap/extension-bold'
// import Code from '@tiptap/extension-code'
// import Placeholder from '@tiptap/extension-placeholder'
// import Mention from '@tiptap/extension-mention'
// // import suggestion from './suggestion'
// import Paragraph from '@tiptap/extension-paragraph'
// import { Extension } from '@tiptap/core'
// import { useDispatch } from 'react-redux'
// import { updateTaskUsers } from '../../features/tasksSlice'
// import { ReactRenderer } from '@tiptap/react'
// import tippy from 'tippy.js'

// import MentionList from './MentionList/MentionList'

// // const CustomParagraphTitle = Paragraph.extend({
// //   addKeyboardShortcuts() {
// //     return {
// //       Enter: ({ editor }) => {
// //         if (!editor.isActive('mention')) {
// //           editor.commands.blur()
// //         }
// //       },
// //     }
// //   },
// // })

// const MentionEnter = Extension.create({
//   addKeyboardShortcuts() {
//     return {
//       Enter: ({ editor }) => {
//         if (editor.isActive('mention')) {
//           editor.commands.focus()
//         }
//       },
//     }
//   },
// })

// const DisableEnter = Extension.create({
//   addKeyboardShortcuts() {
//     return {
//       Enter: () => true,
//     }
//   },
// })

// const TitleEditor = (name, id, users) => {
//   console.log('users: ', users)
//   const dispatch = useDispatch()
//   let popup
//   let component
//   return {
//     extensions: [
//       StarterKit,
//       // CustomParagraphTitle,
//       DisableEnter,
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
//       Mention.configure({
//         HTMLAttributes: {
//           class: 'mention',
//         },
//         decorationClass: 'mentionPopup',
//         renderLabel({ options, node }) {
//           console.log('Options:', options)
//           console.log('Node:', node)
//           return `${options.suggestion.char}${
//             node.attrs.label ?? node.attrs.id
//           }`
//         },
//         suggestion: {
//           char: '@',
//           items: async (query) => {
//             console.log('Query:', query)
//             if (typeof query === 'string') {
//               const filteredUsers = users.filter((user) =>
//                 user.name.toLowerCase().startsWith(query.toLowerCase())
//               )
//               console.log('Filtered Users:', filteredUsers)
//               return Promise.resolve(filteredUsers)
//             }
//             return Promise.resolve([])
//           },
//           renderItem(props) {
//             return (
//               <div
//                 className={props.selected ? 'selectedUser' : 'user'}
//                 onClick={props.onClick}>
//                 {props.item.name}
//               </div>
//             )
//           },
//           onSelect(props) {
//             const userId = props.item.id
//             const taskId = props.editor.options.taskId
//             dispatch(updateTaskUsers({ id: taskId, userId: userId }))
//           },
//         },
//         // suggestion: {
//         //   items: (query) =>
//         //     users.filter((user, query) => {
//         //       console.log(user)
//         //       return user.name.startsWith(query)
//         //     }),
//         //   render: () => {
//         //     let component
//         //     let popup

//         //     return {
//         //       onStart: (props) => {
//         //         component = new ReactRenderer(MentionList, {
//         //           props,
//         //           editor: props.editor,
//         //           query: props.query,
//         //         })

//         //         if (!props.clientRect) {
//         //           return
//         //         }

//         //         popup = tippy('body', {
//         //           getReferenceClientRect: props.clientRect,
//         //           appendTo: () => document.body,
//         //           content: component.element,
//         //           showOnCreate: true,
//         //           interactive: true,
//         //           trigger: 'manual',
//         //           placement: 'bottom-start',
//         //         })
//         //       },

//         //       onUpdate(props) {
//         //         component.updateProps(props)

//         //         if (!props.clientRect) {
//         //           return
//         //         }

//         //         popup[0].setProps({
//         //           getReferenceClientRect: props.clientRect,
//         //         })
//         //       },

//         //       onKeyDown(props) {
//         //         if (props.event.key === 'Escape') {
//         //           popup[0].hide()

//         //           return true
//         //         }

//         //         return component.ref?.onKeyDown(props)
//         //       },

//         //       onExit() {
//         //         popup[0].destroy()
//         //         component.destroy()
//         //       },
//         //     }
//         //   },
//         // },

//         // renderLabel({ options, node }) {
//         //   return `${options.suggestion.char}${
//         //     node.attrs.label ?? node.attrs.id
//         //   }`
//         // },
//         // suggestion: {
//         //   items: (query) =>
//         //     users.filter((user) => {
//         //       console.log(user)
//         //       user.name.startsWith(query)
//         //     }),
//         // onSelect({ editor, mention, query }) {
//         //   editor.commands.insertContent(`@${mention.name}`)
//         //   dispatch(updateTaskUsers({ id, mention }))
//         // },
//         // renderItem(props) {
//         //   return (
//         //     <div
//         //       className={props.selected ? styles.selectedUser : ''}
//         //       onClick={props.onClick}>
//         //       {props.item.name}
//         //     </div>
//         //   )
//         // },

//         // onSelect(props) {
//         //   const userId = props.item.id
//         //   const taskId = props.editor.options.taskId
//         //   dispatch(updateTaskUsers({ id: taskId, userId: userId }))
//         // },
//         // },
//         MentionEnter,
//       }),
//       // Placeholder.configure({
//       //   showOnlyWhenEditable: false,
//       //   emptyEditorClass: 'is-editorTitle-empty',
//       //   emptyNodeClass: 'is-emptyTitle',
//       // }),
//     ],
//     content: name ? name : '',
//   }
// }

// export default TitleEditor

// import React, { useEffect, useState, useRef } from 'react'
// import { Editor } from '@tiptap/core' // Изменено на Editor
// import StarterKit from '@tiptap/starter-kit'
// import { useDispatch } from 'react-redux'
// import { updateTaskUsers } from '../../features/tasksSlice'

// function find(haystack, needle) {
//   return String(haystack).toLowerCase().includes(String(needle).toLowerCase())
// }

// function createSuggestionPlugin({
//   char,
//   dataSource,
//   search,
//   limit = 15,
//   nodeType,
//   nodeProps = {},
// }) {
//   return Node.create({
//     name: 'suggestions',

//     addOptions() {
//       return {
//         autocompleteDataSources: {},
//       }
//     },

//     addProseMirrorPlugins() {
//       return [
//         {
//           props: {
//             handleKeyDown(view, event) {
//               if (event.key === 'Escape') {
//                 // Обработчик клавиши "Escape"
//                 // ...
//               }
//               return false
//             },
//           },
//         },
//       ]
//     },

//     addCommands() {
//       return {
//         handleEnter: ({ editor, range, props }) => {
//           editor
//             .chain()
//             .focus()
//             .insertContentAt(range, [
//               { type: nodeType, attrs: props },
//               { type: 'text', text: ' ' },
//             ])
//             .run()
//         },
//       }
//     },

//     addInputRules() {
//       return [
//         // Добавьте inputRules, если нужно
//       ]
//     },
//   })
// }

// const TitleEditor = ({ name, id, users }) => {
//   const dispatch = useDispatch()
//   const editorRef = useRef(null)
//   const [selectedIndex, setSelectedIndex] = useState(0)

//   const selectItem = (index) => {
//     const item = users[index]

//     if (item) {
//       dispatch(updateTaskUsers({ id: id, userId: item.id }))
//     }
//   }

//   const upHandler = () => {
//     setSelectedIndex((selectedIndex + users.length - 1) % users.length)
//   }

//   const downHandler = () => {
//     setSelectedIndex((selectedIndex + 1) % users.length)
//   }

//   const enterHandler = () => {
//     selectItem(selectedIndex)
//   }

//   useEffect(() => {
//     const tiptapEditor = new Editor({
//       content: name ? name : '',
//       extensions: [
//         StarterKit,
//         createSuggestionPlugin({
//           char: '@',
//           dataSource: users,
//           nodeType: 'mention',
//           nodeProps: {},
//           search: (query) => (item) =>
//             item.name.toLowerCase().startsWith(query.toLowerCase()),
//         }),
//       ],
//     })

//     tiptapEditor.mount(editorRef.current)

//     return () => {
//       tiptapEditor.destroy()
//     }
//   }, [name, id, users])

//   return (
//     <div>
//       <div ref={editorRef} />
//     </div>
//   )
// }

// export default TitleEditor

// import React, { useEffect, useState, useRef } from 'react'
// import { Editor } from '@tiptap/core'
// import { useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { createSuggestionPlugin } from './suggestions'
// import SuggestionsDropdown from './SuggestionsDropdown'
// import { useDispatch } from 'react-redux'
// import { updateTaskUsers } from '../../features/tasksSlice'

// const TitleEditor = ({ name, id, users }) => {
//   const dispatch = useDispatch()
//   const editorRef = useRef(null)
//   const tiptapEditor = useEditor({
//     content: name ? name : '',
//     extensions: [
//       StarterKit,
//       createSuggestionPlugin({
//         char: '@',
//         selector: users,
//         nodeType: 'mention',
//         nodeProps: {},
//         search: (query) => (item) =>
//           item.name.toLowerCase().startsWith(query.toLowerCase()),
//         editor: editorRef.current,
//       }),
//     ],
//   })

//   // tiptapEditor.mount(editorRef.current)

//   return (
//     <div>
//       <div ref={editorRef} />
//       <SuggestionsDropdown
//         char='@'
//         nodeType='mention'
//         nodeProps={{}}
//         items={users}
//         command={({ text, ...nodeProps }) => {
//           dispatch(updateTaskUsers({ id: id, userId: nodeProps.id }))
//         }}
//       />
//     </div>
//   )
// }

// export default TitleEditor

// import React from 'react'
// import { MentionLs } from './Mention'
// import { TypeSuggestion } from './TypeSuggestion'
// import { useEditor } from '@tiptap/react'

// const TitleEditor = ({ name, id, users }) => {
//   const editor = useEditor({
//     content: name ? name : '',
//     extensions: [MentionLs, TypeSuggestion],
//     onUpdate({ editor }) {
//       // do something with the editor state
//     },
//   })

//   return <div ref={(element) => editor.setElement(element)} />
// }

// export default TitleEditor

// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import { TypeSuggestion } from './TypeSuggestion'
// import { StarterKit } from '@tiptap/starter-kit'

// const TitleEditor = ({ name }) => {
//   const editor = useEditor({
//     extensions: [StarterKit, TypeSuggestion],
//     content: name ? name : '',
//   })

//   return (
//     <div className='title-editor'>
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default TitleEditor

// import React from 'react'
// // import styles from './TitleEditor.module.scss'
// import StarterKit from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import Bold from '@tiptap/extension-bold'
// import Code from '@tiptap/extension-code'
// import Placeholder from '@tiptap/extension-placeholder'
// import Mention from '@tiptap/extension-mention'
// // import suggestion from './suggestion'
// import Paragraph from '@tiptap/extension-paragraph'
// import { Extension } from '@tiptap/core'
// import { useDispatch } from 'react-redux'
// import { updateTaskUsers } from '../../features/tasksSlice'
// import { ReactRenderer } from '@tiptap/react'
// import tippy from 'tippy.js'

// const TitleEditor = (name, id) => {
//   return {
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
//       // Placeholder.configure({
//       //   showOnlyWhenEditable: false,
//       //   emptyEditorClass: 'is-editorTitle-empty',
//       //   emptyNodeClass: 'is-emptyTitle',
//       // }),
//       Mention.configure({
//         HTMLAttributes: {
//           class: 'mention',
//         },
//         // suggestion,
//       }),
//     ],
//     content: name ? name : '',
//     addKeyboardShortcuts() {
//       return {
//         Enter: () => this.editor.commands.blur(),
//       }
//     },
//   }
// }

// export default TitleEditor
