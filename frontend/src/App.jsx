import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './pages/Profile'
import Expert from './pages/Expert';
import Local from './pages/Local';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path='/expert' element={<Expert />} />
        <Route path='/local' element={<Local />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
