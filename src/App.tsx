import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Analytics from './pages/Analytics/Analytics';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <BrowserRouter>
          <NavBar />
          <div className="page-content">
            <header className="App-header">
              <h1>Recruiting Pipeline</h1>
            </header>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
