// import { Node, ReactRenderer } from '@tiptap/react'
// import Suggestion, { SuggestionPluginKey } from '@tiptap/suggestion'
// import { PluginKey } from '@tiptap/pm/state'
// import tippy from 'tippy.js'
// // import { EditorFormat, TipTapEditorFormat } from '../const'
// import { TypeList } from './TypeList'

// export const TypeSuggestionPluginKey = new PluginKey('suggestion1')
// console.log('plugin key TypeSuggestionPluginKey: ', TypeSuggestionPluginKey)

// const SUGGESTION_CHAR = '/'

// function isNotEmptyLine(editor) {
//   const chunks =
//     editor.view.state.selection.$head.parent.textContent.split(SUGGESTION_CHAR)
//   return chunks.length > 2 || chunks[0].trim().length
// }

// export const TypeSuggestion = Node.create({
//   name: 'type-suggestion',
//   group: 'inline',
//   inline: true,
//   selectable: false,
//   atom: true,

//   addProseMirrorPlugins() {
//     return [
//       Suggestion({
//         char: SUGGESTION_CHAR,
//         pluginKey: TypeSuggestionPluginKey,
//         command: ({ editor, range, props }) => {
//           const selectedType = editor

//           if (isNotEmptyLine(editor)) {
//             editor
//               .chain()
//               .insertContentAt(range, selectedType)
//               .focus(range.to)
//               .run()
//           } else {
//             editor
//               .chain()
//               .deleteRange(range)
//               .insertContent(selectedType)
//               .focus(range.to)
//               .run()
//           }
//           window.getSelection().collapseToEnd()
//         },
//         allow: ({ state, range }) => {
//           const $from = state.doc.resolve(range.from)
//           const type = state.schema.nodes[this.name]
//           return !!$from.parent.type.contentMatch.matchType(type)
//         },
//         editor: this.editor,
//         items: ({ query, editor }) => {
//           return Object.values(EditorFormat).filter((item) =>
//             item.toLowerCase().startsWith(query.toLowerCase())
//           )
//         },
//         render: () => {
//           let component
//           let popup

//           return {
//             onStart: (props) => {
//               component = new ReactRenderer(TypeList, {
//                 props,
//                 editor: props.editor,
//               })

//               if (!props.clientRect) {
//                 return
//               }

//               popup = tippy('body', {
//                 getReferenceClientRect: props.clientRect,
//                 appendTo: () => document.body,
//                 content: component.element,
//                 showOnCreate: true,
//                 interactive: true,
//                 trigger: 'manual',
//                 placement: 'bottom-start',
//               })
//             },

//             onUpdate(props) {
//               component.updateProps(props)

//               if (!props.clientRect) {
//                 return
//               }

//               popup[0].setProps({
//                 getReferenceClientRect: props.clientRect,
//               })
//             },

//             onKeyDown(props) {
//               if (props.event.key === 'Escape') {
//                 popup[0].hide()

//                 return true
//               }

//               return component.ref?.onKeyDown(props)
//             },

//             onExit() {
//               popup[0].destroy()
//               component.destroy()
//             },
//           }
//         },
//       }),
//     ]
//   },
// })
