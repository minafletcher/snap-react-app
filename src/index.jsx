import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import SnapStudio from './snapStudio.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
    <React.StrictMode>
    <BrowserRouter>
      <SnapStudio />
    </BrowserRouter>
  </React.StrictMode>
)