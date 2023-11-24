import React from 'react'
import styles from './ProjectIcon.module.scss'
import PuzzleProject from '../svgs/PuzzleProject'
import Case from '../svgs/Case'
import Monitor from '../svgs/Monitor'
import StarProject from '../svgs/StarProject'
import Heart from '../svgs/Heart'

const ProjectIcon = ({ onIconChange, onClose, projectIcon }) => {
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
    <div className='w-[180px]'>
      {/* <div className='w-fit'>
        <div className={styles.body} onClick={() => onClose()}>
          <div className='flex justify-center items-center rounded-[5px]'>
            {getStatusIcon(status)}
          </div>
        </div>
      </div> */}
      <div className='grid grid-cols-4 w-fit gap-1 p-1'>
        {filteredIcons.map((icon) => (
          <div
            key={icon.name}
            className='hover:bg-gray py-[2px] m-[2px] rounded-[5px] w-fit cursor-pointer'
            onClick={() => handleChooseIcon(icon.name)}>
            {/* <div className={styles.body} key={icon.name}>
              <div className='flex items-center rounded-full'>
                {getStatusIcon(icon)}
              </div>
            </div> */}
            <div className='text-grayHover p-1'>
              <div className='flex justify-center items-center rounded-[5px]'>
                {getIconFromName(icon.name)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectIcon
