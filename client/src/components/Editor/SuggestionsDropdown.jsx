// import React, { useState, useEffect, useRef } from 'react'
// // import PropTypes from 'prop-types'
// import Folder from '../svgs/Folder'

// function SuggestionsDropdown(props) {
//   const { char, nodeType, nodeProps, items, command, loading } = props

//   const [selectedIndex, setSelectedIndex] = useState(-1)

//   const isReference = nodeType.startsWith('reference')
//   const isCommand = isReference && nodeProps.referenceType === 'command'
//   const isUser = isReference && nodeProps.referenceType === 'user'
//   const isIssue = isReference && nodeProps.referenceType === 'issue'
//   const isLabel = isReference && nodeProps.referenceType === 'label'
//   const isEpic = isReference && nodeProps.referenceType === 'epic'
//   const isSnippet = isReference && nodeProps.referenceType === 'snippet'
//   const isVulnerability =
//     isReference && nodeProps.referenceType === 'vulnerability'
//   const isMergeRequest =
//     isReference && nodeProps.referenceType === 'merge_request'
//   const isMilestone = isReference && nodeProps.referenceType === 'milestone'
//   const isEmoji = nodeType === 'emoji'

//   useEffect(() => {
//     setSelectedIndex(-1)
//   }, [items])

//   const getText = (item) => {
//     if (isEmoji) return item.e

//     switch (true) {
//       case isUser:
//         return `${char}${item.username}`
//       case isIssue || isMergeRequest:
//         return `${char}${item.iid}`
//       case isSnippet || isVulnerability:
//         return `${char}${item.id}`
//       case isMilestone:
//         return `${char}${item.title}`
//       case isLabel:
//         return item.title
//       case isCommand:
//         return `${char}${item.name}`
//       case isEpic:
//         return item.reference
//       default:
//         return ''
//     }
//   }

//   const getProps = (item) => {
//     const props = {}

//     if (isEmoji) {
//       Object.assign(props, {
//         name: item.name,
//         unicodeVersion: item.u,
//         title: item.d,
//         moji: item.e,
//       })
//     }

//     if (isLabel || isMilestone) {
//       Object.assign(props, {
//         originalText: `${char}${
//           /\W/.test(item.title) ? JSON.stringify(item.title) : item.title
//         }`,
//       })
//     }

//     if (isLabel) {
//       Object.assign(props, {
//         text: item.title,
//         color: item.color,
//       })
//     }

//     Object.assign(props, nodeProps)

//     return props
//   }

//   const onKeyDown = ({ key }) => {
//     if (key === 'ArrowUp') {
//       upHandler()
//       return true
//     }

//     if (key === 'ArrowDown') {
//       downHandler()
//       return true
//     }

//     if (key === 'Enter') {
//       enterHandler()
//       return true
//     }

//     return false
//   }

//   const upHandler = () => {
//     setSelectedIndex((selectedIndex + items.length - 1) % items.length)
//   }

//   const downHandler = () => {
//     setSelectedIndex((selectedIndex + 1) % items.length)
//   }

//   const enterHandler = () => {
//     selectItem(selectedIndex)
//   }

//   const scrollIntoView = () => {
//     dropdownItemsRef.current[selectedIndex]?.scrollIntoView({
//       block: 'nearest',
//     })
//   }

//   const selectItem = (index) => {
//     const item = items[index]

//     if (item) {
//       command({
//         text: getText(item),
//         ...getProps(item),
//       })
//     }
//   }

//   const avatarSubLabel = (item) => {
//     return item.count ? `${item.name} (${item.count})` : item.name
//   }

//   const dropdownItemsRef = useRef([])

//   return (
//     <div className='dropdown'>
//       {!loading && items.length > 0 && (
//         <div className='absoluteDropdown'>
//           <div className='dropdownInner'>
//             <ul className='dropdownContent' data-testid='suggestionDropdown'>
//               {items.map((item, index) => (
//                 <li
//                   key={index}
//                   role='presentation'
//                   className={`item ${
//                     index === selectedIndex ? 'focused' : ''
//                   }`}>
//                   <div
//                     ref={(el) => (dropdownItemsRef.current[index] = el)}
//                     role='menuitem'
//                     className='itemInner'
//                     onClick={() => selectItem(index)}>
//                     <div className='textWrapper'>
//                       {isUser && <Folder />}
//                       {isIssue || isMergeRequest ? (
//                         <>
//                           <small>{item.iid}</small>
//                           {item.title}
//                         </>
//                       ) : null}
//                       {isVulnerability || isSnippet ? (
//                         <>
//                           <small>{item.id}</small>
//                           {item.title}
//                         </>
//                       ) : null}
//                       {isEpic ? (
//                         <>
//                           <small>{item.reference}</small>
//                           {item.title}
//                         </>
//                       ) : null}
//                       {isMilestone ? <>{item.title}</> : null}
//                       {isLabel && (
//                         <div className='flex'>
//                           <span
//                             data-testid='flex'
//                             className='flex'
//                             style={{ backgroundColor: item.color }}></span>
//                           {item.title}
//                         </div>
//                       )}
//                       {isCommand && (
//                         <div>
//                           <div className='flex mb-1'>
//                             <span className='font-bold'>/{item.name}</span>
//                             <em className='text-grayHover'>{item.params[0]}</em>
//                           </div>
//                           <small className='text-grayHover'>
//                             {' '}
//                             {item.description}{' '}
//                           </small>
//                         </div>
//                       )}
//                       {isEmoji && (
//                         <div className='flex items-center'>
//                           <div className='flex pr-4'>{item.e}</div>
//                           <div className='flex flex-grow'>
//                             {item.name}
//                             <br />
//                             <small>{item.d}</small>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//       {loading && (
//         <div className='absolute top-0 left-0'>
//           <div className='flex'>
//             <div className='flex px-4 py-3'>
//               <Folder />
//               Loading...
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// SuggestionsDropdown.propTypes = {
//   char: PropTypes.string.isRequired,
//   nodeType: PropTypes.string.isRequired,
//   nodeProps: PropTypes.object.isRequired,
//   items: PropTypes.array.isRequired,
//   command: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// }

// export default SuggestionsDropdown
