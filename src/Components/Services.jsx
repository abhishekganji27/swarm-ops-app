import { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBox } from '@fortawesome/free-solid-svg-icons'; // Import Trash and Box icons

const Services = () => {
  const { isDarkTheme } = useTheme();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/services');
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className={`min-h-screen p-6 ${isDarkTheme ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header Strip */}
      <div className={`p-4 rounded-t-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} text-lg font-bold`}>
        SERVICES
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col rounded-xl shadow-md p-6 transition duration-200 
              ${isDarkTheme ? 'bg-gray-800 text-gray-200' : 'bg-white text-black'} h-full transform hover:scale-105`} // Hover effect
            onClick={() => navigate(`/services/${service.id}`)} // Navigate to the service details page
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2 truncate">{service.name}</h2>
              <FontAwesomeIcon
                icon={faTrash}
                className={`cursor-pointer ${isDarkTheme ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                onClick={() => alert('Trash icon clicked!')} // Alert on trash icon click
              />
            </div>
            <p className="mb-1 flex items-center">
              <FontAwesomeIcon
                icon={faBox} // Using the Box icon to represent Docker service ID
                className={`mr-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`} // ID icon styling
              />
              <strong>ID:</strong>
              <span className={`font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ml-2`}>
                {service.id}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
