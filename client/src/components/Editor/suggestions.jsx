// import React from 'react'
// import { Suggestion } from '@tiptap/suggestion'
// import { Plugin, PluginKey } from '@tiptap/pm/state'
// import tippy from 'tippy.js'
// import SuggestionsDropdown from './SuggestionsDropdown'
// import { useSelector } from 'react-redux'

// function find(haystack, needle) {
//   return haystack.toLowerCase().includes(needle.toLowerCase())
// }

// export function createSuggestionPlugin({
//   editor,
//   char,
//   selector,
//   search,
//   limit = 15,
//   nodeType,
//   nodeProps = {},
// }) {
//   const data = useSelector((state) => state.tasks.selector)
//   console.log('createSuggestionPlugin - data:', data)
//   console.log('createSuggestionPlugin - nodeType:', nodeType)
//   console.log('createSuggestionPlugin - nodeProps:', nodeProps)
//   console.log('createSuggestionPlugin - char:', char)
//   console.log('createSuggestionPlugin - search:', search)
//   console.log('createSuggestionPlugin - limit:', limit)
//   console.log('createSuggestionPlugin - selector:', selector)

//   return new Suggestion({
//     editor,
//     char,
//     pluginKey: new PluginKey(`suggestions-${char}-description`),

//     command: ({ editor: tiptapEditor, range, props }) => {
//       tiptapEditor
//         .chain()
//         .focus() // needed to make the editor call `onExit` before the suggestion is inserted
//         .insertContentAt(range, [
//           { type: nodeType, attrs: props },
//           { type: 'text', text: ' ' },
//         ])
//         .run()
//     },

//     async items({ query }) {
//       if (!selector) return []

//       try {
//         const items = data

//         return items.filter(search(query)).slice(0, limit)
//       } catch {
//         return []
//       }
//     },

//     render: () => {
//       let component
//       let popup

//       const onUpdate = (props) => {
//         component?.updateProps({ ...props, loading: false })

//         if (!props.clientRect) return

//         popup?.[0].setProps({
//           getReferenceClientRect: props.clientRect,
//         })
//       }

//       return {
//         onBeforeStart: (props) => {
//           component = (
//             <SuggestionsDropdown
//               {...props}
//               char={char}
//               nodeType={nodeType}
//               nodeProps={nodeProps}
//               loading={true}
//               editor={props.editor}
//             />
//           )

//           if (!props.clientRect) {
//             return
//           }

//           popup = tippy('body', {
//             getReferenceClientRect: props.clientRect,
//             appendTo: () => document.body,
//             content: component,
//             showOnCreate: true,
//             interactive: true,
//             trigger: 'manual',
//             placement: 'bottom-start',
//           })
//         },

//         onStart: onUpdate,
//         onUpdate,

//         onKeyDown(props) {
//           if (props.event.key === 'Escape') {
//             popup?.[0].hide()

//             return true
//           }

//           return component?.ref?.onKeyDown(props)
//         },

//         onExit() {
//           popup?.[0].destroy()
//           component = null
//         },
//       }
//     },
//   })
// }

// // function SuggestionsNode() {
// //   useEffect(() => {
// //     initEmojiMap()
// //   }, [])

// //   return null
// // }

// // export default SuggestionsNode
