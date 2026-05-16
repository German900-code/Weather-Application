import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";
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
import LoadingGif from "../assets/gifs/loading-spinner.svg";

const WeatherHourly = ({ API_KEY, data }) => {
  console.log("API KEY", API_KEY);
  const [weatherByHours, setWeatherByHours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // if (!weatherByHours) return;
    async function getWeatherHourly(lat, lon) {
      console.log("FETCH STARTED", lat, lon);

      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(url);
        console.log("Response of WEATHER HOURLY:", response);
        if (!response.ok) {
          console.log("NOT ok status:", response.status);
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log("RESULT OF WEATHER HOURLY: ", result);
        setWeatherByHours(result.list);
      } catch (error) {
        console.error("ERROR: ", error.message);
      } finally {
        setLoading(false);
      }
    }

    const lat = data?.coord?.lat;
    const lon = data?.coord?.lon;

    console.log("LAT LON:", lat, lon);

    if (!lat || !lon) return;

    getWeatherHourly(lat, lon);
  }, [data]);

  // useEffect(() => {
  //   if (!weatherByHours) return;
  //   // const now = Date.now();

  //   // setFilteredData(nextTwoDays);
  // }, [weatherByHours]);
  // useEffect(() => {
  //   if (!data?.coord) return;

  //   const { lat, lon } = data.coord;

  //   getWeatherHourly(lat, lon);
  // }, [data?.coord?.lat, data?.coord?.lon]);
  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   if (!data?.cord || weatherByHours) return;

  //   const { lat, lon } = data.coord;

  //   getWeatherData(lat, lon);
  // }, [data?.coord?.lat, data?.coord?.lon]);

  if (loading)
    return (
      <div
        className={`flex text-white mt-16 justify-center transition-all duration-700 ease-out ${loading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        <img src={LoadingGif} alt="loading..." />
      </div>
    );

  // let groupedData = "";
  // const now = Date.now();

  // useEffect(() => {
  //   const now = Date.now();
  //   const nextTwoDays = weatherByHours.filter(
  //     (item) => item.dt * 1000 <= now + 2 * 24 * 60 * 60 * 1000,
  //   );
  //   const groupedData = nextTwoDays.reduce((acc, item) => {
  //     const date = new Date(item.dt * 1000);

  //     const dayKey = date.toLocaleDateString("en-GB", {
  //       weekday: "long",
  //       day: "2-digit",
  //       month: "short",
  //     });

  //     if (!acc[dayKey]) acc[dayKey] = [];

  //     acc[dayKey].push(item);

  //     return acc;
  //   }, {});
  // }, []);

  if (loading) return;
  const now = new Date().getTime();

  const nextTwoDays =
    weatherByHours?.filter(
      (item) => item.dt * 1000 <= now + 2 * 24 * 60 * 60 * 1000,
    ) || [];

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
    <div
      // className="flex flex-wrap items-center justify-around mt-14 gap-5"
      className="flex flex-col gap-8 mt-14 md:w-[70%] m-auto"
    >
      <h2 className="text-purple-500 md:hover:text-purple-800 duration-300 text-3xl text-center mb-5">
        The coming days
      </h2>
      <div className="flex flex-wrap justify-evenly gap-5">
        {Object.keys(groupedData).map((day) => (
          <div key={day} className="w-full">
            <h2 className="text-purple-500 text-xl mb-4 font-bold">{day}</h2>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide  ">
              {groupedData[day].map((item, index) => {
                const date = new Date(item.dt * 1000);

                const time = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const weatherType = item?.weather[0].main;
                // let typeOfWeather = [];

                // for (let i = 0; i < item.list.length; i++) {
                //   typeOfWeather.push(item?.list?.[i]?.weather.main);
                // }
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="min-w-[120px] bg-white/10 p-5 rounded-xl text-center backdrop-blur-md md:hover:bg-white/20 transition transition-transform duration-300 transform will-change-transform transition md:hover:scale-95 duration-300 hover:border-2 border-purple-500 duration-300"
                  >
                    <p className="text-white font-bold mb-3">{time}</p>
                    {/* {typeOfWeather.map((type, index) => {
                      return <p key={index}>{type}</p>;
                    })} */}
                    {/* <p className="text-white font-bold">
                      {item.list.main.weather}
                    </p> */}
                    <p className="text-white font-bold mb-3">{weatherType}</p>
                    <p className="text-white">{Math.round(item.main.temp)}°C</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
        {/* {filteredData?.slice(0, 10).map((item, index) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("en-GB", {
            weekday: "long",
          });
          const fullDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          });
          const time = new Date(item.dt * 1000).getHours();
          // const days = new Date(item.dt * 1000).getDay();
          console.log("DATA:", data);

          const showDay = day !== lastDay;
          lastDay = day;

          return (
            <div
              key={index}
              className="bg-white/10 p-7 rounded-2xl text-center w-40 h-56 flex flex-col flex-wrap gap-5 items-center backdrop-blur-md hover:bg-white/20 transition hover:scale-95 hover:border-2 border-purple-500 duration-300"
            >
              {showDay && (
                <div className="text-white font-bold text-lg mb-2">
                  {day}, {fullDate}
                </div>
              )}
              <div>
                <span className="text-white font-bold">{day}</span>
                <span className="text-white font-bold">{fullDate}</span>
                <span className="text-white font-bold">{time}:00</span>
                <span className="text-white font-bold">
                  {" "}
                  {Math.floor(item.main.temp)}°C
                </span>
              </div>
            </div>
          );
        })} */}
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

export default WeatherHourly;
