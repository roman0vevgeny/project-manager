import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className='pl-2 py-[3px] bg-redTag text-redTag rounded-b-[3px] text-start text-14 w-[227px]'>
      {message}
    </div>
  )
}

export default ErrorMessage
