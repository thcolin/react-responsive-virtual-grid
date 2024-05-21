import useVirtualGridDisplay from './useVirtualGridDisplay'
import useVirtualGridFirstIndex from './useVirtualGridFirstIndex'
import useVirtualGridChildren from './useVirtualGridChildren'

const useVirtualGrid = ({ cell, total, viewportOffset = 4, viewportRowOffset = 4, onRender, scrollContainer, scrollDirection = 'vertical' }) => {
  const offset = Math.max(2, Math.round((viewportOffset || viewportRowOffset) / 2) * 2)
  const { display, style, ref } = useVirtualGridDisplay({ cell, total, offset }, scrollContainer, scrollDirection)
  const { firstIndex, scrolling } = useVirtualGridFirstIndex(display, scrollContainer, scrollDirection)
  const children = useVirtualGridChildren({ firstIndex, scrolling, display, onRender }, scrollDirection)

  return { container: { ref, style }, children }
}

export default useVirtualGrid
