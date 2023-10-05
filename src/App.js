import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Route as RouteV6 } from 'react-router-dom'; // Import the necessary components
import CryptoMarket from './components/CryptoMarket';
import CryptoNews from './components/CryptoNews';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/market">Market</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <RouteV6 path="/market" element={<CryptoMarket />} />
          <RouteV6 path="/news" element={<CryptoNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
