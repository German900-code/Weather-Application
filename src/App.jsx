import SearchBar from "./components/SearchBar";
import WeatherHoruly from "./components/WeatherHoruly";
import CityAndTemperature from "./components/CityAndTemperature";
import CurrentConditions from "./components/CurrentConditions";
import { useEffect, useState } from "react";
// import LoadingGif from "./assets/gifs/discord-loading.gif";
// import LoadingGif from "./assets/gifs/loading-circle.gif";
import LoadingGif from "./assets/gifs/loading-spinner.gif";
// import LoadingGif from "./assets/gifs/loading.gif";
// import LoadingGif from "./assets/gifs/loop-loading.gif";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("Amsterdam");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "97e2a1ce0f8c36f4bc8b1082223a9ba9";

  async function fetchWeatherData(city) {
    if (!city.trim()) return;
    setLoading(true);
    console.log("Функция вызвалась");

    // try {
    //   const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
    //   const geoResponse = await fetch(weatherURL);
    //   const geoData = await geoResponse.json();
    //   console.log("Result", geoData);

    //   if (!geoData.results || geoData.results.length === 0) {
    //     console.error(`City ${cityName} not found`);
    //     setLoading(false);
    //     return;
    //   }

    //   const { latitude, longitude, name, country } = geoData.results[0];

    //   const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    //   const weatherResponse = await fetch(weatherURL);
    //   const weatherData = await weatherResponse.json();

    //   setWeatherData({
    //     city: name,
    //     country: country,
    //     temperature: weatherData.current_weather.temperature,
    //     windspeed: weatherData.current_weather.windspeed,
    //     isDay: weatherData.current_weather.is_day,
    //     forecast: {
    //       max: weatherData.daily?.temperature_2m_max?.[0],
    //       min: weatherData.daily?.temperature_2m_min?.[0],
    //     },
    //   });
    // } catch (error) {
    //   console.error(error.message);
    // } finally {
    //   setLoading(false);
    // }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      // console.log("response:", response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      const sunrise = new Date((result.sys.sunrise + result.timezone) * 1000);
      const sunset = new Date((result.sys.sunset + result.timezone) * 1000);

      const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      formatTime(sunrise);
      formatTime(sunset);

      console.log(result);
      setWeatherData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const handleChangeCity = (e) => {
    setCityName(e.target.value);
  };
  useEffect(() => {
    if (cityName) {
      fetchWeatherData(cityName);
    }
  }, [cityName]);

  return (
    <div className="w-[70%] m-auto">
      <h1 className="text-center text-white m-10 text-4xl mb-16 font-bold">
        Weather Application
      </h1>

      <SearchBar onSearch={fetchWeatherData} />

      {loading && (
        <div className="flex text-white mt-16 justify-center">
          <img src={LoadingGif} alt="loading..." />
        </div>
      )}

      {error && (
        <div className="text-white text-3xl text-center mt-10">
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
        <div className="text-white text-center">Loading...</div>
      ) : error ? (
        <div className="text-white text-3xl text-center">
          An error occured :(
        </div>
      ) : (
        <>
          {weatherData && (
            <>
              <CityAndTemperature data={weatherData} />
              <WeatherHoruly data={weatherData} />
              <CurrentConditions data={weatherData} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
