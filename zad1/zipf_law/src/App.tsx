import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ZipfLaw from './assets/ZipfLaw'
import Core from './assets/Core'
import Know90 from './assets/Know90'
import Rzeczowniki from './assets/Rzeczowniki'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/zipf">Prawo Zipfa</Link>
        <Link to="/core">Rdzeń języka</Link>
        <Link to="/know90">Zrozumienie 90% języka</Link>
        <Link to="/rzeczowniki">Najczęstsze rzeczowniki</Link>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/zipf" element={<ZipfLaw />} />
          <Route path="/core" element={<Core />} />
          <Route path="/know90" element={<Know90 />} />
          <Route path="/rzeczowniki" element={<Rzeczowniki />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}