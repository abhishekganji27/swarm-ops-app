import { useState, useEffect } from 'react';

const Home = () => {
  const [obj, setMessage] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://backend:5000/');
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>{obj}</h1>
    </>
  );
};

export default Home;