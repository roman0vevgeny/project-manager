// import Suggestion from '@tiptap/suggestion'
// import { Extension } from '@tiptap/core'
// import { PluginKey } from '@tiptap/pm/state'

// const NewPluginKey = new PluginKey('newsuggestion')

// export const Suggestions = Extension.create({
//   name: 'suggestions',
//   pluginKey: NewPluginKey,
//   addOptions: {
//     suggestionClass: 'suggestion',
//     suggestionTag: 'span',
//     command: () => {},
//     items: () => [],
//     render: () => {},
//   },

//   addProseMirrorPlugins() {
//     return [
//       Suggestion({
//         char: '@',
//         suggestionClass: this.options.suggestionClass,
//         suggestionTag: this.options.suggestionTag,
//         command: this.options.command,
//         items: this.options.items,
//         render: this.options.render,
//         range: this.options.range,
//         // render: ({ editor, range }) => {
//         //   const suggestion = editor.state.suggestions.items[range.from]
//         //   return this.options.render({ editor, range, suggestion })
//         // },
//         onEnter: ({ editor, range }) => {
//           editor.commands.insertContent({
//             type: 'mention',
//             attrs: range.props.suggestion,
//           })
//         },
//         onArrowDown: ({ editor, range }) => {
//           editor.commands.selectNextSuggestion()
//         },
//         onArrowUp: ({ editor, range }) => {
//           editor.commands.selectPrevSuggestion()
//         },
//       }),
//     ]
//   },
// })
