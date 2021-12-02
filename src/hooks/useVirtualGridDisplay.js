import { useRef, useMemo, useState, useLayoutEffect } from 'react'
import useWindowSize from './useWindowSize'

const useVirtualGridDisplay = ({ cell, total, rowOffset }) => {
  const ref = useRef()
  const viewport = useWindowSize()
  const [initial, setInitial] = useState({ width: 0, top: 0 })

  useLayoutEffect(() => {
    setInitial({ width: ref.current?.clientWidth, top: ref.current?.offsetTop })
  }, [])

  const { display, style } = useMemo(() => {
    const columns = {}
    const rows = {}
    const layout = {}

    layout.width = ref.current?.clientWidth || initial.width
    columns.total = Math.floor(layout.width / cell.width)
    rows.total = Math.ceil(total / columns.total)
    layout.top = ref.current?.offsetTop || initial.top
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
    ref.current?.clientWidth,
    ref.current?.offsetTop,
    initial.width,
    initial.top
  ])

  return { display, style, ref }
}

export default useVirtualGridDisplay
