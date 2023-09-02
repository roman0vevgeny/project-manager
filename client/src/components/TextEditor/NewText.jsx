// // import React, { useState, useRef, useEffect } from 'react'
// // import './NewText.module.scss'

// // function dataToHtml(data) {
// //   let html = ''
// //   for (let obj of data) {
// //     switch (obj.type) {
// //       case 'paragraph':
// //         html += `<p style="text-align: ${obj.align}; font-weight: ${
// //           obj.bold ? 'bold' : ''
// //         }; font-style: ${obj.italic ? 'italic' : ''}; text-decoration: ${
// //           obj.underline ? 'underline' : ''
// //         };">${obj.text}</p>`
// //         break
// //       case 'link':
// //         html += `<a href="${obj.href}">${obj.text}</a>`
// //         break
// //       case 'list':
// //         html += `<${obj.style === 'bullet' ? 'ul' : 'ol'}>`
// //         for (let item of obj.items) {
// //           html += `<li style="font-weight: ${
// //             item.bold ? 'bold' : ''
// //           }; font-style: ${item.italic ? 'italic' : ''}; text-decoration: ${
// //             item.underline ? 'underline' : ''
// //           };">${item.text}</li>`
// //         }
// //         html += `</${obj.style === 'bullet' ? 'ul' : 'ol'}>`
// //         break
// //       default:
// //         break
// //     }
// //   }
// //   return html
// // }

// // function htmlToData(html) {
// //   let data = []
// //   let parser = new DOMParser()
// //   let doc = parser.parseFromString(html, 'text/html')
// //   let elements = doc.querySelectorAll('p, a, ul, ol')
// //   for (let element of elements) {
// //     switch (element.tagName) {
// //       case 'P':
// //         let paragraph = {
// //           type: 'paragraph',
// //           text: element.textContent,
// //           align: element.style.textAlign || 'left',
// //           bold: element.style.fontWeight === 'bold',
// //           italic: element.style.fontStyle === 'italic',
// //           underline: element.style.textDecoration === 'underline',
// //         }
// //         data.push(paragraph)
// //         break
// //       case 'A':
// //         let link = {
// //           type: 'link',
// //           text: element.textContent,
// //           href: element.href,
// //         }
// //         data.push(link)
// //         break
// //       case 'UL':
// //       case 'OL':
// //         let list = {
// //           type: 'list',
// //           items: [],
// //           style: element.tagName === 'UL' ? 'bullet' : 'numbered',
// //         }
// //         let items = element.querySelectorAll('li')
// //         for (let item of items) {
// //           let listItem = {
// //             text: item.textContent,
// //             bold: item.style.fontWeight === 'bold',
// //             italic: item.style.fontStyle === 'italic',
// //             underline: item.style.textDecoration === 'underline',
// //           }
// //           list.items.push(listItem)
// //         }
// //         data.push(list)
// //         break
// //       default:
// //         break
// //     }
// //   }
// //   return data
// // }

// // function setCaretPosition(div, position) {
// //   let length = div.textContent.length
// //   if (position >= 0 && position <= length) {
// //     let selection = window.getSelection()
// //     let range = document.createRange()
// //     range.setStart(div.firstChild, position)
// //     range.setEnd(div.firstChild, position)
// //     selection.removeAllRanges()
// //     selection.addRange(range)
// //   } else {
// //     console.error('Invalid position')
// //   }
// // }

// // function EditableDiv() {
// //   const [content, setContent] = useState('')
// //   const divRef = useRef(null)

// //   function handleInput(e) {
// //     const html = e.target.innerHTML
// //     setContent(html)
// //   }

// //   function handleSelectionChange(e) {
// //     const selection = window.getSelection().toString()
// //   }

// //   function handleCopy(e) {
// //     const selection = window.getSelection().toString()
// //     e.clipboardData.setData('text/plain', selection)
// //     e.preventDefault()
// //   }

// //   function handleInput(e) {
// //     const html = e.target.innerHTML
// //     setContent(html)
// //     setCaretPosition(divRef.current, Math.min(html.length, length))
// //   }

// //   function handlePaste(e) {
// //     const text = e.clipboardData.getData('text/plain')
// //     document.execCommand('insertText', false, text)
// //     e.preventDefault()
// //     setCaretPosition(
// //       divRef.current,
// //       Math.min(content.length + text.length, length)
// //     )
// //   }

// //   useEffect(() => {
// //     divRef.current.addEventListener('input', handleInput)
// //     document.addEventListener('selectionchange', handleSelectionChange)
// //     divRef.current.addEventListener('copy', handleCopy)
// //     divRef.current.addEventListener('paste', handlePaste)

// //     return () => {
// //       divRef.current.removeEventListener('input', handleInput)
// //       document.removeEventListener('selectionchange', handleSelectionChange)
// //       divRef.current.removeEventListener('copy', handleCopy)
// //       divRef.current.removeEventListener('paste', handlePaste)
// //     }
// //   }, [])

// //   return (
// //     <div>
// //       <h1>Редактируемый div на React</h1>
// //       <div
// //         ref={divRef}
// //         contentEditable='true'
// //         style={{ border: '1px solid black', padding: '10px' }}
// //         direction='ltr
// //         dangerouslySetInnerHTML={{ __html: content }}
// //       />
// //       <div>
// //         <h2>HTML-содержимое</h2>
// //         <pre>{content}</pre>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EditableDiv

// import React, { useState, useEffect, useRef } from 'react'

// function NewText(props) {
//   const [text, setText] = useState('')
//   const [caret, setCaret] = useState(0)

//   const ref = useRef(null)

//   function handleKeyDown(e) {
//     if (e.key === 'Backspace') {
//       e.preventDefault()
//       if (caret > 0) {
//         setText(text.slice(0, caret - 1) + text.slice(caret))
//         setCaret(caret - 1)
//       }
//     } else if (e.key === 'Delete') {
//       e.preventDefault()
//       if (caret < text.length) {
//         setText(text.slice(0, caret) + text.slice(caret + 1))
//       }
//     } else if (e.key === 'ArrowLeft') {
//       e.preventDefault()
//       if (caret > 0) {
//         setCaret(caret - 1)
//       }
//     } else if (e.key === 'ArrowRight') {
//       e.preventDefault()
//       if (caret < text.length) {
//         setCaret(caret + 1)
//       }
//     } else {
//       e.preventDefault()
//       setText(text.slice(0, caret) + e.key + text.slice(caret))
//       setCaret(caret + 1)
//     }
//   }

//   function handleFocus(e) {
//     setCaret(text.length)
//   }

//   function isLink(text) {
//     const regex =
//       /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
//     return regex.test(text)
//   }

//   function applyStyles(text) {
//     const linkStyle = {
//       color: 'blue',
//       textDecoration: 'underline',
//       fontStyle: 'italic',
//     }
//     const words = text.split(' ')
//     const elements = []
//     for (let i = 0; i < words.length; i++) {
//       const word = words[i]
//       if (isLink(word)) {
//         elements.push(<span style={linkStyle}>{word}</span>)
//       } else {
//         elements.push(<span>{word}</span>)
//       }
//       if (i < words.length - 1) {
//         elements.push(' ')
//       }
//     }
//     return elements
//   }

//   //   function setCaretToEnd() {
//   //     const div = ref.current
//   //     if (div && div.textContent) {
//   //       const selection = window.getSelection()
//   //       if (selection) {
//   //         const lastChild = div.lastChild
//   //         selection.collapse(lastChild, lastChild.textContent.length)
//   //       }
//   //     }
//   //   }

//   //   function setCaretToEnd() {
//   //     const div = ref.current
//   //     if (div && div.textContent) {
//   //       const selection = window.getSelection()
//   //       if (selection) {
//   //         const lastChild = div.lastChild
//   //         const parent = lastChild.parentNode
//   //         selection.collapse(parent, parent.textContent.length)
//   //       }
//   //     }
//   //   }

//   function setCaretToEnd() {
//     const div = ref.current
//     if (div && div.textContent) {
//       const selection = window.getSelection()
//       if (selection) {
//         const children = div.childNodes
//         const lastChild = children[children.length - 1]
//         selection.collapse(lastChild, lastChild.textContent.length)
//       }
//     }
//   }

//   useEffect(() => {
//     setCaretToEnd()
//   }, [text])

//   function handleClick(e) {
//     setCaretToEnd()
//   }

//   return (
//     <div
//       className='text-field'
//       tabIndex='0'
//       onKeyDown={handleKeyDown}
//       onFocus={handleFocus
//       ref={ref}
//       contentEditable={true}
//       onClick={handleClick}>
//       {applyStyles(text.slice(0, caret))}
//       {applyStyles(text.slice(caret))}
//     </div>
//   )
// }

// export default NewText
