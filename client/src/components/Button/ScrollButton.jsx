import React from 'react'
import Arrow from '../svgs/Arrow'
import styles from './ScrollButton.module.scss'

const ScrollButton = ({ sectionRef }) => {
  const handleClick = () => {
    sectionRef.current.scrollTop = 0
  }

  console.log('ScrollButton rendered')

  return (
    <div className={styles.main} onClick={handleClick}>
      <div className='relative h-[14px] w-[15px]'>
        <div className='absolute top-0 left-[-3px] rotate-180'>
          <Arrow />
        </div>
      </div>
    </div>
  )
}

export default ScrollButton
