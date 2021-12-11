import React, { memo } from 'react'
import PropTypes from 'prop-types'
import useVirtualGrid from './hooks/useVirtualGrid'

export const VirtualGrid = ({ child: Child, childProps = {}, useChildProps = null, ...props }) => {
  const { container, children } = useVirtualGrid(props)

  return (
    <div {...container}>
      {children.map(({ key, ...props }) => (
        <Child
          {...childProps}
          {...typeof useChildProps === 'function' ? useChildProps(key) : {}}
          key={key}
          {...props}
        />
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
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  useChildProps: PropTypes.func,
}

export default memo(VirtualGrid)
