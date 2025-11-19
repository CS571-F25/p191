import { HashRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import ShipCodex from './components/AboutMe'
import Discussion from './components/Portfolio'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1 main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ships" element={<ShipCodex />} />
            <Route path="/discussion" element={<Discussion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
