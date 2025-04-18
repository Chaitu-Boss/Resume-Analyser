import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './Routes';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <Router>
      <Navbar />
      <AllRoutes />
    </Router>

  )
}

export default App
