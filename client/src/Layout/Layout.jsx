import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { navbarSlice } from '../features/navbarSlice'

const Layout = () => {
  const showNavbar = useSelector((state) => state.navbar.showNavbar)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const toggleNavbar = () => {
    dispatch(navbarSlice.actions.toggleNavbar())
  }

  React.useEffect(() => {
    if (location.pathname === '/') {
      const view = localStorage.getItem('view')
      if (view) {
        navigate(`home${view}`)
      } else {
        navigate('home/list')
      }
    }
  }, [location.pathname])

  return (
    <div className='relative overflow-hidden transition-all duration-200 ease-in-out'>
      <Header
        toggleNavbar={toggleNavbar}
        showNavbar={showNavbar}
        currentPath={location.pathname}
      />
      <div className='relative flex snap-y flex-raw transition-all duration-200 ease-in-out'>
        {showNavbar && (
          <nav className='min-w-[300px] bg-nav py-10 pl-[15px] pr-[12px] h-[calc(100vh-50px)] transition-all duration-200 ease-in-out'>
            <Navbar className='sticky top-0' />
          </nav>
        )}
        <main className='flex relative justify-center h-[calc(100vh-50px)] w-full transition-all duration-200 ease-in-out'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
