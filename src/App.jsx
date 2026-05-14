import SearchBar from "./components/SearchBar";
import WeatherHourly from "./components/WeatherHourly";
import CityAndTemperature from "./components/CityAndTemperature";
import CurrentConditions from "./components/CurrentConditions";
import { useEffect, useState } from "react";
// import LoadingGif from "./assets/gifs/loading-spinner.gif";
import LoadingGif from "./assets/gifs/loading-spinner.svg";

import { FaArrowAltCircleUp } from "react-icons/fa";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState(() => {
    const savedCityName = localStorage.getItem("savedCityName");
    return savedCityName !== null ? savedCityName : "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // const fetchWeatherData = async (city) => {
  //   try {
  //     setError(null);
  //     setLoading(true);
  //     const response = await fetch(
  //       // `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`,
  //       // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  //       `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
  //         city,
  //       )}&appid=${API_KEY}&units=metric`,
  //     );
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     setWeatherData(data);
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // async function fetchWeatherData(city) {
  //   if (!city.trim()) return;
  //   setError(null);
  //   setLoading(true);
  //   console.log("Функция вызвалась");

  //   //   // try {
  //   //   //   const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
  //   //   //   const geoResponse = await fetch(weatherURL);
  //   //   //   const geoData = await geoResponse.json();
  //   //   //   console.log("Result", geoData);

  //   //   //   if (!geoData.results || geoData.results.length === 0) {
  //   //   //     console.error(`City ${cityName} not found`);
  //   //   //     setLoading(false);
  //   //   //     return;
  //   //   //   }

  //   //   //   const { latitude, longitude, name, country } = geoData.results[0];

  //   //   //   const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  //   //   //   const weatherResponse = await fetch(weatherURL);
  //   //   //   const weatherData = await weatherResponse.json();

  //   //   //   setWeatherData({
  //   //   //     city: name,
  //   //   //     country: country,
  //   //   //     temperature: weatherData.current_weather.temperature,
  //   //   //     windspeed: weatherData.current_weather.windspeed,
  //   //   //     isDay: weatherData.current_weather.is_day,
  //   //   //     forecast: {
  //   //   //       max: weatherData.daily?.temperature_2m_max?.[0],
  //   //   //       min: weatherData.daily?.temperature_2m_min?.[0],
  //   //   //     },
  //   //   //   });
  //   //   // } catch (error) {
  //   //   //   console.error(error.message);
  //   //   // } finally {
  //   //   //   setLoading(false);
  //   //   // }

  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  //     );
  //     // console.log("response:", response);
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //     const result = await response.json();

  //     const sunrise = new Date((result.sys.sunrise + result.timezone) * 1000);
  //     const sunset = new Date((result.sys.sunset + result.timezone) * 1000);

  //     const formatTime = (date) =>
  //       date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  //     formatTime(sunrise);
  //     formatTime(sunset);

  //     console.log(result);
  //     setWeatherData(result);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  const handleSearch = (city) => {
    // setCityName(e.target.value);
    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    setCityName(trimmedCity);
    // fetchWeatherData(trimmedCity);
  };

  useEffect(() => {
    localStorage.setItem("savedCityName", cityName);
    console.log("Saved to localStorage: ", cityName);
  }, [cityName]);
  useEffect(() => {
    if (!cityName) return;

    localStorage.setItem("savedCityName", cityName);
  }, [cityName]);

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          // `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`,
          // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
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
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (cityName) {
      fetchWeatherData(cityName);
    }
  }, [cityName]);
  // useEffect(() => {
  //   if (cityName) {
  //     localStorage.setItem("savedCityName", cityName);
  //     handleChangeCity();
  //     fetchWeatherData(cityName);
  //   }

  //   // const reloadPage = (e) => {};
  // }, []);

  return (
    <div className="w-[90%] m-auto ">
      <h1 className="text-center text-purple-500 mt-10 text-3xl mb-14 font-bold md:hover:text-purple-800 duration-300">
        Weather Application
      </h1>

      <SearchBar onSearch={handleSearch} />

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

      {/* {!loading && !error && weatherData && (
        <>
          <CityAndTemperature data={weatherData} />
          <WeatherHoruly data={weatherData} API_KEY={API_KEY} />
          <CurrentConditions data={weatherData} API_KEY={API_KEY} />
        </>
      )} */}
      {loading ? (
        <div className="text-white text-center m-10">Loading...</div>
      ) : error ? (
        <div className="text-purple-500 text-3xl text-center">
          An error occured :(
        </div>
      ) : (
        <>
          {weatherData && (
            <>
              <CityAndTemperature
                data={weatherData}
                setCityName={setCityName}
              />
              <CurrentConditions data={weatherData} />
              <WeatherHourly data={weatherData} API_KEY={API_KEY} />
            </>
          )}
        </>
      )}
      <ScrollToTopButton />
    </div>
  );
}

export default App;
