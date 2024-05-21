import { useMemo, useState, useLayoutEffect } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import useMeasure from 'react-use-measure'
import useWindowSize from './useWindowSize'
import { BROWSER_PX_VALUE_LIMIT } from '../constants'

const useVirtualGridDisplay = ({ cell, total, offset }, scrollContainer, scrollDirection) => {
  const isClient = typeof window === 'object'
  const viewport = useWindowSize()
  const [ref, bounds] = useMeasure(isClient && window.ResizeObserver ? { scroll: true } : { scroll: true, polyfill: ResizeObserver })
  const [initial, setInitial] = useState({ height: 0, width: 0, top: 0, left: 0 })

  const container = scrollContainer ?? window

  useLayoutEffect(() => {
    setInitial({
      height: ref.current?.offsetHeight || 0,
      width: ref.current?.offsetWidth || 0,
      top: ref.current?.offsetTop || 0,
      left: ref.current?.offsetLeft || 0,
    })
  }, [])

  const { display, style } = useMemo(() => {
    const results = {}
    const columns = {}
    const rows = {}
    const layout = {}
    const style = {}

    switch (scrollDirection) {
      case 'vertical':
        layout.width = bounds.width || initial.width
        columns.total = cell.width ? Math.floor(layout.width / cell.width) : 1
        rows.total = Math.ceil(total / columns.total)
        rows.total = Math.min(rows.total, Math.floor(BROWSER_PX_VALUE_LIMIT / cell.height))
        layout.top = Math.floor(((bounds.top + (isClient ? (container === window ? container.scrollY : container.scrollTop) : 0)) || initial.top))
        layout.left = 0
        layout.height = rows.total * cell.height
        columns.height = layout.height
        columns.width = Math.floor(layout.width / Math.max(1, columns.total))
        rows.height = cell.height
        rows.width = layout.width
        style.width = 'auto'
        style.height = `${layout.height}px`
        results.columns = columns.total
        results.rows = Math.ceil(viewport.height / rows.height) + offset
        break
      case 'horizontal':
        layout.height = cell.height // TODO: How about multiple rows usecase ? (Could be `bounds.height || initial.height` ?)
        rows.total = cell.height ? Math.floor(layout.height / cell.height) : 1
        columns.total = Math.ceil(total / rows.total)
        columns.total = Math.min(columns.total, Math.floor(BROWSER_PX_VALUE_LIMIT / cell.width))
        layout.left = Math.floor(((bounds.left + (isClient ? (container === window ? container.scrollX : container.scrollLeft) : 0)) || initial.left))
        layout.top = 0
        layout.width = columns.total * cell.width
        rows.width = layout.width
        rows.height = Math.floor(layout.height / Math.max(1, rows.total))
        columns.width = cell.width
        columns.height = layout.height
        style.width = `${layout.width}px`
        style.height = `${cell.height}px` // TODO: How about multiple rows usecase ? (Could be `'100%'` ?)
        results.rows = rows.total
        results.columns = Math.ceil(viewport.width / columns.width) + offset
        break
    }

    return {
      display: {
        cell,
        columns,
        rows,
        layout,
        total: Math.min(total, rows.total * columns.total),
        offset,
        viewport: {
          columns: {
            ...columns,
            total: results.columns,
          },
          rows: {
            ...rows,
            total: results.rows,
          },
        },
      },
      style: {
        position: 'relative',
        ...style,
      },
    }
  }, [
    offset,
    total,
    cell.height,
    cell.width,
    viewport.height,
    viewport.width,
    bounds.height,
    bounds.width,
    bounds.top,
    bounds.left,
    initial.height,
    initial.width,
    initial.top,
    initial.legt,
    container,
    scrollDirection,
  ])

  return { display, style, ref }
}

export default useVirtualGridDisplay
