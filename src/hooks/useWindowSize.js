import { useMemo, useEffect, useState } from 'react'
import nanobounce from 'nanobounce'

const useWindowSize = () => {
  const isClient = typeof window === 'object'
  const debounce = useMemo(() => nanobounce(32), [])

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      if (getSize() === windowSize) {
        return
      }

      debounce(() => setWindowSize(getSize()))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
