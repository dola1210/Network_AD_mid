import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Home from './Page/Home.jsx';
import About from './Page/About.jsx';
import Users from './Page/Users.jsx';
import CreateUser from './Page/CreateUser';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* 導航欄 */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createuser" element={<CreateUser />} />
        </Routes>
        <header className="App-header">
        </header>
      </div>
    </Router>
  )
}

export default App
