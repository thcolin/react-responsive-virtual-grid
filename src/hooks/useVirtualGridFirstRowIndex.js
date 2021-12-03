import { useMemo, useEffect, useState, useRef } from 'react'
import nanobounce from 'nanobounce'

const useVirtualGridFirstRowIndex = ({ layout, cell, rowOffset }) => {
  const isClient = typeof window === 'object'
  const computeFirstRowIndex = useRef()
  const debounce = useMemo(() => nanobounce(200), [])

  computeFirstRowIndex.current = () => {
    const position = isClient ? Math.max(0, window.scrollY - layout.top) : 0
    const firstVisibleRowIndex = Math.floor(position / cell.height)
    const firstRowIndex = Math.max(0, firstVisibleRowIndex - rowOffset / 2)
    return firstRowIndex
  }

  const [firstRowIndex, setFirstRowIndex] = useState(computeFirstRowIndex.current)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleScroll = () => {
      setFirstRowIndex(computeFirstRowIndex.current())
      setScrolling(true)
      debounce(() => setScrolling(false))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { firstRowIndex, scrolling }
}

export default useVirtualGridFirstRowIndex
