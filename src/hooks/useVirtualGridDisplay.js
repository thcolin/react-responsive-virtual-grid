import { useRef, useCallback, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import useWindowSize from './useWindowSize'

const useVirtualGridDisplay = ({ cell, total, rowOffset }) => {
  const element = useRef()
  const viewport = useWindowSize()
  const { ref: registerObserver, entry: { boundingClientRect = {} } = {} } = useInView({ threshold: 0 })

  const ref = useCallback((node) => {
    element.current = node
    registerObserver(node)
  }, [])

  const { display, style } = useMemo(() => {
    const columns = {}
    const rows = {}
    const layout = {}

    layout.width = element.current?.clientWidth
    columns.total = Math.floor(layout.width / cell.width)
    rows.total = Math.ceil(total / columns.total)
    layout.top = boundingClientRect?.top || 0
    layout.height = rows.total * cell.height
    columns.height = layout.height
    columns.width = Math.floor(layout.width / columns.total)
    rows.height = cell.height
    rows.width = layout.width

    return {
      display: {
        cell,
        columns,
        rows,
        layout,
        total,
        rowOffset,
        viewport: {
          columns: {
            ...columns,
            total: columns.total,
          },
          rows: {
            ...rows,
            total: Math.ceil(viewport.height / rows.height) + rowOffset,
          },
        },
      },
      style: {
        position: 'relative',
        height: `${layout.height}px`,
      },
    }
  }, [
    cell.height,
    cell.width,
    viewport.height,
    viewport.width,
    rowOffset,
    total,
    element.current?.clientWidth,
    boundingClientRect?.top,
  ])

  return { display, style, ref }
}

export default useVirtualGridDisplay
