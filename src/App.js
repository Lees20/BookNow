// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ResultsPage from './components/ResultsPage';
import Home from './components/Home';
import BookingPage from './components/BookingPage';
import AboutUs from './components/AboutUs';
import ConfirmationPage from './components/ConfirmationPage';
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
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
