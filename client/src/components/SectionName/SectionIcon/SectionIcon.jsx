import React from 'react'
import styles from './SectionIcon.module.scss'
import PuzzleProject from '../../svgs/PuzzleProject'
import Case from '../../svgs/Case'
import Monitor from '../../svgs/Monitor'
import StarProject from '../../svgs/StarProject'
import Heart from '../../svgs/Heart'

const SectionIcon = ({ onIconChange, onClose, projectIcon }) => {
  const icons = [
    { name: 'case' },
    { name: 'puzzle' },
    { name: 'monitor' },
    { name: 'star' },
    { name: 'heart' },
  ]

  const filteredIcons = icons.filter((icon) => icon.name !== projectIcon)

  const getIconFromName = (name) => {
    switch (name) {
      case 'case':
        return <Case />
      case 'puzzle':
        return <PuzzleProject />
      case 'monitor':
        return <Monitor />
      case 'star':
        return <StarProject />
      case 'heart':
        return <Heart />
      default:
        return <Case />
    }
  }

  const handleChooseIcon = (icon) => {
    onIconChange(icon)
    onClose()
  }

  return (
    <div>
      <div className='w-fit'>
        <div className={styles.iconSticky} onClick={() => onClose()}>
          <div className='flex justify-center items-center rounded-[5px]'>
            {getIconFromName(projectIcon)}
          </div>
        </div>
      </div>
      <div className='w-fit'>
        {filteredIcons.map((icon) => (
          <div
            key={icon.name}
            className={styles.icon}
            onClick={() => handleChooseIcon(icon.name)}>
            <div className='flex justify-center items-center rounded-[5px]'>
              {getIconFromName(icon.name)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionIcon
