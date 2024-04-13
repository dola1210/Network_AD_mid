import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Bbs from './bbs.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('counter')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('MsgBoard')).render(
  <React.StrictMode>
    <Bbs />
  </React.StrictMode>,
)