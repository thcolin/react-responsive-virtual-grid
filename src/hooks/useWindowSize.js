import { useMemo, useEffect, useState } from 'react'
import nanobounce from 'nanobounce'

const useWindowSize = (debounceTime = 100) => {
  const isClient = typeof window === 'object'
  const debounce = useMemo(() => nanobounce(debounceTime), [debounceTime])

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
  }, [debounce])

  return windowSize
}

export default useWindowSize
