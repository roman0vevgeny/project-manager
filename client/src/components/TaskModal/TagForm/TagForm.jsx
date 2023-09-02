import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../../../features/tagsSlice'
import { addTaskTag, deleteTaskTag } from '../../../features/tasksSlice'
import TagInput from './TagInput/TagInput'
import TagColorSection from './TagColorSection/TagColorSection'
import AllTags from './AllTags/AllTags'
import ErrorMessage from '../ErrorMessage'
import Plus from '../../svgs/Plus'

const TagForm = ({ value, onChange, isNewTask, taskId }) => {
  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState('')
  const [error, setError] = React.useState('')

  const handleNameChange = (value) => {
    setName(value)
    if (value.length > 20) {
      setError('20 characters max')
    } else {
      setError('')
    }
  }

  const handleColorSelect = (value) => {
    setColor(value)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && color) {
      if (name.length > 20) {
        setError('20 characters max')
        return false
      }
      const newTag = {
        id: Date.now().toString(),
        name,
        color,
      }
      dispatch(addTag(newTag))
      setName('')
      setColor('')
    } else {
      setError('Enter a name and select a color')
    }
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

  const tags = useSelector((state) => state.tags)

  const handleTagSelect = (tagId) => {
    let newSelectedTags
    if (value.includes(tagId)) {
      newSelectedTags = value.filter((id) => id !== tagId)
      if (!isNewTask && taskId) {
        dispatch(deleteTaskTag({ id: taskId, tagId }))
      }
    } else {
      newSelectedTags = [...value, tagId]
      if (!isNewTask && taskId) {
        dispatch(addTaskTag({ id: taskId, tagId }))
      }
    }
    onChange(newSelectedTags)
    setError('')
  }

  return (
    <form className='flex flex-col w-full mb-3' onSubmit={handleSubmit}>
      <div className='flex'>
        <TagInput name={name} onNameChange={handleNameChange} />
        <button
          type={'submit'}
          className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover w-[32px] h-[29px]'>
          <Plus />
        </button>
      </div>

      <div className='flex flex-col mt-2'>
        <TagColorSection color={color} onColorSelect={handleColorSelect} />{' '}
        {tags && tags.length > 0 && (
          <AllTags
            tags={tags}
            taskTags={value}
            onAddTag={handleTagSelect}
            onDeleteTag={handleTagSelect}
          />
        )}
      </div>
      <div>{error && <ErrorMessage message={error} />}</div>
    </form>
  )
}

export default TagForm
