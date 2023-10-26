// import { Mention } from '@tiptap/extension-mention'
// import { MentionSuggestion } from './MentionSuggestion'

// // Это массив объектов, которые будут использоваться для подсказок упоминаний
// // Вы можете заменить его на свой собственный массив или получать данные из API
// const mentionItems = [
//   {
//     id: 'philippkuehn',
//     label: 'Philipp Kühn',
//     avatar: 'https://avatars.githubusercontent.com/u/1567498?v=4',
//   },
//   {
//     id: 'hanspagel',
//     label: 'Hans Pagel',
//     avatar: 'https://avatars.githubusercontent.com/u/491642?v=4',
//   },
//   {
//     id: 'sibiraj-s',
//     label: 'Sibiraj',
//     avatar: 'https://avatars.githubusercontent.com/u/10395817?v=4',
//   },
// ]

// // Это функция, которая определяет, как будет отображаться узел mention в редакторе
// // Вы можете использовать любой HTML-элемент или компонент React для рендеринга
// const renderLabel = ({ node, options }) => {
//   const { id } = node.attrs
//   const item = mentionItems.find((item) => item.id === id)

//   if (!item) {
//     return null
//   }

//   return `${options.suggestion.char}${item.label}`
// }

// // Это экземпляр класса Mention, который вы можете использовать в вашем редакторе
// // Вы можете передать любые параметры, которые поддерживает расширение mention
// export const MentionLs = Mention.create({
//   HTMLAttributes: {
//     class: 'mention',
//   },
//   renderLabel,
//   suggestion: MentionSuggestion,
// })
