import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className='pl-2 py-[3px] mt-2 bg-redTag text-redTag rounded-md text-start text-14 w-[228px]'>
      {message}
    </div>
  )
}

export default ErrorMessage
