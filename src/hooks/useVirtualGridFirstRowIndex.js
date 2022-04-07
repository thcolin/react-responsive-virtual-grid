import { useMemo, useEffect, useState, useRef } from 'react'
import nanobounce from 'nanobounce'

const useVirtualGridFirstRowIndex = ({ layout, cell, rowOffset, scrollContainer }) => {
  const isClient = typeof window === 'object'
  const computeFirstRowIndex = useRef()
  const debounce = useMemo(() => nanobounce(200), [])

  // Utilize the container that was passed in if so.
  const container = scrollContainer ?? window

  computeFirstRowIndex.current = () => {

    // window and divs use a different property for scroll
    // position. Determine what we can get.
    let scrollTop = window.scrollY;
    if (container.scrollTop) scrollTop = container.scrollTop; 

    const position = isClient ? Math.max(0, scrollTop - layout.top) : 0
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

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return { firstRowIndex, scrolling }
}

export default useVirtualGridFirstRowIndex
