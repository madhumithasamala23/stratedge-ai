import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Ignite from './pages/Ignite'
import Build from './pages/Build'
import Accelerate from './pages/Accelerate'
import Dominate from './pages/Dominate'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-[#060910] text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ignite" element={<Ignite />} />
        <Route path="/build" element={<Build />} />
        <Route path="/accelerate" element={<Accelerate />} />
        <Route path="/dominate" element={<Dominate />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App