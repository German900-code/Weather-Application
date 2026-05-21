import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import WeatherConditionCard from "./WeatherConditionCard";
import {
  FaTemperatureHalf,
  FaWind,
  FaSun,
  FaSmog,
  FaEyeLowVision,
  FaEyeDropper,
  FaEyeSlash,
} from "react-icons/fa6";
import {
  WiHumidity,
  WiRain,
  WiSunset,
  WiSunrise,
  WiDust,
  WiBarometer,
  WiThermometer,
  WiWindy,
  WiWindDeg,
  WiDaySunny,
} from "react-icons/wi";
import { ImEye } from "react-icons/im";

const CurrentConditions = ({ data }) => {
  const [airData, setAirData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  // Extracting latitude and longitude from the weather data, as well as rain and snow data for precipitation calculation
  const lat = data?.coord?.lat;
  const lon = data?.coord?.lon;
  const rain = data.rain?.["1h"];
  const snow = data.snow?.["1h"];
  const precipitation = (rain ?? 0) + (snow ?? 0);

  const UV_API_KEY = import.meta.env.VITE_UV_API_KEY;

  // Function to get the air quality label based on the AQI value
  const getAQILabel = (aqi) => {
    if (aqi <= 50) return "Good 🟢";
    if (aqi <= 100) return "Fair 🟡";
    if (aqi <= 150) return "Moderate 🟠";
    if (aqi <= 200) return "Poor 🔴";
    if (aqi <= 300) return "Very Poor 🟣";
    return "Hazardous ⚠️";
  };

  // Function to get the UV level label based on the UV index value
  const getUVLevel = (uv) => {
    if (uv <= 2) return "Low 🟢";
    if (uv <= 5) return "Moderate 🟡";
    if (uv <= 7) return "High 🟠";
    if (uv <= 10) return "Very High 🔴";
    return "Extreme 🟣";
  };

  // Function to format the sunrise and sunset times based on the city's timezone
  const formatLocalTime = (timestamp, timezoneOffsetSeconds) => {
    if (!timezoneOffsetSeconds && timezoneOffsetSeconds !== 0) {
      console.warn("No timezone data, using UTC");
      timezoneOffsetSeconds = 0;
    }

    const localTimestamp = (timestamp + timezoneOffsetSeconds) * 1000;
    const date = new Date(localTimestamp);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const weatherConditions = [
    {
      id: "temperature",
      icon: <WiThermometer size={40} className="text-red-500" />,
      name: "Temperature",
      value: `${Math.round(data.main.temp)}°C`,
    },
    {
      id: "wind",
      icon: <WiWindy size={40} className="text-gray-400" />,
      name: "Wind speed",
      value: `${Math.round(data.wind.speed)} km/h`,
    },
    {
      id: "uv",
      icon: <WiDaySunny size={40} className="text-yellow-400" />,
      name: "UV Index",
      value:
        uvIndex !== null
          ? `${Math.floor(uvIndex)} ${getUVLevel(uvIndex)}`
          : "N/D",
    },
    {
      id: "humidity",
      icon: <WiHumidity size={40} className="text-blue-400" />,
      name: "Humidity",
      value: `${data.main.humidity}%`,
    },
    {
      id: "precipitation",
      icon: <WiRain size={40} className="text-gray-500" />,
      name: "Precipitation",
      value: `${precipitation > 0 ? `${precipitation} mm` : "No precipitation"}`,
    },
    {
      id: "pressure",
      icon: <WiBarometer size={40} className="text-blue-300" />,
      name: "Pressure",
      value: `${data.main.pressure} hPa`,
    },
    {
      id: "sunrise",
      icon: <WiSunrise size={40} className="text-yellow-200" />,
      name: "Sunrise",
      value: formatLocalTime(data.sys.sunrise, data.timezone),
    },
    {
      id: "sunset",
      icon: <WiSunset size={40} className="text-orange-500" />,
      name: "Sunset",
      value: formatLocalTime(data.sys.sunset, data.timezone),
    },
    {
      id: "air quality",
      icon: <WiDust size={40} />,
      name: "Air Quality",
      value: `${Math.floor(airData)} ${getAQILabel(airData)}`,
    },
    {
      id: "visibility",
      icon: <ImEye size={35} className="text-green-400" />,
      name: "Visibility",
      value: `${(data.visibility / 1000).toFixed(1) + "km"}`,
    },
  ];

  // Framer Motion variants for container and item animations
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (!lat || !lon) return;

    // Function to fetch UV index and air quality data based on latitude and longitude
    const fetchUVAndAirIndex = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${UV_API_KEY}&q=${lat},${lon}&aqi=yes`,
        );
        const data = await response.json();

        if (!response.ok) {
          console.log(
            "Failed to fetch UV index. Response status: ",
            response.status,
          );
          return;
        }
        if (data.current.uv) {
          setUvIndex(data.current.uv);
        }
        if (data.current.air_quality.o3) {
          setAirData(data.current.air_quality.o3);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUVAndAirIndex(lat, lon);
  }, [lat, lon]);

  if (!data) return <p>Loading...</p>;

  return (
    <main className="m-auto mt-10 max-w-6xl md:w-[70%]">
      <h2 className="text-purple-500 text-3xl text-center mb-12 md:hover:text-purple-800 duration-300 md:m-14">
        Current Conditions
      </h2>

      <motion.div
        // Framer Motion container with staggered children animation for the weather condition cards
        variants={container}
        className="grid grid-cols-2 gap-8 "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, duration: 0.5 }}
      >
        {weatherConditions.map((condition) => (
          <WeatherConditionCard
            item={item}
            id={condition.id}
            icon={condition.icon}
            name={condition.name}
            value={condition.value}
          />
        ))}
      </motion.div>
    </main>
  );
};

export default CurrentConditions;
