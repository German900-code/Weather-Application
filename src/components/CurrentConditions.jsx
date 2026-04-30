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

const CurrentConditions = ({ data, API_KEY }) => {
  const [airData, setAirData] = useState(null);
  // if (!data) return null;
  const rain = data.rain?.["1h"];
  const snow = data.snow?.["1h"];
  const precipitation = (rain ?? 0) + (snow ?? 0);

  async function getAirQuality(lat, lon) {
    // const { lat, lon } = data.coord;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      );
      if (!response.ok) return;
      const result = await response.json();
      console.log("Result of fetch API: ", result);
      setAirData(result);
    } catch (error) {
      console.error(error.message);
    }
  }
  const getAQILabel = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good 🟢";
      case 2:
        return "Fair 🟡";
      case 3:
        return "Moderate 🟠";
      case 4:
        return "Poor 🔴";
      case 5:
        return "Very Poor 🟣";
      default:
        return "Unknown";
    }
  };

  function formatTimeWithOffset(unixTime, timezoneOffsetInSeconds) {
    const localUnixTime = unixTime + timezoneOffsetInSeconds;
    const date = new Date(localUnixTime * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    if (!data?.coord) return;

    const { lat, lon } = data.coord;

    getAirQuality(lat, lon);
  }, [data]);

  // useEffect(() => {
  //   if (!data) return;

  //   getAirQuality();
  // }, [data]);

  if (!data) return <p>Loading...</p>;

  // useEffect(() => {
  //   getAirQuality();
  // }, [data]);
  return (
    <div className="m-auto mt-10 max-w-6xl">
      <h2 className="text-white text-3xl text-center mb-7">
        Current Conditions
      </h2>

      <div className="grid grid-cols-4 gap-8">
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiThermometer size={40} className="text-red-500" />
          <p className="text-sm text-gray-400">Temperature</p>
          <p className="text-xl font-semibold">
            {Math.round(data.main.temp)}°C
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiWindy size={40} className="text-gray-400" />

          <p className="text-sm text-gray-400">Wind speed </p>
          <p className="text-xl font-semibold">
            {Math.round(data.wind.speed)} km/h
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiDaySunny size={40} className="text-yellow-400" />
          <p className="text-sm text-gray-400">UV index</p>
          <p className="text-xl font-semibold">4</p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiHumidity size={40} className="text-blue-400" />
          <p className="text-sm text-gray-400">Humidity</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiRain size={40} className="text-gray-500" />
          <p className="text-sm text-gray-400">Precipitation</p>
          <p className="text-xl font-semibold">
            {precipitation > 0 ? `${precipitation} mm` : "No precipitation"}
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiBarometer size={40} className="text-blue-300" />

          <p className="text-sm text-gray-400">Pressure</p>
          <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
        </div>

        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiSunrise size={40} className="text-yellow-200" />

          <p className="text-sm text-gray-400">Sunrise</p>
          <p className="text-xl font-semibold">
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {/* {formatTimeWithOffset(data.sys.sunrise, data.timezone)} */}
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiSunset size={40} className="text-orange-500" />

          <p className="text-sm text-gray-400">Sunset</p>
          <p className="text-xl font-semibold">
            {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {/* {formatTimeWithOffset(data.sys.sunset, data.timezone)} */}
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg col-span-2 backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <WiDust size={40} />

          <p className="text-sm text-gray-400">Air Quality</p>
          <p className="text-xl font-semibold">
            {airData?.list?.[0]?.main?.aqi}{" "}
            {getAQILabel(airData?.list?.[0]?.main?.aqi)}
          </p>
        </div>
        <div className="text-white bg-white/10 p-5 rounded-lg col-span-2 backdrop-blur-md hover:bg-white/20 transition hover:scale-95 duration-300">
          <ImEye size={35} className="text-green-400" />

          <p className="text-sm text-gray-400">Visibility</p>
          <p className="text-xl font-semibold">
            {(data.visibility / 1000).toFixed(1) + "km"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
