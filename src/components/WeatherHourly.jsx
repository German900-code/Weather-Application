import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { getTemperatureUnit, formatTemperature } from "../utils/units";
import { FaCloud, FaSun, FaSnowflake, FaMoon } from "react-icons/fa";
import {
  WiCloudy,
  WiRain,
  WiDaySunny,
  WiDaySnow,
  WiCloudDown,
  WiDayCloudy,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiMoonNew,
  WiNightAltCloudy,
  WiNightAltHail,
  WiNightClear,
} from "react-icons/wi";
import { IoMoonOutline } from "react-icons/io5";
import Sun from "../assets/images/sun.svg";
import Cloud from "../assets/images/cloud.svg";
import CloudWithRain from "../assets/images/cloud-with-rain.svg";
import CloudWithSnow from "../assets/images/cloud-with-snow.svg";
import CloudWithLightning from "../assets/images/cloud-with-lightning-and-rain.svg";
import SunBehindCloud from "../assets/images/sun-behind-cloud.svg";
import SunBehindRainCloud from "../assets/images/sun-behind-rain-cloud.svg";
import LoadingGif from "../assets/gifs/loading-spinner.svg";

const WeatherHourly = ({ API_KEY, data, units }) => {
  const [weatherByHours, setWeatherByHours] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWeatherHourly(lat, lon) {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setWeatherByHours(result.list);
      } catch (error) {
        console.error("ERROR: ", error.message);
      } finally {
        setLoading(false);
      }
    }

    const lat = data?.coord?.lat;
    const lon = data?.coord?.lon;

    if (!lat || !lon) return;

    getWeatherHourly(lat, lon);
  }, [data]);

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return Sun;
      case "Clouds":
        return Cloud;
      case "Rain":
        return CloudWithRain;
      case "Snow":
        return CloudWithSnow;
      case "Thunderstorm":
        return CloudWithLightning;
      default:
        return Sun;
    }
  };

  if (loading)
    return (
      <div
        className={`flex text-white mt-16 justify-center transition-all duration-700 ease-out ${loading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        <img src={LoadingGif} alt="loading..." />
      </div>
    );

  if (loading) return;
  const now = new Date().getTime();

  // Filtering the hourly data to include only the next 48 hours
  const nextTwoDays =
    weatherByHours?.filter(
      (item) => item.dt * 1000 <= now + 2 * 24 * 60 * 60 * 1000,
    ) || [];

  // Grouping the hourly data by day for easier rendering
  const groupedData = nextTwoDays.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);

    const dayKey = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });

    if (!acc[dayKey]) acc[dayKey] = [];

    acc[dayKey].push(item);

    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 mt-14 md:w-[70%] m-auto">
      <h2 className="text-purple-500 md:hover:text-purple-800 duration-300 text-3xl text-center mb-5">
        The coming days
      </h2>
      <div className="flex flex-wrap justify-evenly gap-5">
        {Object.keys(groupedData).map((day) => (
          <motion.div key={day} className="w-full" whileHover={{ y: -5 }}>
            <h2 className="text-purple-500 text-xl mb-4 font-bold">{day}</h2>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide  ">
              {groupedData[day].map((item, index) => {
                const date = new Date(item.dt * 1000);

                const time = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const weatherType = item?.weather[0].main;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="min-w-[120px] bg-white/10 p-5 rounded-xl text-center backdrop-blur-md md:hover:bg-white/20 transition-all  duration-300 transform will-change-transform  md:hover:scale-95 hover:border-2 border-purple-500 "
                  >
                    <p className="text-white font-bold mb-3">{time}</p>

                    <img
                      src={getWeatherIcon(weatherType)}
                      alt={weatherType}
                      className="mx-auto mb-3"
                      width={40}
                      height="auto"
                    />
                    <p className="text-white">
                      {formatTemperature(item.main.temp, units)}
                      {units === "metric" ? " °C" : " °F"}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherHourly;
