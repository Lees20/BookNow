import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, searchParams } = location.state;

  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(searchParams.guests);

  const formatDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); //Timezone offset
    return d.toISOString().split('T')[0];
  };

  const [checkInDate, setCheckInDate] = useState(formatDate(searchParams.startDate));
  const [checkOutDate, setCheckOutDate] = useState(formatDate(searchParams.endDate));
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    return nights * pricePerNight;
  };

  useEffect(() => {
    const price = calculateTotalPrice(checkInDate, checkOutDate, property.price_per_night);
    setTotalPrice(price);
  }, [checkInDate, checkOutDate, property.price_per_night]);

  const handleBooking = async () => {
    if (!guestName) {
      setMessage('Guest name is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/bookings', {
        property_id: property.id,
        guest_name: guestName,
        guest_count: guestCount,
        check_in: checkInDate,
        check_out: checkOutDate,
      });

      if (response.status === 201) {
        navigate('/confirmation', { state: { guestName, reservationId: response.data.id, property, totalPrice, checkInDate, checkOutDate } });
      } else {
        setMessage('Failed to book the property.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setMessage('Failed to book the property: ' + error.message);
    }
  };

  return (
    <div className="booking-page">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div className="booking-form-container">
        <h2>Booking for {property.name}</h2>
        <img className="property-image" src={property.imageUrl} alt={property.name} />
        <form>
          <label>Guest Name</label>
          <input
            type="text"
            placeholder="Guest Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <label>Guest Count</label>
          <input
            type="number"
            min="1"
            placeholder="Guest Count"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)} 
          />
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
          <button type="button" onClick={handleBooking}>Book</button>
        </form>
        {/* error message or success message will appear */}
        {message && <p>{message}</p>} 
      </div>
    </div>
  );
};

export default BookingPage;
