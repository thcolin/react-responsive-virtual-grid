import React from 'react'
import VirtualGrid from 'react-responsive-virtual-grid'

const Item = ({ style, index }) => (
  <div style={{ backgroundColor: 'gainsboro', ...style }}>
    <img
      src={`https://picsum.photos/id/${index}/304/160`}
      alt={`Pcisum placeholder #${index}`}
      style={{ objectFit: 'cover' }}
      width='100%'
      height='100%'
      loading='lazy'
    />
  </div>
)

const App = ({ ...props }) => {
  return (
    <section>
      <header style={{ height: '10em', background: 'tan' }}>
        <h1>Header</h1>
      </header>
      <div style={{ margin: '2em' }}>
        <h2>Anywhere, in any Container</h2>
        <VirtualGrid
          total={4000}
          cell={{ height: 304, width: 160 }}
          render={Item}
          viewportRowOffset={10}
        />
      </div>
      <footer style={{ height: '10em', background: 'thistle' }}>
        <p>Footer</p>
      </footer>
    </section>
  )
}

export default App
