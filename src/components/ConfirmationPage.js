import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { guestName, reservationId, property, totalPrice, checkInDate, checkOutDate } = location.state;

  return (
    <div className="confirmation-page">
      <div className="confirmation-message">
        <h1>Thank you, {guestName}!</h1>
        <p>Your Reservation ID: {reservationId}</p>
        <p>Check-in Date: {checkInDate}</p>
        <p>Check-out Date: {checkOutDate}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <div class = "paymentDetails" >Pay at the property</div>
        <div className="property-details">
          <h2>{property.name}</h2>
          <img className="property-image" src={property.imageUrl} alt={property.name} />
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
