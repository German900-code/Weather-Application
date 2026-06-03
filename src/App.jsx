import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import WeatherHourly from "./components/WeatherHourly";
import CityAndTemperature from "./components/CityAndTemperature";
import CurrentConditions from "./components/CurrentConditions";
import ScrollToTopButton from "./components/ScrollToTopButton";

import { getUserLocation } from "./utils/geolocation";

import { FaArrowAltCircleUp } from "react-icons/fa";
import LoadingGif from "./assets/gifs/loading-spinner.svg";
import Footer from "./components/Footer";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");
  // State variable to hold the current city name, initialized from localStorage if available
  const [cityName, setCityName] = useState(() => {
    const savedCityName = localStorage.getItem("savedCityName");
    return savedCityName !== null ? savedCityName : "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather by location");
      }

      const data = await response.json();

      setWeatherData(data);
      setCityName(data.name);
      localStorage.setItem("city", data.name);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    setCityName(trimmedCity);
  };

  const handleUseLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const { lat, lon } = await getUserLocation();

      await fetchWeatherByCoords(lat, lon);
    } catch (error) {
      if (error.code === 1) {
        setError("Location access denied");
      } else if (error.code === 2) {
        setError("Location is unvailable");
      } else if (error.code === 3) {
        setError("Location request timed out");
      } else {
        setError(error.message || "Failed to get your location");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };

  // Save cityName to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedCityName", cityName);
  }, [cityName]);

  // Load cityName from localStorage on component mount
  useEffect(() => {
    if (!cityName) return;

    localStorage.setItem("savedCityName", cityName);
  }, [cityName]);

  // Fetch weather data when cityName changes
  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city,
          )}&appid=${API_KEY}&units=metric`,
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (cityName) {
      fetchWeatherData(cityName);
    }
  }, [cityName]);

  return (
    <div className="w-[90%] m-auto ">
      <h1 className="text-center text-purple-500 mt-10 text-3xl mb-14 font-bold md:hover:text-purple-800 duration-300 lg:text-5xl">
        Weather Forecast
      </h1>

      <SearchBar
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
        units={units}
        loading={loading}
        toggleUnits={toggleUnits}
      />

      {loading && (
        <div
          className={`flex text-white mt-16 justify-center transition-all duration-700 ease-out ${loading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
        >
          <img src={LoadingGif} alt="loading..." />
        </div>
      )}

      {error && (
        <div className="text-white text-3xl text-center m-10">
          City not found
        </div>
      )}
      {/* Weather Data when available */}
      {loading ? (
        <div className="text-purple-600 text-center m-10">Loading...</div>
      ) : error ? (
        <div className="text-purple-500 text-3xl text-center">
          An error occured 😒
        </div>
      ) : (
        <>
          {weatherData && (
            <>
              <CityAndTemperature
                data={weatherData}
                setCityName={setCityName}
                units={units}
              />
              <CurrentConditions data={weatherData} units={units} />
              <WeatherHourly
                data={weatherData}
                API_KEY={API_KEY}
                units={units}
              />
            </>
          )}
        </>
      )}
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
