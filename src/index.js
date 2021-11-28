import React, { memo } from 'react'
import PropTypes from 'prop-types'
import useVirtualGrid from './hooks/useVirtualGrid'

export const VirtualGrid = ({ render: Child, ...props }) => {
  const { container, children } = useVirtualGrid(props)

  return (
    <div {...container}>
      {children.map(({ key, ...props }) => (
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
}

export default memo(VirtualGrid)
