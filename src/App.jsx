import React from 'react'

import './App.css'
import DivePanel from './Panels/SubDive'

import Store from './Redux/Store'
import { CstText } from './Cst'

function App() {
  return (
    <>
      <header>{CstText.Title}</header>

      <main>
        <Store>
          <DivePanel />
        </Store>
      </main>

    </>
  )
}

export default App
