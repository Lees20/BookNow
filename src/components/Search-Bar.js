import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { Add, Remove } from '@mui/icons-material';
import '../styles/Search-Bar.css';

// Define cities as an array
const cities = ['Αθήνα', 'Θεσσαλονίκη', 'Χανιά', 'Κεφαλονιά'];

const SearchBar = () => {
  // Initialize state variables for city, startDate, endDate, guests, loading, and error
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search operation
  const handleSearch = async () => {
    // Input validation: Ensure the end date is after the start date
    if (startDate && endDate && startDate > endDate) {
      setError('Ημερομηνία άφιξης πρέπει να είναι πριν την αναχώρηση');
      return;
    }

    setLoading(true); // Set loading state to true
    setError(''); // Clear any previous errors

    try {
      // Simulate API call with a delay
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Resolve with a mock response
          resolve({
            data: {
              hotels: [
                { name: 'Hotel Athens', availableRooms: 10 },
                { name: 'Hotel Thessaloniki', availableRooms: 5 },
                { name: 'Hotel Chania', availableRooms: 8 },
                { name: 'Hotel Kefalonia', availableRooms: 4 },
              ],
            },
          });
        }, 1500); // Simulate 1.5 seconds delay
      });

      const data = response.data;
      console.log('Search results:', data);

      // Handle redirection or displaying results here
      // For example, you might want to pass data to another component or navigate to a different page
    } catch (err) {
      setError('Σφάλμα κατά την εκτέλεση της αναζήτησης.'); // Set error message
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Handle guest increment/decrement
  const handleGuestsChange = (increment) => {
    setGuests((prevGuests) => {
      const newGuests = prevGuests + increment;
      return newGuests >= 1 && newGuests <= 8 ? newGuests : prevGuests; // Ensure guest count is within range
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <div className="search-bar-container">
        <Box className="search-bar">
          {/* City selection dropdown */}
          <TextField
            select
            label="Πόλη"
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

          {/* Start Date Picker */}
          <DatePicker
            label="Ημερομηνία Άφιξης"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
            inputFormat="dd/MM/yyyy"
            minDate={new Date()}
          />

          {/* End Date Picker */}
          <DatePicker
            label="Ημερομηνία Αναχώρησης"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
            inputFormat="dd/MM/yyyy"
            minDate={startDate || new Date()}
          />

          {/* Guest Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <IconButton onClick={() => handleGuestsChange(-1)} disabled={guests <= 1}>
              <Remove />
            </IconButton>
            <TextField
              label="Άτομα"
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

          {/* Search Button */}
          <Button
            className="Search-Button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginTop: 3, width: '100%' }}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Αναζήτηση...' : 'Αναζήτηση'} {/* Change button text when loading */}
          </Button>

          {/* Error Message */}
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
