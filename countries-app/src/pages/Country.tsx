import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiBell, FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IApiResponse, ICountry } from "../types";
import { ToastContainer, toast } from 'react-toastify';
import { Api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "../styles/Country.css";

function Country() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Array<ICountry>>([]);
  const [filteredCountries, setFilteredCountries] = useState<Array<ICountry>>(
    []
  );
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await Api.get<IApiResponse>('api/v1/countries');
        const countries = response.data.data;

        setCountries(countries);
        setFilteredCountries(countries);
      } catch (error) {
        toast.error("Opa! Credenciais inválidas");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryClick = (country: ICountry) => {
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

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const getFlagUrl = (identifier: string | null | undefined) => {
    const flagCdnBaseUrl = 'https://flagcdn.com';

    if (!identifier) identifier = 'un';

    return `${flagCdnBaseUrl}/${identifier.toLowerCase()}.svg`;
  }

  const getOSMUrl = (osmCode: string | null | undefined) => {
    const osmBaseUrl = 'https://www.openstreetmap.org/relation';

    if (!osmCode) return "N/A";

    return `${osmBaseUrl}/${osmCode}`;
  }

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/><ToastContainer />
    <div className="common-container">
      <header>
        <div className="container header-container">
          <h1 className="header-title">Country Explorer</h1>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="profile-menu-button">
              <FiUser className="button-size" />
              <span>Perfil</span>
            </button>
            {isProfileMenuOpen && (
              <div className="profile-menu">
                <a href="#" className="profile-menu-item">
                  Editar Perfil
                </a>
                <a href="#" className="profile-menu-item">
                  <div className="flex items-center">
                    <FiBell className="mr-2" />
                    Notificações
                  </div>
                </a>
                <a href="#" className="profile-menu-item">
                  <div className="flex items-center" onClick={handleLogout}>
                    <FiLogOut className="mr-2" />
                    Sair
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className="mb-8">
          <div className="search-input-box">
            <div className="w-full">
              <input
                className="search-input"
                type="text"
                placeholder="Procure por um país..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <button className="search-button">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="content-container">
          {filteredCountries.map((country: ICountry) => (
            <div
              key={country.identifier}
              className="country-box"
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={getFlagUrl(country.identifier)}
                alt={`${country.name}`}
                className="country-flag-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{country.name}</h2>
                <p className="text-gray-600">
                  Capital: {country.capital || "N/A"}
                </p>
                <p className="text-gray-600">
                  População: {country.population?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && selectedCountry && (
        <div className="modal-container">
          <div className="modal-box">
            <div className="modal-header">
              <h2 className="modal-title">{selectedCountry.name}</h2>
              <button onClick={closeModal} className="">
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
            <img
              src={getFlagUrl(selectedCountry.identifier)}
              alt={`${selectedCountry.name}`}
              className="country-flag-cover-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Nome:</p>
                <p>{selectedCountry.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Capital:</p>
                <p>{selectedCountry.capital || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">População:</p>
                <p>{selectedCountry.population?.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Localização:</p>
                <p>{selectedCountry.location}</p>
              </div>
              <div>
                <p className="font-semibold">Área:</p>
                <p>{selectedCountry.area?.toLocaleString() || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Línguas:</p>
                <p>{selectedCountry.languages || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Fuso-horários:</p>
                <p>{selectedCountry.timezones || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Mapa:</p>
                <p>
                  Ver no{" "}
                  <a href={getOSMUrl(selectedCountry.osm_code)} >
                    OpenStreetMap
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold">Moedas:</p>
                <p>{selectedCountry.currency_units || "N/A"}</p>
              </div>
            </div>
            <br />
            <div>
              <p className="font-semibold">Histórico:</p>
              <p>{selectedCountry.history || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Country;
