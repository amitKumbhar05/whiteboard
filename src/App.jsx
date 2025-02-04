import React from 'react'
import Canvas from './components/Canvas'
import { Route, Routes } from 'react-router-dom'
import Joinroom from './components/Joinroom'
import "./index.css"
import Login from './components/Auth/Login'

function App() {
  return (
    <Routes>
      <Route path="/canvas/:id" element={<Canvas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room" element={<Joinroom />} />
      {/* Add more routes as needed */}
    </Routes>
  )
}

export default App