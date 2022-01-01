import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import VirtualGrid from 'react-responsive-virtual-grid'

const DataContext = createContext()

const DataProvider = (props) => {
  const [data, setData] = useState([])
  const findData = useCallback((index) => data[index], [data])

  useEffect(() => {
    setTimeout(() => setData(Array(4000).fill(true).map((_, index) => ({ url: `https://picsum.photos/id/${index}/304/160` }))), 4000)
  }, [])

  return (
    <DataContext.Provider {...props} value={{ findData }} />
  )
}

const Child = ({ style, index, data, readyInViewport, scrolling }) => {
  /** Some ways to access entity data
   * 1. Compute data direclty from Child
   * 2. Use VirtualGrid.childProps to pass data
   * 3. Use React Context to access data
  */

  const { findData } = useContext(DataContext)
  const { url } = findData(index) || data[index] || { url: `https://picsum.photos/id/${index}/304/160` }

  return (
    <div style={{ display: 'flex', ...style }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'gainsboro',
          margin: '1em',
        }}
      >
        <span style={{ position: 'absolute' }}>Pcisum #{index}{scrolling ? ' - Scrolling' : ''}{readyInViewport ? ' - ReadyInViewport' : ''}</span>
        <img
          src={url}
          alt={`Pcisum #${index}`}
          style={{ objectFit: 'cover' }}
          width='100%'
          height='100%'
          loading='lazy'
        />
      </div>
    </div>
  )
}

const App = ({ ...props }) => {
  const data = useMemo(() => Array(200000).fill(true).map((_, index) => ({ url: `https://picsum.photos/id/${index}/304/160` })), [])

  return (
    <section>
      <header style={{ height: '10em', background: 'tan' }}>
        <h1>Header</h1>
      </header>
      <div style={{ margin: '2em' }}>
        <h2>Anywhere, in any Container</h2>
        <DataProvider>
          <VirtualGrid
            total={200000}
            cell={{ height: 300, width: 350 }}
            child={Child}
            childProps={{ data }}
            viewportRowOffset={10}
          />
        </DataProvider>
      </div>
      <footer style={{ height: '10em', background: 'thistle' }}>
        <p>Footer</p>
      </footer>
    </section>
  )
}

export default App
