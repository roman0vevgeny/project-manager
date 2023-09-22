import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './DocumentForm.module.scss'
import { addDocument, updateTaskDocuments } from '../../../features/tasksSlice'
import DocumentInput from './DocumentInput/DocumentInput'
import ErrorMessage from '../ErrorMessage'
import Plus from '../../svgs/Plus'
import Delete from '../../svgs/Delete'

const DocumentForm = ({ task, value, isNewTask }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const validateGoogleDocUrl = (url) => {
    const regex = /https:\/\/docs\.google\.com\/document\/d\/[\w-]+\/edit.*/i
    return regex.test(url)
  }

  const validateGoogleSpreadsheetUrl = (url) => {
    const regex =
      /https:\/\/docs\.google\.com\/spreadsheets\/d\/[\w-]+\/edit.*/i
    return regex.test(url)
  }

  const handleNameChange = (value) => {
    setName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      setError('')
      if (validateGoogleDocUrl(name) || validateGoogleSpreadsheetUrl(name)) {
        console.log('Valid URL')
        dispatch(addDocument({ id: task.id, document: name }))
      } else {
        setError('It`s not a google URL')
      }
      setName('')
    } else {
      setError('Enter a document URL')
    }
  }

  const handleDeleteDocument = (document) => {
    dispatch(
      updateTaskDocuments({
        id: task.id,
        documents: task.documents.filter((doc) => doc !== document),
      })
    )
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && name) {
        e.preventDefault()
        handleSubmit(e)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [name])

  return (
    <form className='flex flex-col w-full' onSubmit={handleSubmit}>
      <div className='flex justify-center mx-[4px] mb-1'>
        <DocumentInput name={name} onNameChange={handleNameChange} />
        <button
          type={'submit'}
          className='flex rounded-[5px] mt-1 text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover w-[29px] h-[29px]'>
          <Plus />
        </button>
      </div>

      {task.documents.length > 0 && (
        <div className='flex flex-col mt-2 border-t-1 border-stroke p-1 space-y-1'>
          {task.documents.map((document, index) => (
            <div
              className='flex w-[220px] truncate items-center cursor-pointer hover:bg-nav rounded-[4px] px-2'
              key={index}>
              <div className='truncate text-grayHover text-13 py-[7px]'>
                <a href={document} target='_blank' rel='noopener noreferrer'>
                  {document}
                </a>
              </div>

              <div
                className={styles.svg}
                onClick={() => handleDeleteDocument(document)}>
                <Delete />
              </div>
            </div>
          ))}
        </div>
      )}
      <div>{error && <ErrorMessage message={error} />}</div>
    </form>
  )
}

export default DocumentForm
