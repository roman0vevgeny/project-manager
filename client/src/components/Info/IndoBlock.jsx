import React from 'react'
import NoTasks from '../svgs/NoTasks'
import CreateButton from '../Button/CreateButton'

const InfoBlock = ({ location }) => {
  return (
    <div>
      <div className='my-10 flex justify-center text-imageColor transition-all duration-200 ease-in-out'>
        <NoTasks />
      </div>
      <div className='text-task m-0'>
        {(location === '/expired/list' || location === '/expired/cards') && (
          <p>There are no expired tasks for today</p>
        )}
        {(location === '/home/list' || location === '/home/cards') && (
          <p>There are no tasks yet</p>
        )}
        {(location === '/today/list' || location === '/today/cards') && (
          <p>There are no tasks for today</p>
        )}
        {(location === '/expired/list' || location === '/expired/cards') && (
          <p className='text-gray text-16 font-medium mb-4 leading-1'>
            Keep up the good work!
          </p>
        )}
        {(location === '/home/list' || location === '/home/cards') && (
          <p className='text-gray text-16 font-medium mb-4 leading-1'>
            Let's create a new one
          </p>
        )}
        {(location === '/today/list' || location === '/today/cards') && (
          <p className='text-gray text-16 font-medium mb-4 leading-1'>
            Let's create a new one
          </p>
        )}
      </div>
      <div className='flex justify-center'>
        {(location === '/today/list' || location === '/today/cards') && (
          <CreateButton today={true} />
        )}
        {(location === '/home/list' || location === '/home/cards') && (
          <CreateButton />
        )}
      </div>
    </div>
  )
}

export default InfoBlock
