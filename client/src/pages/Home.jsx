import React from 'react'
import { Outlet } from 'react-router-dom'

const view = localStorage.getItem('view')
if (!view) {
  localStorage.setItem('view', '/list')
}

const Home = () => {
  return (
    <div className='h-[calc(100vh-50px)] w-full flex justify-center pt-5 '>
      <Outlet />
    </div>
  )
}

export default Home
