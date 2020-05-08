import { useMemo, useEffect, useState } from 'react'
import nanobounce from 'nanobounce'

const useScrollPosition = (debounceTime = 16) => {
  const isClient = typeof window === 'object'
  const debounce = useMemo(() => nanobounce(debounceTime), [debounceTime])

  function getPosition() {
    return window.scrollY
  }

  const [scrollPosition, setScrollPosition] = useState(getPosition)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleScroll() {
      if (getPosition() === scrollPosition) {
        return
      }

      debounce(() => setScrollPosition(getPosition()))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [debounce])

  return scrollPosition
}

export default useScrollPosition
