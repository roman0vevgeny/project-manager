// import React, { useRef } from 'react'
// import Button from '../Button/Button'
// import Edit from '../svgs/Edit'
// import styles from './SectionName.module.scss'

// const capitalizeFirstLetter = (string) => {
//   return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
// }

// const SectionProjectName = ({ name, editable }) => {
//   const inputRef = useRef(null)

//   //   const handleChange = (e) => {
//   //
//   //   }

//   const handleFocus = () => {
//     inputRef.current.focus()
//   }

//   const handleMouseDown = (e) => {
//     if (!editable) {
//       e.preventDefault()
//     }
//     return
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       inputRef.current.blur()
//     }
//   }

//   //   const handleBlur = () => {
//   //     if (text.trim() === '') {
//   //
//   //     }
//   //   }

//   return (
//     <div className='transition-all duration-200 ease-in-out'>
//       <div className='flex flex-row justify-between mx-2 items-center mb-2'>
//         <input
//           className={styles.input}
//           placeholder={'Имя проекта'}
//           value={capitalizeFirstLetter(name)}
//           ref={inputRef}
//           readOnly={!editable}
//           tabIndex={!editable ? -1 : undefined}
//           onMouseDown={handleMouseDown}
//           onKeyDown={handleKeyDown}
//         />
//         <div className='flex flex-row'>
//           {editable && <Button svgLeft={<Edit />} onClick={handleFocus} />}
//         </div>
//       </div>
//       <div className={styles.devider}></div>
//     </div>
//   )
// }

// export default SectionProjectName

import React, { useRef, useState, useEffect } from 'react'
import Button from '../Button/Button'
import Edit from '../svgs/Edit'
import styles from './SectionName.module.scss'
import { useDispatch } from 'react-redux'
import { updateProjectName } from '../../features/projectSlice'
import Case from '../svgs/Case'

const capitalizeFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

const SectionProjectName = ({ name, projectId, editable }) => {
  const inputRef = useRef(null)

  const [projectName, setProjectName] = useState(name)
  const [warning, setWarning] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const newValue = e.target.value
    setProjectName(newValue)
    if (newValue.length > 20) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }

  const handleFocus = () => {
    inputRef.current.focus()
  }

  const handleMouseDown = (e) => {
    if (!editable) {
      e.preventDefault()
    }
    return
  }

  const handleBlur = () => {
    if (projectName.length <= 20) {
      dispatch(updateProjectName({ name: projectName, id: projectId }))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
      if (projectName.length <= 20) {
        dispatch(updateProjectName({ name: projectName, id: projectId }))
      }
    }
  }

  useEffect(() => {
    setProjectName(name)
  }, [name])

  return (
    <div>
      <div className='flex flex-row justify-between mx-2 items-center mb-2'>
        <div className='mr-2 text-task transition-all duration-200 ease-in-out'>
          <Case />
        </div>
        <input
          className={styles.input}
          placeholder={'Name'}
          value={capitalizeFirstLetter(projectName)}
          ref={inputRef}
          readOnly={!editable}
          tabIndex={!editable ? -1 : undefined}
          onMouseDown={handleMouseDown}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <div className='flex flex-row'>
          {editable && <Button svgLeft={<Edit />} onClick={handleFocus} />}
        </div>
      </div>
      {warning && (
        <div className='flex p-2 mt-2 rounded-md text-redTag bg-redTag text-14 justify-center mb-2'>
          Only 20 characters max
        </div>
      )}
      <div className={styles.devider}></div>
    </div>
  )
}

export default SectionProjectName
