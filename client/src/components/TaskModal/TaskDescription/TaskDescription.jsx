// import React, { useRef, useEffect } from 'react'
// import Edit from '../../svgs/Edit'
// import styles from './TaskDescription.module.scss'
// import * as linkify from 'linkifyjs'
// import linkifyHtml from 'linkify-html'
// import ModalButton from '../../Button/ModalButton'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateTaskDescription } from '../../../features/tasksSlice'

// const TaskDescription = ({ id, checked }) => {
//   const task = useSelector((state) =>
//     state.tasks.tasks.find((t) => t.id === id)
//   )
//   const { description } = task

//   const inputRef = useRef(null)

//   const dispatch = useDispatch()

//   const handleFocus = () => {
//     if (
//       inputRef.current.textContent === '' && checked
//         ? ''
//         : '+ Add a description'
//     ) {
//       inputRef.current.textContent = ''
//     }
//     inputRef.current.focus()

//     const range = document.createRange()
//     range.selectNodeContents(inputRef.current)
//     range.collapse(false)

//     const selection = window.getSelection()
//     selection.removeAllRanges()
//     selection.addRange(range)
//   }

//   // const handleBlur = () => {
//   //   const newText = inputRef.current.textContent.trim()
//   //   if (newText !== description) {
//   //     dispatch(updateTaskDescription({ id, description: newText }))
//   //   } else if (newText === '' && description === '') {
//   //     inputRef.current.textContent = checked ? '' : '+ Add a description'
//   //   }
//   // }

//   const handleBlur = () => {
//     const newText = inputRef.current.textContent.trim()
//     if (newText !== description) {
//       const html = linkifyHtml(newText, {
//         defaultProtocol: 'https',
//         target: '_blank',
//         className: 'link',
//       })
//       inputRef.current.innerHTML = html
//       dispatch(updateTaskDescription({ id, description: newText }))
//     } else if (newText === '' && description === '') {
//       inputRef.current.textContent = checked ? '' : '+ Add a description'
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       inputRef.current.blur()
//     }
//   }

//   useEffect(() => {
//     if (description !== '') {
//       inputRef.current.textContent = description
//     } else {
//       inputRef.current.textContent = checked ? '' : '+ Add a description'
//     }
//   }, [description])

//   return (
//     <div className='flex flex-row justify-between mx-2 items-start my-2'>
//       <div
//         className={
//           (checked ? styles.inputChecked : styles.input) +
//           ' ' +
//           (description === '' ? styles.inputGray : '')
//         }
//         ref={inputRef}
//         contentEditable='true'
//         onKeyDown={handleKeyDown}
//         onBlur={handleBlur}
//         onFocus={handleFocus}
//       />
//       {!checked && (
//         <div className='flex flex-row mt-1'>
//           <ModalButton svg={<Edit />} onClick={handleFocus} />
//         </div>
//       )}
//     </div>
//   )
// }

// export default TaskDescription

// import React, { useState, useRef, useEffect } from 'react'
// import styles from './TaskDescription.module.scss'
// import TextareaAutosize from 'react-textarea-autosize'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateTaskDescription } from '../../../features/tasksSlice'

// const TaskDescription = ({ id, checked }) => {
//   const task = useSelector((state) =>
//     state.tasks.tasks.find((t) => t.id === id)
//   )
//   const [description, setDescription] = useState(task.description || '')
//   const inputRef = useRef(null)

//   const dispatch = useDispatch()

//   const handleBlur = () => {
//     dispatch(updateTaskDescription({ id, description }))
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       inputRef.current.blur()
//     }
//   }

//   useEffect(() => {
//     setDescription(description)
//   }, [description])

//   const handleDescriptionChange = (e) => {
//     const newText = e.target.value
//     setDescription(newText)
//   }

//   console.log(description)
//   console.log(task.description)

//   return (
//     <div className='flex flex-row justify-between mx-2 items-start my-2'>
//       <TextareaAutosize
//         className={
//           (checked ? styles.inputChecked : styles.input) +
//           ' ' +
//           (description === '' ? styles.inputGray : '')
//         }
//         placeholder='+ Add a description'
//         ref={inputRef}
//         rows='1'
//         cols='40'
//         value={description}
//         onChange={handleDescriptionChange}
//         onBlur={handleBlur}
//         onKeyDown={handleKeyDown}
//       />
//     </div>
//   )
// }

// export default TaskDescription

// import Quill from 'quill'
// import React, { useState, useEffect } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js'
// import styles from './TaskDescription.module.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateTaskDescription } from '../../../features/tasksSlice'

// const Font = Quill.import('attributors/class/font')
// Font.whitelist = ['Gilroy-Medium']
// Quill.register(Font, true)

// const TaskDescription = ({ id, checked }) => {
//   const task = useSelector((state) =>
//     state.tasks.tasks.find((t) => t.id === id)
//   )
//   const [description, setDescription] = useState(task.description || '')
//   const [isEditing, setIsEditing] = useState(false)

//   const dispatch = useDispatch()

//   const handleBlur = () => {
//     dispatch(updateTaskDescription({ id, description }))
//     setIsEditing(false)
//   }

//   useEffect(() => {
//     setDescription(description)
//   }, [description, isEditing])

//   const handleDescriptionChange = (value) => {
//     setDescription(value)
//   }

//   return (
//     <div className='flex flex-col justify-between mx-2 items-start my-2'>
//       {isEditing ? (
//         <div className='flex flex-col w-full'>
//           <ReactQuill
//             className='w-full'
//             placeholder='+ Add a description'
//             value={description}
//             onChange={handleDescriptionChange}
//             onBlur={handleBlur}
//             modules={{ toolbar: true }}
//           />
//           <div className='flex space-x-2 my-1'>
//             <button
//               type={'submit'}
//               className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
//               onClick={() => setIsEditing(false)}>
//               Cancel
//             </button>
//             <button
//               type={'submit'}
//               className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
//               onClick={handleBlur}>
//               Save
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           className='flex flex-col w-full'
//           onClick={() => setIsEditing(true)}>
//           <ReactQuill
//             className='w-full'
//             value={description}
//             modules={{ toolbar: false }}
//             readOnly
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default TaskDescription

import React from 'react'
import Bangle from '../../TextEditor/Bangle'

const TaskDescription = ({ task }) => {
  return (
    <div className='flex flex-col justify-between mx-2 items-start my-2 w-full'>
      <Bangle task={task} />
    </div>
  )
}

export default TaskDescription

// import React, { useState, useRef, useEffect } from 'react'
// import styles from './TaskDescription.module.scss'
// import TextareaAutosize from 'react-textarea-autosize'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateTaskDescription } from '../../../features/tasksSlice'
// import Linkify from 'react-linkify'

// const componentDecorator = (href, text, key) => (
//   <a
//     className='linkify__text'
//     href={href}
//     key={key}
//     target='_blank'
//     rel='noopener noreferrer'>
//     {text}
//   </a>
// )

// const TaskDescription = ({ id, checked }) => {
//   const task = useSelector((state) =>
//     state.tasks.tasks.find((t) => t.id === id)
//   )
//   const [isEditing, setIsEditing] = useState(false)
//   const [description, setDescription] = useState(task.description || '')
//   const inputRef = useRef(null)

//   const dispatch = useDispatch()

//   const handleBlur = () => {
//     dispatch(updateTaskDescription({ id, description }))
//   }

//   const handleEdit = () => {
//     setIsEditing(true) // переключите стейт при клике
//   }

//   const handleCancel = () => {
//     setIsEditing(false) // переключите стейт при отмене
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       inputRef.current.blur()
//     }
//   }

//   useEffect(() => {
//     setDescription(description)
//   }, [description])

//   const handleDescriptionChange = (e) => {
//     const newText = e.target.value
//     setDescription(newText)
//   }

//   // console.log(description)
//   // console.log(task.description)

//   const componentDecorator = (href, text, key) => (
//     <a
//       className={styles.link}
//       href={href}
//       key={key}
//       target='_blank'
//       rel='noopener noreferrer'
//       style={{ color: 'blue' }} // добавьте этот стиль
//     >
//       {text}
//     </a>
//   )

//   return (
//     <div className='flex flex-row justify-between mx-2 items-start my-2'>
//       {isEditing ? ( // проверьте стейт
//         <TextareaAutosize
//           className={
//             (checked ? styles.inputChecked : styles.input) +
//             ' ' +
//             (description === '' ? styles.inputGray : '')
//           }
//           placeholder='+ Add a description'
//           ref={inputRef}
//           rows='1'
//           cols='40'
//           value={description}
//           onChange={handleDescriptionChange}
//           onBlur={handleBlur}
//           onKeyDown={handleKeyDown}
//         />
//       ) : (
//         <div onClick={handleEdit} className={styles.input}>
//           <Linkify componentDecorator={componentDecorator}>
//             {description || '+ Add a description'}
//           </Linkify>
//         </div>
//       )}
//     </div>
//   )
// }

// export default TaskDescription
