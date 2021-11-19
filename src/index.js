import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useVirtualGrid from './hooks/useVirtualGrid'

export const VirtualGrid = ({ render: Child, ...props }) => {
  const [container, setContainer] = useState({})
  const { raw, display } = useVirtualGrid({ ...props, container })

  return (
    <div ref={(el) => setContainer(el)} style={display.container}>
      {raw.map(({ key, ...props }) => (
        <Child key={key} {...props} />
      ))}
    </div>
  )
}

VirtualGrid.propTypes = {
  cell: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  total: PropTypes.number.isRequired,
  onRender: PropTypes.func,
  viewportRowOffset: PropTypes.number,
  render: PropTypes.func.isRequired,
  windowResizeDebounce: PropTypes.number,
  scrollDebounce: PropTypes.number,
}

export default VirtualGrid
