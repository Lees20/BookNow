import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/Search-Bar.css'; // Importing CSS

// list of cities available for selection
const cities = ['Athens', 'Thessaloniki', 'Chania', 'Kefalonia'];

const SearchBar = () => {
  // state variables for storing form data and status
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
// function to handle guest count changes
  const handleGuestsChange = (delta) => {
    setGuests((prevGuests) => Math.min(8, Math.max(1, prevGuests + delta)));
  };
// function to handle the search action
  const handleSearch = async () => {
    // validates that all fields are filled
    if (!city || !startDate || !endDate || !guests) {
      setError('All fields are required.');
      return;
    }
    // set loading state and clear previous errors
    setLoading(true);
    setError('');

    try {
      // fetch properties based on search parameters
      const response = await fetch(
        `http://localhost:3000/api/properties?city=${city}&startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}&guests=${guests}`
      );
     // parse the response data
      const data = await response.json();
      
      console.log('Search data:', data); // Log the received data for debugging
     // check if there are properties in the response
      if (data.properties && data.properties.length > 0) {
        // navigate to results page with properties and search parameters
        navigate('/results', { state: { properties: data.properties, searchParams: { city, startDate, endDate, guests } } });
      } else {
        setError('No results found');
      }
    } catch (err) {
      console.error('Error in search:', err); // Log the error for debugging
      setError('Error in search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <div className="search-bar-container">
        <Box className="search-bar">
          <TextField
            select
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Check-in Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
            inputFormat="dd/MM/yyyy"
            minDate={new Date()}
          />

          <DatePicker
            label="Check-out Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
            inputFormat="dd/MM/yyyy"
            minDate={startDate || new Date()}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <IconButton onClick={() => handleGuestsChange(-1)} disabled={guests <= 1}>
              <Remove />
            </IconButton>
            <TextField
              label="Guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              inputProps={{ min: 1, max: 8, readOnly: true }}
              sx={{ width: 70, textAlign: 'center' }}
              variant="outlined"
            />
            <IconButton onClick={() => handleGuestsChange(1)} disabled={guests >= 8}>
              <Add />
            </IconButton>
          </Box>

          <Button
            className="Search-Button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginTop: 3, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>

          {error && (
            <Box sx={{ color: 'red', marginTop: 2 }}>
              {error}
            </Box>
          )}
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default SearchBar;
