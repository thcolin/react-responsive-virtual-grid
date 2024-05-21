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
          key={key}
          {...typeof useChildProps === 'function' ? useChildProps(key) : {}}
          {...props}
        />
      ))}
    </div>
  )
}

VirtualGrid.propTypes = {
  cell: PropTypes.oneOfType([
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number,
    }).isRequired,
    PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number.isRequired,
    }).isRequired,
  ]),
  total: PropTypes.number.isRequired,
  onRender: PropTypes.func,
  viewportOffset: PropTypes.number,
  viewportRowOffset: PropTypes.number,
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  useChildProps: PropTypes.func,
  scrollContainer: PropTypes.object,
  scrollDirection: PropTypes.oneOf(['horizontal', 'vertical']),
}

VirtualGrid.defaultProps = {
  scrollDirection: 'vertical',
}

export default memo(VirtualGrid)
