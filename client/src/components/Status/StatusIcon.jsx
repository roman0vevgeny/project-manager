import React from 'react'
import styles from './StatusIcon.module.scss'
import { returnStatusIcons } from './returnStatusIcons'

const StatusIcon = ({ onIconChange, status, onClose, statusIcon }) => {
  const icons = returnStatusIcons()

  const filteredIcons = icons.filter(
    (icon) =>
      icon.name !== statusIcon &&
      icon.name !== 'done' &&
      icon.name !== 'progress'
  )

  const handleChooseIcon = (icon) => {
    onIconChange(icon)
    onClose()
  }

  return (
    <div className={styles.main}>
      <div className='grid grid-cols-4 w-fit gap-1 p-1'>
        {filteredIcons.map((icon) => (
          <div
            key={icon.name}
            className='hover:bg-gray py-[2px] m-[2px] rounded-[8px] w-fit cursor-pointer'
            onClick={() => handleChooseIcon(icon.name)}>
            <div className={styles.body}>
              <div className='flex justify-center items-center rounded-[8px]'>
                {icon.iconBig}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusIcon
