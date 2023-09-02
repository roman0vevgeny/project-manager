import React from 'react'
import Tag from '../../../Tag/Tag'
import styles from './AllTags.module.scss'

const AllTags = ({ tags, taskTags, onAddTag, onDeleteTag }) => {
  const handleTagClick = (tagId) => {
    if (taskTags?.includes(tagId)) {
      onDeleteTag(tagId)
    } else {
      onAddTag(tagId)
    }
  }

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <div
          key={tag.id}
          onClick={() => handleTagClick(tag.id)}
          className={
            taskTags && taskTags.includes(tag.id) ? styles.selected : ''
          }>
          <Tag color={tag.color} tagName={tag.name} />
        </div>
      ))}
    </div>
  )
}

export default AllTags
