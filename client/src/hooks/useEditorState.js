// import { useState, useEffect } from 'react'
// import { useEditor } from '@tiptap/react'
// import TitleEditor from '../components/Editor/TitleEditor'
// import DescriptionEditor from '../components/Editor/DescriptionEditor'

// const useEditorState = (name, taskDescription, id) => {
//   const [isEditable, setIsEditable] = useState(false)
//   const [showLinkModal, setShowLinkModal] = useState(false)

//   console.log('name: ', name)
//   console.log('id: ', id)
//   console.log('description: ', taskDescription)

//   const titleEditor = useEditor(TitleEditor(name, id))
//   console.log('titleEditor: ', titleEditor)
//   const editor = useEditor(DescriptionEditor(taskDescription, id))

//   useEffect(() => {
//     if (editor) {
//       editor.setEditable(isEditable)
//     }
//     if (titleEditor) {
//       titleEditor.setEditable(isEditable)
//     }
//   }, [isEditable, editor, titleEditor])

//   return [
//     editor,
//     titleEditor,
//     isEditable,
//     setIsEditable,
//     showLinkModal,
//     setShowLinkModal,
//   ]
// }

// export default useEditorState

// import { useState, useEffect } from 'react'

// const useEditorState = (id) => {
//   const [isEditable, setIsEditable] = useState(false)
//   const [showLinkModal, setShowLinkModal] = useState(false)

//   // Не нужно создавать редакторы здесь
//   const titleEditor = useEditor(TitleEditor(name, id))
//   // console.log('titleEditor: ', titleEditor)
//   const editor = useEditor(DescriptionEditor(taskDescription, id))

//   useEffect(() => {
//     // Нужно получить редакторы по id из DOM
//     const titleEditor = document.getElementById(id + '-title')
//     const editor = document.getElementById(id + '-description')

//     // console.log('TitleEditor element:', titleEditor)
//     // console.log('TitleEditor element id:', titleEditor.id)
//     // console.log('DescriptionEditor element:', editor)
//     // console.log('DescriptionEditor element id:', editor.id)

//     if (editor) {
//       editor.setEditable(isEditable)
//     }
//     if (titleEditor) {
//       titleEditor.setEditable(isEditable)
//     }
//   }, [isEditable, id])

//   return [isEditable, setIsEditable, showLinkModal, setShowLinkModal]
// }

// export default useEditorState
