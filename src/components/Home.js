import React from 'react';
import '../styles/Home.css';
import SearchBar from './Search-Bar';


const Home = () => {
  return (
    
    <div className="home-frame">
      <div className="Welcome-Text">
       <h1>Βρείτε το επόμενο κατάλυμά σας</h1>
       <h2>Κάντε αναζήτηση σε καταλύματα...</h2>
      </div>
        <SearchBar/>

    </div>
  );
};

export default Home;
