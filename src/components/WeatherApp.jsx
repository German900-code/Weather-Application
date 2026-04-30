import { useState, useEffect, useCallback } from "react";

// Таблица соответствия кодов погоды человекочитаемым описаниям [citation:1]
const weatherCodes = {
  0: "Ясно",
  1: "Преимущественно ясно",
  2: "Переменная облачность",
  3: "Пасмурно",
  45: "Туман",
  48: "Туман",
  51: "Легкая морось",
  53: "Морось",
  55: "Сильная морось",
  61: "Небольшой дождь",
  63: "Дождь",
  65: "Сильный дождь",
  71: "Небольшой снег",
  73: "Снег",
  75: "Сильный снег",
};

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherDescription = useCallback((code) => {
    return weatherCodes[code] || "Неизвестно";
  }, []);

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Шаг 1: Получить координаты города
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError(`Город "${cityName}" не найден`);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Шаг 2: Получить погоду по координатам [citation:6]
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      // Форматируем данные
      setWeather({
        city: name,
        country: country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weatherCode: weatherData.current_weather.weathercode,
        isDay: weatherData.current_weather.is_day,
        forecast: {
          max: weatherData.daily?.temperature_2m_max?.[0],
          min: weatherData.daily?.temperature_2m_min?.[0],
          code: weatherData.daily?.weather_code?.[0],
        },
      });
    } catch (err) {
      setError("Ошибка при получении данных. Попробуйте позже.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите название города"
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px" }}
        >
          {loading ? "Загрузка..." : "Узнать погоду"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p style={{ fontSize: "48px", margin: "10px 0" }}>
            {weather.temperature}°C
          </p>
          <p>{getWeatherDescription(weather.weatherCode)}</p>
          <p>💨 Ветер: {weather.windspeed} км/ч</p>

          {weather.forecast.max && weather.forecast.min && (
            <div>
              <p>📈 Макс: {weather.forecast.max}°C</p>
              <p>📉 Мин: {weather.forecast.min}°C</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
