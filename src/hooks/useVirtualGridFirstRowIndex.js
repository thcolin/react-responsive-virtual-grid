import { useMemo, useEffect, useState } from 'react'
import nanobounce from 'nanobounce'

const useVirtualGridFirstRowIndex = ({ layout, cell, rowOffset }) => {
  const isClient = typeof window === 'object'
  const debounce = useMemo(() => nanobounce(200), [])

  function getFirstRowIndex() {
    const position = Math.max(0, window.scrollY - layout.top)
    const firstVisibleRowIndex = Math.floor(position / cell.height)
    const firstRowIndex = Math.max(0, firstVisibleRowIndex - rowOffset / 2)
    return firstRowIndex
  }

  const [firstRowIndex, setFirstRowIndex] = useState(getFirstRowIndex)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleScroll() {
      setFirstRowIndex(getFirstRowIndex())
      setScrolling(true)
      debounce(() => setScrolling(false))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { firstRowIndex, scrolling }
}

export default useVirtualGridFirstRowIndex
