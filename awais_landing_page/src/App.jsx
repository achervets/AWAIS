import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Service1 from './pages/services/Service1'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/service1' element={<Service1 />} />
    </Routes>
  )
}