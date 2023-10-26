// // Импортируем необходимые библиотеки
// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { Extension, Suggestion } from '@tiptap/core'
// import { useSelector } from 'react-redux'

// // Создаем собственное расширение для упоминаний
// const CustomMention = Extension.create({
//   // Определяем имя расширения
//   name: 'customMention',

//   // Определяем параметры расширения
//   defaultOptions: {
//     HTMLAttributes: {
//       'class': 'mention',
//       'data-mention': '',
//     },
//     char: '@',
//     suggestionClass: 'suggestion',
//   },

//   // Определяем методы расширения
//   addCommands() {
//     return {
//       insertMention:
//         ({ id, label }) =>
//         ({ commands }) => {
//           // Вставляем упоминание в текст с атрибутами
//           return commands.insertContent({
//             type: this.name,
//             attrs: {
//               id,
//               label,
//             },
//           })
//         },
//     }
//   },

//   // Определяем правила парсинга HTML
//   parseHTML() {
//     return [
//       {
//         tag: 'span[data-mention]',
//         getAttrs: (element) => ({
//           id: element.getAttribute('data-mention'),
//           label: element.textContent,
//         }),
//       },
//     ]
//   },

//   // Определяем правила рендеринга HTML
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'span',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       0,
//     ]
//   },

//   // Определяем плагины расширения
//   addProseMirrorPlugins() {
//     const plugins = []

//     // Добавляем плагин для отслеживания символа "@"
//     plugins.push(
//       this.editor.plugins.suggestion({
//         char: this.options.char,
//         suggestionClass: this.options.suggestionClass,
//         command: ({ editor, range, props }) => {
//           // Вызываем команду для вставки упоминания
//           editor.commands.insertMention(props.suggestion)
//         },
//         items: (query) => {
//           // Фильтруем пользователей по запросу
//           return this.editor.state.users.filter((user) =>
//             user.name.toLowerCase().startsWith(query.toLowerCase())
//           )
//         },
//         render: (props) => {
//           // Рендерим выпадающий список с именами пользователей
//           return (
//             <div className='suggestion-item' onClick={props.onClick}>
//               {props.item.name}
//             </div>
//           )
//         },
//       })
//     )

//     return plugins
//   },
// })

// // Создаем компонент TextEditor
// const TextEditor = () => {
//   // Получаем список пользователей из стейта redux
//   const users = useSelector((state) => state.users)

//   // Создаем экземпляр редактора с расширениями и контентом с помощью хука useEditor
//   const editor = useEditor({
//     extensions: [StarterKit, CustomMention],
//     content: '<p>Привет, мир!</p>',
//     // Передаем список пользователей в стейт редактора
//     state: {
//       users,
//     },
//   })

//   // Возвращаем компонент с контентом редактора
//   return <EditorContent editor={editor} />
// }

// export default TextEditor

// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Mention from '@tiptap/extension-mention'
// import tippy from 'tippy.js'

// const users = [
//   { id: 1, name: 'Lea Thompson' },
//   { id: 2, name: 'Cyndi Lauper' },
//   { id: 3, name: 'Tom Cruise' },
// ]

// const Suggestions = ({ editor }) => {
//   const [active, setActive] = React.useState(false)
//   const [items, setItems] = React.useState(users)
//   const [position, setPosition] = React.useState({
//     left: 0,
//     top: 0,
//   })

//   // a function to handle the keyboard navigation
//   const onKeyDown = ({ event }) => {
//     // get the current suggestion
//     const suggestion = editor.state.suggestion

//     // only do something if the suggestion is active
//     if (suggestion && suggestion.active) {
//       // get the total number of items
//       const count = items.length

//       // get the index of the current active item
//       const index = items.findIndex((item) => item.id === suggestion.data.id)

//       // handle the arrow keys
//       if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
//         // prevent the default arrow key behavior
//         event.preventDefault()

//         // calculate the next index
//         let nextIndex = index + (event.key === 'ArrowUp' ? -1 : +1)

//         // make sure the next index is in range
//         if (nextIndex < 0) {
//           nextIndex = count - 1
//         } else if (nextIndex >= count) {
//           nextIndex = 0
//         }

//         // get the next item
//         const item = items[nextIndex]

//         // update the suggestion with the next item
//         editor.commands.updateSuggestion({
//           id: item.id,
//           label: item.name,
//         })
//       }

//       // handle the enter key
//       if (event.key === 'Enter') {
//         // prevent the default enter behavior
//         event.preventDefault()

//         // insert the current active item as mention
//         editor.commands.insertMention(suggestion.data)

//         // hide the suggestions
//         editor.commands.hideSuggestion()
//       }

//       // handle the escape key
//       if (event.key === 'Escape') {
//         // prevent the default escape behavior
//         event.preventDefault()

//         // hide the suggestions
//         editor.commands.hideSuggestion()
//       }
//     }
//   }

//   React.useEffect(() => {
//     return editor.on('update', () => {
//       const { suggestion } = editor.state

//       if (suggestion && suggestion.active) {
//         const items = users.filter((user) =>
//           user.name.toLowerCase().startsWith(suggestion.query.toLowerCase())
//         )

//         setItems(items)

//         const node = document.querySelector(
//           `[data-suggestion-id="${suggestion.id}"]`
//         )

//         if (node) {
//           const { left, top } = node.getBoundingClientRect()

//           setPosition({
//             left: left - node.offsetWidth / 2,
//             top: top + window.pageYOffset - node.offsetHeight,
//           })
//         }

//         setActive(true)
//       } else {
//         setActive(false)
//       }
//     })
//   }, [])

//   return (
//     <div
//       className='suggestions'
//       style={{ left: position.left, top: position.top }}>
//       {active && (
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               <button onClick={() => editor.commands.insertMention(item)}>
//                 {item.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// const Editor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Mention.configure({
//         HTMLAttributes: {
//           'class': 'mention',
//           'data-mention': '',
//         },
//       }),
//     ],
//     content: '<p>Try mentioning a user by typing @.</p>',
//     onUpdate() {
//       console.log(editor.getHTML())
//     },
//   })

//   return (
//     <>
//       <EditorContent editor={editor} />
//       <Suggestions editor={editor} />
//     </>
//   )
// }

// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { Extension } from '@tiptap/core'
// import Suggestion from '@tiptap/suggestion'
// import { useSelector } from 'react-redux'

// // Создаем кастомное расширение для упоминаний
// const CustomMention = Extension.create({
//   // Определяем имя расширения
//   name: 'customMention',

//   // Используем addOptions вместо defaultOptions
//   addOptions() {
//     return {
//       HTMLAttributes: {
//         'class': 'mention',
//         'data-mention': '',
//       },
//       char: '@',
//       suggestionClass: 'suggestion',
//     }
//   },

//   // Определяем методы расширения
//   addCommands() {
//     return {
//       insertMention:
//         ({ id, label }) =>
//         ({ commands }) => {
//           // Вставляем упоминание в текст с атрибутами
//           return commands.insertContent({
//             type: this.name,
//             attrs: {
//               id,
//               label,
//             },
//           })
//         },
//     }
//   },

//   // Определяем правила парсинга HTML
//   parseHTML() {
//     return [
//       {
//         tag: 'span[data-mention]',
//         getAttrs: (element) => ({
//           id: element.getAttribute('data-mention'),
//           label: element.textContent,
//         }),
//       },
//     ]
//   },

//   // Определяем правила рендеринга HTML
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'span',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       0,
//     ]
//   },

//   // Определяем плагины расширения
//   addProseMirrorPlugins() {
//     const plugins = []

//     // Добавляем плагин для отслеживания символа "@"
//     plugins.push(
//       Suggestion.create({
//         char: this.options.char,
//         suggestionClass: this.options.suggestionClass,
//         command: ({ editor, range, props }) => {
//           // Вызываем команду для вставки упоминания
//           editor.commands.insertMention(props.suggestion)
//         },
//         items: (query) => {
//           // Фильтруем пользователей по запросу
//           return this.editor.state.users.filter((user) =>
//             user.name.toLowerCase().startsWith(query.toLowerCase())
//           )
//         },
//         render: (props) => {
//           // Рендерим выпадающий список с именами пользователей
//           return (
//             <div className='suggestion-item' onClick={props.onClick}>
//               {props.item.name}
//             </div>
//           )
//         },
//       })
//     )

//     return plugins
//   },
// })

// // Создаем компонент TextEditor
// const TextEditor = () => {
//   // Получаем список пользователей из стейта redux
//   const users = useSelector((state) => state.users)

//   // Создаем экземпляр редактора с расширениями и контентом с помощью хука useEditor
//   const editor = useEditor({
//     extensions: [StarterKit, CustomMention],
//     content: '<p>Привет, мир!</p>',
//     // Передаем список пользователей в стейт редактора
//     state: {
//       users,
//     },
//   })

//   // Возвращаем компонент с контентом редактора
//   return <EditorContent editor={editor} />
// }

// export default TextEditor

// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { Suggestions } from './Extenstions/suggestions' // Импортируем наше кастомное расширение
// import { useSelector } from 'react-redux'

// const NewNewEditor = () => {
//   const users = useSelector((state) => state.users.users)
//   console.log('users: ', users)

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Suggestions.configure({
//         command: ({ editor, range, props }) => {
//           return editor.commands.insertContent({
//             type: 'mention',
//             attrs: props.suggestion,
//           })
//         },
//         items: (query) => {
//           return users.filter((user) =>
//             user.name.toLowerCase().startsWith(query.toLowerCase())
//           )
//         },
//         render: (props) => {
//           // console.log('props: ', props)
//           // console.log('props.item: ', props.item)
//           // return <div className='suggestion-item'>{props.item.name}</div>
//         },
//       }),
//     ],
//     content: '<p>Привет, мир!</p>',
//   })

//   return <EditorContent editor={editor} />
// }

// export default NewNewEditor
