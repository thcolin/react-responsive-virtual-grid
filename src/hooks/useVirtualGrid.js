import useVirtualGridDisplay from './useVirtualGridDisplay'
import useVirtualGridFirstRowIndex from './useVirtualGridFirstRowIndex'
import useVirtualGridChildren from './useVirtualGridChildren'

const useVirtualGrid = ({ cell, total, viewportRowOffset = 4, onRender, scrollContainer }) => {
  const rowOffset = Math.max(2, Math.round(viewportRowOffset / 2) * 2)
  const { display, style, ref } = useVirtualGridDisplay({ cell, total, rowOffset })
  const { firstRowIndex, scrolling } = useVirtualGridFirstRowIndex(display, scrollContainer)
  const children = useVirtualGridChildren({ firstRowIndex, scrolling, display, onRender })

  return { container: { ref, style }, children }
}

export default useVirtualGrid
