import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/api';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
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
