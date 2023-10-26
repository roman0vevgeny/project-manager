// import { ReactRenderer } from '@tiptap/react'
// // import { MentionOptions } from '@tiptap/suggestion'
// import tippy from 'tippy.js'
// import MentionList from './MentionList/MentionList'

// export const MentionSuggestion = {
//   char: '@',

//   items: ({ query }) => {
//     return mentionItems.filter((item) =>
//       item.label.toLowerCase().startsWith(query.toLowerCase())
//     )
//   },

//   // Эта функция определяет, как будет отображаться подсказка
//   // Вы можете использовать любую библиотеку для создания всплывающих окон, например tippy.js
//   // Вы также можете использовать свой собственный компонент React для рендеринга списка элементов
//   render: () => {
//     let component

//     return {
//       onStart: (props) => {
//         component = new ReactRenderer(MentionList, {
//           props,
//           editor: props.editor,
//         })

//         if (!props.clientRect) {
//           return
//         }

//         tippy('body', {
//           getReferenceClientRect: props.clientRect,
//           appendTo: () => document.body,
//           content: component.element,
//           showOnCreate: true,
//           interactive: true,
//           trigger: 'manual',
//           placement: 'bottom-start',
//         })
//       },

//       onUpdate(props) {
//         component.updateProps(props)

//         if (!props.clientRect) {
//           return
//         }

//         tippy('body', {
//           getReferenceClientRect: props.clientRect,
//         })
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           tippy('body').hide()

//           return true
//         }

//         return component.ref?.onKeyDown(props)
//       },

//       onExit() {
//         tippy('body').destroy()
//         component.destroy()
//       },
//     }
//   },
// }
