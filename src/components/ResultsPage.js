import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { properties } = location.state || {};

  const handleBackClick = () => {
    navigate('/');
  };

  if (!properties) {
    return <div>Loading...</div>; // or some other placeholder
  }

  if (properties.length === 0) {
    return (
      <div className="results-container">
        <div className="results-header">
          <button className="back-button" onClick={handleBackClick}>Back</button>
          <div>No properties found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <button className="back-button" onClick={handleBackClick}>Back</button>
        <h1>Results</h1>
      </div>
      <ul className="property-list">
        {properties.map(property => (
          <li className="property-item" key={property.id}>
            {property.imageUrl && <img src={property.imageUrl} alt={property.name} />}
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p>Price per night: {property.price_per_night}</p>
            <p>Total Guests: {property.totalGuests}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
