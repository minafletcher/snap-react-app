import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import SnapStudio from './snapStudio.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
    <React.StrictMode>
    <SnapStudio />
  </React.StrictMode>
)