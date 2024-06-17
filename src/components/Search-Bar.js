import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale'; // Εισαγωγή του locale για μορφή DD/MM/YYYY
import { Add, Remove } from '@mui/icons-material'; // Εισαγωγή των εικονιδίων
import '../styles/Search-Bar.css';

const cities = ['Αθήνα', 'Θεσσαλονίκη', 'Χανιά', 'Κεφαλονιά'];

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1); // Αρχική τιμή 1

  const handleSearch = () => {
    // Εδώ μπορείς να βάλεις τον κώδικα για να εκτελέσεις την αναζήτηση
    console.log({ city, startDate, endDate, guests });
  };

  const handleGuestsChange = (increment) => {
    setGuests((prevGuests) => {
      const newGuests = prevGuests + increment;
      return newGuests >= 1 && newGuests <= 8 ? newGuests : prevGuests;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <div className="search-bar-container">
        <Box className="search-bar">
          <TextField
            select
            label="Πόλη"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Ημερομηνία Άφιξης"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy" // Ορισμός της μορφής ημερομηνίας
          />
          <DatePicker
            label="Ημερομηνία Αναχώρησης"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy" // Ορισμός της μορφής ημερομηνίας
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleGuestsChange(-1)}>
              <Remove />
            </IconButton>
            <TextField
              label="Άτομα"
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              inputProps={{ min: 1, max: 8, readOnly: true }} // Ορισμός ελάχιστης και μέγιστης τιμής
              sx={{ width: 70, textAlign: 'center' }}
            />
            <IconButton onClick={() => handleGuestsChange(1)}>
              <Add />
            </IconButton>
          </Box>
          <Button className="Search-Button"variant="contained" color="primary" onClick={handleSearch}>
            Αναζήτηση
          </Button>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default SearchBar;
