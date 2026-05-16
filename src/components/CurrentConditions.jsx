import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import WeatherConditionCard from "./WeatherConditionCard";

const CurrentConditions = ({ data, API_KEY }) => {
  const [airData, setAirData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const lat = data?.coord?.lat;
  const lon = data?.coord?.lon;
  const rain = data.rain?.["1h"];
  const snow = data.snow?.["1h"];
  const precipitation = (rain ?? 0) + (snow ?? 0);

  const UV_API_KEY = import.meta.env.VITE_UV_API_KEY;

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return "Good 🟢";
    if (aqi <= 100) return "Fair 🟡";
    if (aqi <= 150) return "Moderate 🟠";
    if (aqi <= 200) return "Poor 🔴";
    if (aqi <= 300) return "Very Poor 🟣";
    return "Hazardous ⚠️";
  };

  const getUVLevel = (uv) => {
    if (uv <= 2) return "Low 🟢";
    if (uv <= 5) return "Moderate 🟡";
    if (uv <= 7) return "High 🟠";
    if (uv <= 10) return "Very High 🔴";
    return "Extreme 🟣";
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
      value: `${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    },
    {
      id: "sunset",
      icon: <WiSunset size={40} className="text-orange-500" />,
      name: "Sunset",
      value: `${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
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

  // const fetchUVIndex = async (lat, lon) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.weatherapi.com/v1/current.json?key=${UV_API_KEY}&q=${lat},${lon}&aqi=yes`,
  //     );
  //     console.log("Response of fetch UV Index: ", response);
  //     const data = await response.json();
  //     console.log("UV DATA: ", data);

  //     if (!response.ok) {
  //       console.log(
  //         "Failed to fetch UV index. Response status: ",
  //         response.status,
  //       );
  //       return;
  //     }
  //     console.log("UV Index data: ", data);
  //     setUvIndex(Math.floor(data.current.uv));
  //     console.log("CURRENT UV INDEX: ", data.current.uv);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // async function getAirQuality(lat, lon) {
  //   // const { lat, lon } = data.coord;
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  //     );
  //     if (!response.ok) return;
  //     const result = await response.json();
  //     console.log("Result of fetch API: ", result);
  //     setAirData(result);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
  // const getAQILabel = (aqi) => {
  //   switch (aqi) {
  //     case 1:
  //       return "Good 🟢";
  //     case 2:
  //       return "Fair 🟡";
  //     case 3:
  //       return "Moderate 🟠";
  //     case 4:
  //       return "Poor 🔴";
  //     case 5:
  //       return "Very Poor 🟣";
  //     default:
  //       return "Unknown";
  //   }
  // };

  // const getUVLevel = (uv) => {
  //   if (uv <= 2) return "Low 🟢";
  //   if (uv <= 5) return "Moderate 🟡";
  //   if (uv <= 7) return "High 🟠";
  //   if (uv <= 10) return "Very High 🔴";
  //   return "Extreme 🟣";
  // };

  function formatTimeWithOffset(unixTime, timezoneOffsetInSeconds) {
    const localUnixTime = unixTime + timezoneOffsetInSeconds;
    const date = new Date(localUnixTime * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchUVAndAirIndex = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${UV_API_KEY}&q=${lat},${lon}&aqi=yes`,
        );
        console.log("Response of fetch UV Index: ", response);
        const data = await response.json();
        console.log("UV DATA: ", data);

        if (!response.ok) {
          console.log(
            "Failed to fetch UV index. Response status: ",
            response.status,
          );
          return;
        }
        console.log("UV Index data: ", data);
        if (data.current.uv) {
          setUvIndex(data.current.uv);
        }
        // setUvIndex(Math.floor(data.current.uv));
        if (data.current.air_quality.o3) {
          setAirData(data.current.air_quality.o3);
        }

        console.log("CURRENT UV INDEX: ", data.current.uv);
        console.log("CURRENT AIR QUALITY: ", data.current.air_quality.o3);
      } catch (error) {
        console.error(error.message);
      }
    };

    // async function getAirQuality(lat, lon) {
    //   // const { lat, lon } = data.coord;
    //   try {
    //     const response = await fetch(
    //       `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    //     );
    //     console.log("Response of fetch API AIR POLLUTION: ", response);
    //     if (!response.ok) return;
    //     const result = await response.json();
    //     console.log("Result of fetch API AIR POLLUTION: ", result);
    //     setAirData(result);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // }
    // const { lat, lon } = data.coord;

    fetchUVAndAirIndex(lat, lon);
    // getAirQuality(lat, lon);
  }, [lat, lon]);

  // useEffect(() => {
  //   if (!data) return;

  //   getAirQuality();
  // }, [data]);

  // useEffect(() => {
  //   getAirQuality();
  // }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <main className="m-auto mt-10 max-w-6xl md:w-[70%]">
      <h2 className="text-purple-500 text-3xl text-center mb-12 md:hover:text-purple-800 duration-300 md:m-14">
        Current Conditions
      </h2>

      {/* <WeatherConditionCard data={data} /> */}
      <motion.div
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
