import React from 'react'
import TagBubble from './TagBubble/TagBubble'

const TagColorSection = ({ color, onColorSelect }) => {
  const colors = [
    'red',
    'pink',
    'purple',
    'blue',
    'sea',
    'green',
    'yellow',
    'gray',
  ]

  return (
    <div className='flex w-[235px] flex-wrap mb-1 ml-[3px]'>
      {colors.map((c) => (
        <TagBubble
          key={c}
          color={c}
          onColorSelect={onColorSelect}
          selected={c === color}
        />
      ))}
    </div>
  )
}

export default TagColorSection
