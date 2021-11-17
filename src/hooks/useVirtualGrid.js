import { useMemo } from 'react'
import useWindowSize from './useWindowSize'
import useScrollPosition from './useScrollPosition'

const useVirtualGrid = ({
  cell,
  total,
  viewportRowOffset: _viewportRowOffset = 4,
  onRender,
  container,
}) => {
  const viewportRowOffset = Math.max(2, Math.round(_viewportRowOffset / 2) * 2)
  const viewport = useWindowSize()
  const windowScrollPosition = useScrollPosition()
  const scrollPosition = Math.max(
    0,
    windowScrollPosition - container.offsetTop || 0,
  )

  const display = useMemo(() => {
    const columns = {}
    const rows = {}
    const layout = {}

    layout.width = container.clientWidth || viewport.width
    columns.total = Math.floor(layout.width / cell.width)
    rows.total = Math.ceil(total / columns.total)
    layout.height = rows.total * cell.height
    columns.height = layout.height
    columns.width = Math.floor(layout.width / columns.total)
    rows.height = cell.height
    rows.width = layout.width

    return {
      columns,
      rows,
      layout,
      viewport: {
        columns: {
          ...columns,
          total: columns.total,
        },
        rows: {
          ...rows,
          total: Math.ceil(viewport.height / rows.height) + viewportRowOffset,
        },
      },
      container: {
        position: 'relative',
        height: `${layout.height}px`,
      },
    }
  }, [
    cell.height,
    cell.width,
    viewport.height,
    viewport.width,
    viewportRowOffset,
    total,
    container?.offsetTop,
  ])

  const raw = useMemo(() => {
    const firstVisibileRowIndex = Math.max(
      0,
      Math.floor(scrollPosition / display.rows.height) - viewportRowOffset / 2,
    )

    const raw = []
    let row, column
    let index = firstVisibileRowIndex * display.columns.total
    const max = Math.min(
      total,
      index + display.viewport.rows.total * display.viewport.columns.total,
    )

    for (index; index < max; index++) {
      row = Math.min(
        display.rows.total,
        Math.floor(index / display.columns.total),
      )
      column = index % display.columns.total

      raw.push({
        key: `${row}-${column}`,
        index,
        style: {
          position: 'absolute',
          height: display.rows.height,
          width: display.columns.width,
          transform: `translate3d(${column * display.columns.width}px, ${
            row * display.rows.height
          }px, 0px)`,
        },
      })
    }

    if (typeof onRender === 'function') {
      onRender(raw)
    }

    return raw
  }, [scrollPosition, viewportRowOffset, total, display, onRender])

  return { display, raw }
}

export default useVirtualGrid
