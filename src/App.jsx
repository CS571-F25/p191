import { HashRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import ShipCodex from './components/ShipCodex'
import ShipDetail from './components/ShipDetail'
import World from './components/World'
import FactionDetail from './components/FactionDetail'
import Discussion from './components/Discussion'
import DiscussionDetail from './components/DiscussionDetail'
import Login from './components/Login'
import COSMEC from './components/COSMEC'
import COSMECShipCodex from './components/COSMECShipCodex'
import COSMECShipDetail from './components/COSMECShipDetail'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Secret COSMEC routes without standard layout */}
        <Route path="/cosmec" element={<COSMEC />} />
        <Route path="/cosmec/ships" element={<COSMECShipCodex />} />
        <Route path="/cosmec/ships/:shipId" element={<COSMECShipDetail />} />
        
        {/* Standard routes with Navigation and Footer */}
        <Route path="*" element={
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1 main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ships" element={<ShipCodex />} />
                <Route path="/ships/:shipId" element={<ShipDetail />} />
                <Route path="/world" element={<World />} />
                <Route path="/factions/:factionId" element={<FactionDetail />} />
                <Route path="/discussion" element={<Discussion />} />
                <Route path="/discussion/:postId" element={<DiscussionDetail />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </HashRouter>
  )
}

export default App
