import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div
      id='error-page'
      className='m-8 p-8 border-checkbox border-2 bg-mainBg rounded-md text-center'>
      <h1 className='font-bold text-task'>Oops!</h1>
      <p className='font-bold text-task mb-8'>
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i className='font-extrabold text-task text-6xl'>
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage
