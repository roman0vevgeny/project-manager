import React from 'react'
import { Outlet } from 'react-router-dom'

const ProjectPage = () => {
  return (
    <div className='w-full pt-5'>
      <Outlet />
    </div>
  )
}

export default ProjectPage
