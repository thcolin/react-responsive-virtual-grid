import { useMemo, useState, useLayoutEffect } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import useMeasure from 'react-use-measure'
import useWindowSize from './useWindowSize'

const useVirtualGridDisplay = ({ cell, total, rowOffset }) => {
  const viewport = useWindowSize()
  const [ref, bounds] = useMeasure(window.ResizeObserver ? {} : { polyfill: ResizeObserver })
  const [initial, setInitial] = useState({ width: 0, top: 0 })

  useLayoutEffect(() => {
    setInitial({ width: ref.current?.offsetWidth, top: ref.current?.offsetTop })
  }, [])

  const { display, style } = useMemo(() => {
    const columns = {}
    const rows = {}
    const layout = {}

    layout.width = bounds.width || initial.width
    columns.total = Math.floor(layout.width / cell.width)
    rows.total = Math.ceil(total / columns.total)
    layout.top = (bounds.top || initial.top) + window.scrollY
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
    rowOffset,
    total,
    cell.height,
    cell.width,
    viewport.height,
    viewport.width,
    bounds.width,
    bounds.top,
    initial.width,
    initial.top,
  ])

  return { display, style, ref }
}

export default useVirtualGridDisplay
