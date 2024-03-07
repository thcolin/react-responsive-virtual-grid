import { useMemo, useState, useLayoutEffect } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import useMeasure from 'react-use-measure'
import useWindowSize from './useWindowSize'
import { BROWSER_PX_VALUE_LIMIT } from '../constants'

const useVirtualGridDisplay = ({ cell, total, rowOffset }) => {
  const isClient = typeof window === 'object'
  // const initialScrollY = useMemo(() => isClient ? window.scrollY : 0, [])
  const viewport = useWindowSize()
  const [ref, bounds] = useMeasure(isClient && window.ResizeObserver ? {} : { polyfill: ResizeObserver })
  const [initial, setInitial] = useState({ width: 0, top: 0 })

  useLayoutEffect(() => {
    setInitial({ width: ref.current?.offsetWidth || 0, top: ref.current?.offsetTop || 0 })
  }, [])

  const { display, style } = useMemo(() => {
    const columns = {}
    const rows = {}
    const layout = {}

    layout.width = bounds.width || initial.width
    columns.total = cell.width ? Math.floor(layout.width / cell.width) : 1
    rows.total = Math.ceil(total / columns.total)
    rows.total = Math.min(rows.total, Math.floor(BROWSER_PX_VALUE_LIMIT / cell.height))
    layout.top = Math.floor((bounds.top || initial.top) /* + initialScrollY */)
    layout.height = rows.total * cell.height
    columns.height = layout.height
    columns.width = Math.floor(layout.width / Math.max(1, columns.total))
    rows.height = cell.height
    rows.width = layout.width

    return {
      display: {
        cell,
        columns,
        rows,
        layout,
        total: Math.min(total, rows.total * columns.total),
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
    // initialScrollY,
  ])

  return { display, style, ref }
}

export default useVirtualGridDisplay
