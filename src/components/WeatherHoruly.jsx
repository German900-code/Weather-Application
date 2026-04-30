import React, { useEffect, useState } from "react";
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
import LoadingGif from "../assets/gifs/loading-spinner.gif";

const WeatherHoruly = ({ API_KEY, data }) => {
  const [weatherByHours, setWeatherByHours] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  async function getWeatherData({ lat, lon }) {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setWeatherByHours(result);
      console.log("Result of fetching weather hourly: ", result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!data?.coord) return;

    const { lat, lon } = data.coord;

    getWeatherData(lat, lon);
  }, [data?.coord?.lat, data?.coord?.lon]);
  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   if (!data?.cord || weatherByHours) return;

  //   const { lat, lon } = data.coord;

  //   getWeatherData(lat, lon);
  // }, [data?.coord?.lat, data?.coord?.lon]);

  if (!weatherByHours) return <img src={LoadingGif} alt="loading" />;

  return (
    <div
      // className="flex flex-wrap items-center justify-around mt-14 gap-5"
      className="flex flex-col gap-8 mt-14"
    >
      <h2 className="text-white text-3xl text-center mb-7">Next 7 Hours</h2>
      <div className="flex justify-evenly">
        {weatherByHours?.list?.map((item, index) => {
          const time = new Date(item.dt * 1000).getHours();
          return (
            <div
              key={index}
              className="bg-white/10 p-7 rounded-s-2xl text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300"
            >
              <span className="text-white font-bold">{time}:00</span>
              <span className="text-white font-bold"> {item.main.temp}°C</span>
            </div>
          );
        })}
        {/* <div className="bg-white/10 p-7 rounded-2xl text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 8:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiCloudy className="text-gray-400 w-full h-full" />
        </div>

        <div className="bg-white/10 p-7 rounded-2xl text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 9:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiDaySunny className="text-orange-400 w-full h-full" />
        </div>
        <div className="bg-white/10 p-7 rounded-2xl text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 10:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiNightClear className="text-yellow-200 w-full h-full" />
        </div>
        <div className="bg-white/10 p-7 rounded-2xl text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 11:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiRain className="text-blue-300 w-full h-full" />
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="bg-white/10 p-7 rounded-2xl  text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 12:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiDayCloudy className="text-gray-400 w-full h-full" />
        </div>
        <div className="bg-white/10 p-7 rounded-2xl  text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 13:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiThunderstorm className="text-blue-300 w-full h-full" />
        </div>
        <div className="bg-white/10 p-7 rounded-2xl  text-center w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 14:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiSnow className="text-white w-full h-full" />
        </div>
        <div className="bg-white/10 p-7 rounded-2xl text-center  w-40 h-56 flex flex-col gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <span className="text-white font-bold"> 15:00</span>
          <span className="text-white font-bold"> 15°C</span>
          <WiFog className="text-gray-500 w-full h-full" />
        </div> */}
      </div>
    </div>
  );
};

export default WeatherHoruly;
