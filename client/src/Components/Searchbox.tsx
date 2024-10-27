import React, { useState } from 'react';
import axios from 'axios';

interface City {
  name: string;
}

interface ServiceItem {
  name: string;
  icon: string;
}

const cities: City[] = [
  { name: 'New Delhi' },
  { name: 'Mumbai' },
  { name: 'Bengaluru' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Hyderabad' },
  { name: 'Ahmedabad' },
  { name: 'Pune' },
  { name: 'Jaipur' },
  { name: 'Lucknow' },
  { name: 'Kanpur' },
  { name: 'Nagpur' },
  { name: 'Indore' },
  { name: 'Patna' },
  { name: 'Bhopal' },
  { name: 'Thiruvananthapuram' },
  { name: 'Guwahati' },
  { name: 'Ranchi' },
  { name: 'Bhubaneswar' },
];

const services: ServiceItem[] = [
  { name: 'Restaurants', icon: '🍽️' },
  { name: 'Hotels', icon: '🏨' },
  { name: 'Beauty Spa', icon: '💆' },
  { name: 'Home Decor', icon: '🛋️' },
  { name: 'Hospitals', icon: '🏥' },
  { name: 'Contractors', icon: '👷' },
  { name: 'PG/Hostels', icon: '🏢' },
  { name: 'Dentists', icon: '🦷' },
  { name: 'Gym', icon: '🏋️' },
  { name: 'Courier Service', icon: '📦' },
];

const Searchbox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(cities);
  const [selectedCity, setSelectedCity] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState('');

  const handleCityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Filter cities based on query
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSelectCity = (city: string) => {
    setQuery(city); // Set selected city as input value
    setSelectedCity(city); // Save selected city for submission
    setFilteredCities([]); // Close dropdown after selection
  };

  const handleServiceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setServiceQuery(value);

    // Filter services based on query
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleSelectService = (service: string) => {
    setServiceQuery(service); // Set selected service as input value
    setSelectedService(service); // Save selected service for submission
    setFilteredServices([]); // Close dropdown after selection
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/selection', { city: selectedCity, service: selectedService });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto relative space-y-6">
      {/* City Search Box */}
      <div>
        <label htmlFor="city-search" className="block  text-sm font-medium text-gray-900 dark:text-white">
          Select a City
        </label>
        <input
          type="text"
          id="city-search"
          value={query}
          onChange={handleCityInputChange}
          placeholder="Type to search City..."
          className="bg-gray-50 border border-gray-300 my-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        
        {query && filteredCities.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md max-h-48 w-full overflow-y-auto mt-1 z-10 dark:bg-gray-700 dark:border-gray-600">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city.name)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Service Search Box */}
      <div style={{marginTop:'12px'}}>
        <label htmlFor="service-search" className="block  text-sm font-medium text-gray-900 dark:text-white">
          Select a Service
        </label>
        <input
          type="text"
          id="service-search"
          value={serviceQuery}
          onChange={handleServiceInputChange}
          placeholder="Type to search Services..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        
        {serviceQuery && filteredServices.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md max-h-48 w-full overflow-y-auto mt-1 z-10 dark:bg-gray-700 dark:border-gray-600">
            {filteredServices.map((service, index) => (
              <li
                key={index}
                onClick={() => handleSelectService(service.name)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                {service.icon} {service.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-auto px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mx-auto block"
        disabled={!selectedCity || !selectedService}
      >
        Submit
      </button>
    </form>
  );
};

export default Searchbox;
