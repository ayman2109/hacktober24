import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

interface City {
  name: string;
}

interface Service {
  name: string;
  icon: string;
}

const cities: City[] = [
  { name: "New Delhi" },
  { name: "Mumbai" },
  { name: "Bengaluru" },
  { name: "Chennai" },
  { name: "Kolkata" },
  { name: "Hyderabad" },
  { name: "Ahmedabad" },
  { name: "Pune" },
  { name: "Jaipur" },
  { name: "Lucknow" },
  { name: "Kanpur" },
  { name: "Nagpur" },
  { name: "Indore" },
  { name: "Patna" },
  { name: "Bhopal" },
  { name: "Thiruvananthapuram" },
  { name: "Guwahati" },
  { name: "Ranchi" },
  { name: "Bhubaneswar" },
];

const services: Service[] = [
  { name: "Restaurants", icon: "🍽️" },
  { name: "Hotels", icon: "🏨" },
  { name: "Beauty Spa", icon: "💆" },
  { name: "Home Decor", icon: "🛋️" },
  { name: "Hospitals", icon: "🏥" },
  { name: "Contractors", icon: "👷" },
  { name: "PG/Hostels", icon: "🏢" },
  { name: "Dentists", icon: "🦷" },
  { name: "Gym", icon: "🏋️" },
  { name: "Courier Service", icon: "📦" },
];

const Navbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [selectedCity, setSelectedCity] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState("");

  const handleCityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSelectCity = (city: string) => {
    setQuery(city);
    setSelectedCity(city);
    setFilteredCities([]);
  };

  const handleServiceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setServiceQuery(value);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleSelectService = (service: string) => {
    setServiceQuery(service);
    setSelectedService(service);
    setFilteredServices([]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/selection", {
        city: selectedCity,
        service: selectedService,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <nav className="bg-white flex flex-col md:flex-row md:items-center justify-between p-4 shadow-md">
      {/* Form for Search Bars */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
        {/* Location Search Box */}
        <div className="relative flex items-center w-full md:w-auto">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Flowbite
            </span>
          </a>

          <div className="flex items-center ml-0 md:ml-6 space-x-2 w-full md:w-auto">
            
            <input
              type="text"
              value={query}
              onChange={handleCityInputChange}
              placeholder="Select a City"
              className="border rounded-lg p-2 pl-8 pr-8 w-full md:w-48 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {query && filteredCities.length > 0 && (
            <ul className="absolute top-full mt-1 bg-white border rounded-lg shadow-md max-h-48 w-full overflow-y-auto z-10">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCity(city.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Service Search Box */}
        <div className="relative flex items-center w-full md:w-auto">
          <input
            type="text"
            value={serviceQuery}
            onChange={handleServiceInputChange}
            placeholder="Search Services"
            className="border rounded-lg p-2 pl-3 w-full md:w-48 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {serviceQuery && filteredServices.length > 0 && (
            <ul className="absolute top-full mt-1 bg-white border rounded-lg shadow-md max-h-48 w-full overflow-y-auto z-10">
              {filteredServices.map((service, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectService(service.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {service.icon} {service.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Single Magnifying Glass Icon for Submission */}
        <button type="submit" className="text-gray-500 p-2 md:p-0">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {/* Right Section with Nav Items */}
      <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4 w-full md:w-auto">
        {/* Navigation Links */}
        <li>
          <a href="/" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            Home
          </a>
        </li>
        <li>
          <a href="/services" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            Profile
          </a>
        </li>
        <li>
          <a href="/login" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            LogIn
          </a>
        </li>
        <li>
          <a href="/logout" className="block py-2 px-3 text-gray-900 hover:text-blue-700">
            LogOut
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
