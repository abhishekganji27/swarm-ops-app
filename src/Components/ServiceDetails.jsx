import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faIdCard, faImage, faCogs, faNetworkWired, faClock, faTags } from '@fortawesome/free-solid-svg-icons'; // Import additional icons

const ServiceDetails = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const { isDarkTheme } = useTheme(); // Get the theme context
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/services/${id}`);
        if (!response.ok) throw new Error('Service not found');
        const data = await response.json();
        setService(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Define icons for each field
  const icons = {
    ID: faIdCard,
    Image: faImage,
    Replicas: faCogs,
    'Desired State': faCogs,
    'Running State': faCogs,
    'Update Status': faCogs,
    Ports: faNetworkWired,
    Networks: faNetworkWired,
    'Creation Time': faClock,
    Labels: faTags,
  };

  // Render the service details
  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`max-w-4xl mx-auto p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isDarkTheme ? 'bg-black' : 'bg-gray-100'}`}>
        <h2 style={{ fontSize: '2rem', fontWeight: '400', marginBottom: '1rem', textAlign: 'center' }}>
          {service.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display service details */}
          {Object.entries({
            ID: service.id,
            Image: service.image, // Display image URL as text
            Replicas: service.replicas,
            'Desired State': service.desiredState,
            'Running State': service.runningState,
            'Update Status': service.updateStatus,
            Ports: service.ports.join(', '),
            Networks: service.networks.join(', '),
            'Creation Time': new Date(service.creationTime).toLocaleString(),
            // Format labels as a list
            Labels: (
              <ul className="list-disc pl-5">
                {Object.entries(service.labels).map(([key, value]) => (
                  <li key={key} className={` ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>{`${key}: ${value}`}</li>
                ))}
              </ul>
            ),
          }).map(([key, value]) => (
            <div
              key={key}
              className={`p-4 border rounded-lg shadow-sm transition-transform duration-200 ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={icons[key]} className={`mr-2 ${isDarkTheme ? 'text-gray-200' : 'text-black'}`} />
                <h2 className={`font-semibold text-lg ${isDarkTheme ? 'text-gray-200' : 'text-black'}`}>{key}:</h2>
              </div>
              <div className={` ${isDarkTheme ? 'text-gray-200' : 'text-black'}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className={`rounded-lg flex items-center justify-center text-white ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-700'} transition duration-300 ease-in-out font-medium rounded-md text-lg px-4 py-2.5 me-2 mb-2 shadow-md`}
            onClick={() => window.history.back()} // Go back to the previous page
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span className="whitespace-nowrap">Back</span> {/* Prevent text wrapping */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
