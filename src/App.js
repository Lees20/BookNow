// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ResultsPage from './components/ResultsPage';
import Home from './components/Home';
import BookingPage from './components/BookingPage';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        {/* <Footer /> */}
      </div>

    </Router>
  );
}

export default App;
