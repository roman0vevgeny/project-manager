// import React, { useState, useEffect } from 'react'
// import styles from './TextEditor.module.scss'
// import linkifyHtml from 'linkify-html'

// const TextEditor = (props) => {
//   const [value, setValue] = useState(props.value || '')

//   const handleInputChange = (e) => {
//     let html = e.target.innerHTML

//     html = linkifyHtml(html, {
//       className: '.link',
//       defaultProtocol: 'https',
//       target: '_blank',
//       attributes: {
//         style:
//           'color: blue; text-decoration: underline; display: inline-block; cursor: pointer;',
//       },
//     })

//     html = html.replace(/ /g, ' ')

//     setValue(html)
//     if (props.onChange) {
//       props.onChange(html)
//     }
//   }

//   const handlePaste = (e) => {
//     const clipboardData = e.clipboardData || window.clipboardData
//     const pastedData = clipboardData.getData('text/html')
//     const tempDiv = document.createElement('div')
//     tempDiv.innerHTML = pastedData
//     tempDiv.style.fontFamily = 'Gilroy-Medium'
//     tempDiv.style.fontSize = '11px'
//     tempDiv.style.color = 'var(--task-text)'
//     const updatedHtml = tempDiv.innerHTML
//     document.execCommand('insertHTML', false, updatedHtml)
//     e.preventDefault()
//   }

//   const handleButtonClick = (command) => {
//     const selection = window.getSelection()

//     if (selection && !selection.isCollapsed) {
//       const range = selection.getRangeAt(0)
//       const ancestor = range.commonAncestorContainer
//       if (command === 'insertUnorderedList') {
//         if (ancestor.tagName === 'UL' || ancestor.tagName === 'LI') {
//           return
//         } else {
//           const ul = document.createElement('ul')
//           range.deleteContents()
//           range.insertNode(ul)
//           for (let node of ancestor.childNodes) {
//             const li = document.createElement('li')
//             li.textContent = node.textContent

//             ul.appendChild(li)
//           }
//           ancestor.parentNode.removeChild(ancestor)
//         }
//       } else if (command === 'insertOrderedList') {
//         if (ancestor.tagName === 'OL' || ancestor.tagName === 'LI') {
//           return
//         } else {
//           const ol = document.createElement('ol')
//           range.deleteContents()
//           range.insertNode(ol)
//           for (let node of ancestor.childNodes) {
//             const li = document.createElement('li')
//             li.textContent = node.textContent
//             ol.appendChild(li)
//           }
//           ancestor.parentNode.removeChild(ancestor)
//         }
//       }
//       setValue(document.getElementById('input').innerHTML)

//       if (props.onChange) {
//         props.onChange(document.getElementById('input').innerHTML)
//       }
//     }
//   }

//   useEffect(() => {
//     const handleClickLink = (event) => {
//       event.preventDefault()
//       const url = event.target.href
//       window.open(url, '_blank')
//     }

//     const input = document.getElementById('input')
//     const links = input.getElementsByClassName('link')

//     for (let link of links) {
//       link.addEventListener('click', handleClickLink)
//     }

//     return () => {
//       for (let link of links) {
//         link.removeEventListener('click', handleClickLink)
//       }
//     }
//   }, [value])

//   return (
//     <div
//       className={styles.container}
//       onBlur={props.onBlur}
//       onInput={handleInputChange}
//       dir='ltr'>
//       <div
//         id='input'
//         className={styles.input}
//         contentEditable
//         dangerouslySetInnerHTML={{ __html: value }}
//         style={{ display: 'inline' }}
//         onPaste={handlePaste}
//         dir='ltr'
//       />
//       <div className={styles.toolbar}>
//         <button
//           className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
//           onClick={() => handleButtonClick('insertUnorderedList')}>
//           Bullets
//         </button>
//         <button
//           className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
//           onClick={() => handleButtonClick('insertOrderedList')}>
//           List
//         </button>
//       </div>
//     </div>
//   )
// }

// export default TextEditor
