import { useMemo } from 'react'

const useVirtualGridChildren = ({ firstRowIndex, scrolling, display, onRender }) => {
  const children = useMemo(() => {
    const children = []

    let index = firstRowIndex * display.columns.total
    const max = Math.min(display.total, index + display.viewport.rows.total * display.viewport.columns.total)

    for (index; index < max; index++) {
      const row = Math.min(display.rows.total, Math.floor(index / display.columns.total))
      const column = index % display.columns.total

      children.push({
        key: `${row}-${column}`,
        index,
        scrolling,
        style: {
          position: 'absolute',
          height: display.rows.height,
          width: display.columns.width,
          transform: `translate3d(${column * display.columns.width}px, ${row * display.rows.height}px, 0px)`,
        },
      })
    }

    if (typeof onRender === 'function') {
      onRender(children)
    }

    return children
  }, [firstRowIndex, display, onRender, scrolling])

  return children
}

export default useVirtualGridChildren
