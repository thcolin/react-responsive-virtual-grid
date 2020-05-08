import React, { useMemo, useState } from 'react'
import useWindowSize from './hooks/useWindowSize'
import useScrollPosition from './hooks/useScrollPosition'

export const VirtualGrid = ({
  cell,
  total,
  render,
  onRender,
  viewportRowOffset: _viewportRowOffset = 4,
  ...props
}) => {
  const viewportRowOffset = useMemo(
    () => Math.max(2, Math.round(_viewportRowOffset / 2) * 2),
    [_viewportRowOffset]
  )

  const [container, setContainer] = useState({})
  const windowScrollPosition = useScrollPosition()
  const scrollPosition = useMemo(
    () => Math.max(0, windowScrollPosition - container.offsetTop || 0),
    [windowScrollPosition, container]
  )

  const viewport = useWindowSize()
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
          total: columns.total
        },
        rows: {
          ...rows,
          total: Math.ceil(viewport.height / rows.height) + viewportRowOffset
        }
      }
    }
  }, [cell.height, cell.width, viewportRowOffset, viewport, total, container])

  const firstVisibileRowIndex = useMemo(
    () =>
      Math.max(
        0,
        Math.floor(scrollPosition / display.rows.height) - viewportRowOffset / 2
      ),
    [scrollPosition, display.rows.height, viewportRowOffset]
  )

  const children = useMemo(() => {
    const children = []
    let index = firstVisibileRowIndex * display.columns.total
    const max = Math.min(
      total,
      index + display.viewport.rows.total * display.viewport.columns.total
    )
    let row, column

    for (index; index < max; index++) {
      row = Math.min(
        display.rows.total,
        Math.floor(index / display.columns.total)
      )
      column = index % display.columns.total
      children.push(
        render({
          key: `${row}-${column}`,
          index,
          style: {
            position: 'absolute',
            height: display.rows.height,
            width: display.columns.width,
            transform: `translate3d(${column * display.columns.width}px, ${
              row * display.rows.height
            }px, 0px)`
          }
        })
      )
    }

    if (typeof onRender === 'function') {
      onRender(children)
    }

    return children
  }, [
    total,
    display.rows.height,
    display.rows.total,
    display.columns.width,
    display.columns.total,
    display.viewport.rows.total,
    firstVisibileRowIndex,
    render
  ])

  const containerStyle = useMemo(
    () => ({
      position: 'relative',
      height: `${display.layout.height}px`
    }),
    [display.layout.height, display.layout.width]
  )

  return (
    <div ref={(el) => setContainer(el)} style={containerStyle}>
      {children}
    </div>
  )
}

export default VirtualGrid
