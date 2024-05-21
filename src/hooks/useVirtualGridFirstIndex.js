import { useMemo, useEffect, useState, useRef } from 'react'
import nanobounce from 'nanobounce'

const useVirtualGridFirstIndex = ({ layout, cell, offset }, scrollContainer, scrollDirection) => {
  const isClient = typeof window === 'object'
  const computeFirstIndex = useRef()
  const debounce = useMemo(() => nanobounce(200), [])

  const container = scrollContainer ?? window

  computeFirstIndex.current = () => {
    if (scrollDirection === 'vertical') {
      const position = isClient ? Math.max(0, (container === window ? container.scrollY : container.scrollTop) - layout.top) : 0
      const firstVisibleRowIndex = Math.floor(position / cell.height)
      const firstIndex = Math.max(0, firstVisibleRowIndex - offset / 2)
      return firstIndex
    }

    if (scrollDirection === 'horizontal') {
      const position = isClient ? Math.max(0, (container === window ? container.scrollX : container.scrollLeft) - layout.left) : 0
      const firstVisibleColumnIndex = Math.floor(position / cell.width)
      const firstColumnIndex = Math.max(0, firstVisibleColumnIndex - offset / 2)
      return firstColumnIndex
    }
  }

  const [firstIndex, setFirstIndex] = useState(computeFirstIndex.current)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleScroll = () => {
      setFirstIndex(computeFirstIndex.current())
      setScrolling(true)
      debounce(() => setScrolling(false))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [container])

  useEffect(() => {
    setFirstIndex(computeFirstIndex.current())
  }, [layout, cell, offset, container, scrollDirection])

  return { firstIndex, scrolling }
}

export default useVirtualGridFirstIndex
