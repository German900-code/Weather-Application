import React, { useEffect, useState } from "react";
import { FaLocationDot, FaTemperatureHalf } from "react-icons/fa6";
import { formatTemperature } from "../utils/units";

const CityAndTemperature = ({ data, units }) => {
  const [cityTime, setCityTime] = useState(null);

  const changeThermColor = (temp) => {
    if (temp > 25) {
      return "text-red-500";
    } else if (temp > 10) {
      return "text-orange-400";
    }
    return "text-blue-400";
  };

  useEffect(() => {
    if (!data || data.timezone === undefined) return;

    const updateTime = () => {
      // Getting the current UTC time in seconds
      const nowUTC = Math.floor(Date.now() / 1000);

      // Adding the city's timezone offset (data.timezone in seconds)
      const localTimestamp = (nowUTC + data.timezone) * 1000;

      const localDate = new Date(localTimestamp);

      // Formatting manually (to avoid issues with the browser's local timezone)
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Extracting date components in UTC to ensure correct local time display
      const weekday = weekdays[localDate.getUTCDay()];
      const day = localDate.getUTCDate().toString().padStart(2, "0");
      const month = months[localDate.getUTCMonth()];
      const year = localDate.getUTCFullYear();
      const hours = localDate.getUTCHours().toString().padStart(2, "0");
      const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
      const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

      setCityTime(
        `${weekday}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`,
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <section className="mt-10 flex flex-wrap items-start  gap-7 justify-between md:justify-evenly">
      <div className="flex items-center gap-3 flex-col">
        <div className="flex flex-row gap-3 items-center w-full">
          <FaLocationDot className="text-red-600 text-2xl md:hover:scale-125 duration-200 " />
          <h2 className="text-3xl text-purple-500 font-bold md:hover:text-purple-800 duration-300 ">
            {data?.name}, {data?.sys?.country}
          </h2>
        </div>
        <div className="">
          <p className="text-gray-400">{cityTime}</p>
        </div>
      </div>
      <div className="flex items-start gap-2 flex-col md:items-center">
        <div className="flex items-center gap-2">
          <FaTemperatureHalf
            className={`${changeThermColor(data?.main?.temp)} text-2xl md:hover:scale-125 duration-200`}
          />
          <p className="text-purple-500 text-3xl font-bold md:hover:text-purple-800 duration-300  ">
            Temperature: {formatTemperature(data?.main?.temp, units)}{" "}
            {units === "metric" ? "°C" : "°F"}
          </p>
        </div>
        <div>
          <p className="text-gray-400">{data?.weather?.[0].main}</p>
        </div>
      </div>
    </section>
  );
};

export default CityAndTemperature;
