// import { Extension } from '@tiptap/core'
// import Paragraph from '@tiptap/extension-paragraph'
// import Mention from '@tiptap/extension-mention'
// // import suggestions from './suggestions.js'

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

// const createMentionExtension = (users) => {
//   return Mention.configure({
//     HTMLAttributes: {
//       class: 'styles.mention',
//     },
//     renderLabel({ options, node }) {
//       return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
//     },
//     suggestion: {
//       items: users,
//       renderItem(props) {
//         return (
//           <div
//             className={props.selected ? styles.selectedUser : ''}
//             onClick={props.onClick}>
//             {props.item.name}
//           </div>
//         )
//       },

//       onSelect(props) {
//         const userId = props.item.id
//         const taskId = props.editor.options.taskId
//         // dispatch(updateTaskUsers({ id: taskId, userId: userId }))
//       },
//     },
//   })
// }

// export default createMentionExtension
