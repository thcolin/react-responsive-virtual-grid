import { useMemo, useEffect, useState } from 'react'
import nanobounce from 'nanobounce'

const instant = (fn) => fn()

const useScrollPosition = (debounceTime = 0) => {
  const isClient = typeof window === 'object'
  const debounce = useMemo(() => debounceTime === 0 ? instant : nanobounce(debounceTime), [debounceTime])

  function getPosition() {
    return window.scrollY
  }

  const [scrollPosition, setScrollPosition] = useState(getPosition)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleScroll() {
      if (getPosition() === scrollPosition) {
        return
      }

      setScrolling(true)
      debounce(() => {
        setScrollPosition(getPosition())
        setScrolling(false)
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [debounce])

  return { scrollPosition, scrolling }
}

export default useScrollPosition
