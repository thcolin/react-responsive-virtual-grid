import { useMemo, useState } from 'react'
import nanobounce from 'nanobounce'

const useVirtualGridChildren = ({ firstIndex, scrolling, display, onRender }, scrollDirection) => {
  const [readyInViewport, setReadyInViewport] = useState([])
  const debounce = useMemo(() => nanobounce(200), [])

  const children = useMemo(() => {
    const children = {}

    let index = {
      vertical: firstIndex * display.columns.total,
      horizontal: firstIndex * display.rows.total,
    }[scrollDirection]

    const max = {
      vertical: Math.min(display.total, index + display.viewport.rows.total * display.viewport.columns.total),
      horizontal: Math.min(display.total, index + display.viewport.columns.total * display.viewport.rows.total),
    }[scrollDirection]

    for (index; index < max; index++) {
      const row = {
        vertical: Math.min(display.rows.total, Math.floor(index / display.columns.total)),
        horizontal: index % display.rows.total,
      }[scrollDirection]

      const column = {
        vertical: index % display.columns.total,
        horizontal: Math.min(display.columns.total, Math.floor(index / display.rows.total)),
      }[scrollDirection]

      children[`${row}-${column}`] = {
        key: `${row}-${column}`,
        index,
        scrolling,
        readyInViewport: !scrolling || readyInViewport.includes(`${row}-${column}`),
        style: {
          position: 'absolute',
          height: display.rows.height,
          width: display.columns.width,
          transform: `translate3d(${column * display.columns.width}px, ${row * display.rows.height}px, 0px)`,
        },
      }
    }

    if (typeof onRender === 'function') {
      onRender(Object.values(children))
    }

    if (scrolling) {
      debounce(() => setReadyInViewport(Object.keys(children)))
    } else {
      // remove last setReadyInViewport callback
      debounce(() => {})
      setReadyInViewport(Object.keys(children))
    }

    return Object.values(children)
  }, [firstIndex, display, onRender, scrolling, scrollDirection])

  return children
}

export default useVirtualGridChildren
