import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/api'; // import API service for fetching properties

const PropertiesList = () => {
  // state variables to manage properties, loading state, and error messages
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch properties when the component mounts
  useEffect(() => {
    // define an async function to fetch properties
    const getProperties = async () => {
      try {
        // fetching properties with API
        const data = await fetchProperties();
        // set the fetched properties in the state
        setProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        // when loading is done, we set the loading to false
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>{property.name} - {property.region}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesList;
