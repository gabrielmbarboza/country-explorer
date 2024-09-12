import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import '../styles/Country.css';

const Country = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token === undefined || token == "" || token === null) {
      navigate("/login")
    }

    const fetchCountries = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await fetch('http://0.0.0.0:3000/api/v1/countries', requestOptions);
        const data = await response.json();

        setCountries(data.data);
        setFilteredCountries(data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const logout = () => {
    localStorage.setItem('token', '');
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 font-color-white">Country Explorer</h1>
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FiUser className="w-6 h-6 font-color-white" />
              <span className="font-color-white">Perfil</span>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Editar Perfil
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FiBell className="mr-2" />
                    Notificações
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center" onClick={logout}>
                    <FiLogOut className="mr-2" />
                    Sair
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center max-w-md mx-auto bg-white rounded-lg overflow-hidden">
            <div className="w-full">
              <input
                className="w-full px-4 py-2 text-gray-700 focus:outline-none"
                type="text"
                placeholder="Procure por um país..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <button
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={`https://flagcdn.com/${country.identifier.toLowerCase()}.svg`}
                alt={`Flag of ${country.name}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{country.name}</h2>
                <p className="text-gray-600">Capital: {country.capital || 'N/A'}</p>
                <p className="text-gray-600">População: {country.population.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedCountry.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
            <img
              src={`https://flagcdn.com/${selectedCountry.identifier.toLowerCase()}.svg`}
              alt={`Flag of ${selectedCountry.name}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="font-semibold">Nome:</p>
                <p>{selectedCountry.name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Capital:</p>
                <p>{selectedCountry.capital || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">População:</p>
                <p>{selectedCountry.population.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Localização:</p>
                <p>{selectedCountry.location}</p>
              </div>
              <div>
                <p className="font-semibold">Área:</p>
                <p>{selectedCountry.area.toLocaleString() || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Línguas:</p>
                <p>
                  {selectedCountry.languages || 'N/A'}
                </p>
              </div>
              <div>
                <p className="font-semibold">Fuso-horários:</p>
                <p>
                  {selectedCountry.timezones || 'N/A'}
                </p>
              </div>
              <div>
                <p className="font-semibold">Mapa:</p>
                <p>
                  Ver no <a href={`https://www.openstreetmap.org/relation/${selectedCountry.osm_code}` || 'N/A'}>OpenStreetMap</a>
                </p>
              </div>
              <div>
                <p className="font-semibold">Moedas:</p>
                <p>
                  {selectedCountry.currencies || 'N/A'}
                </p>
              </div>
            </div>
            <br />
            <div>
                <p className="font-semibold">Histórico:</p>
                <p>
                  {selectedCountry.history || 'N/A'}
                </p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;