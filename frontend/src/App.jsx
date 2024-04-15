import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Home from './Page/Home.jsx';
import Msgboard from './Page/Msgboard.jsx';
import Users from './Page/Users.jsx';
import CreateUser from './Page/CreateUser.jsx';
import Login from './Page/login.jsx';
import Logout from './Page/logout.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* 導航欄 */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Msgboard" element={<Msgboard />} />
          <Route path="/user" element={<Users />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <header className="App-header">
        </header>
      </div>
    </Router>
  )
}

export default App
