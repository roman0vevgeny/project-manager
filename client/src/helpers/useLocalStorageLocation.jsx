import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function useLocalStorageLocation() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname

    localStorage.setItem('view', path)
  }, [location])

  return location
}

export default useLocalStorageLocation
