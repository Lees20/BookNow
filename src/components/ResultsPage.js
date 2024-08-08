import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { properties, searchParams } = location.state || { properties: [], searchParams: {} };

  const handleBackClick = () => {
    navigate('/');
  };

  const handlePropertyClick = (property) => {
    navigate('/booking', { state: { property, searchParams } });
  };

  return (
    <div className="results-page">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="property-list">
        {properties.map((property) => (
          <div className="property-card" key={property.id} onClick={() => handlePropertyClick(property)}>
            <img src={property.imageUrl} alt={property.name} className="property-image" />
            <div className="property-details">
              <h3>{property.name}</h3>
              <p>{property.description}</p>
              <p className="price">${property.price_per_night} per night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
