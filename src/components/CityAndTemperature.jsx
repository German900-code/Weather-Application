import React, { useEffect, useState } from "react";
import { FaLocationDot, FaTemperatureHalf } from "react-icons/fa6";

const CityAndTemperature = ({ data, cityWeather, setCityWeather }) => {
  const [city, setCity] = useState("");
  const [cityTime, setCityTime] = useState(null);

  // const nowUTC = new Date().getTime();

  // const date = new Date(data.dt * 10000);
  // const formattedDate = new Intl.DateTimeFormat("en-GB", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   timeZone: "Europe/Vilnius",
  // }).format(new Date());
  useEffect(() => {
    if (!data) return null;

    const updateTime = () => {
      const time = new Date(Date.now() + data.timezone * 1000);

      setCityTime(
        time.toLocaleString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="mt-16 flex items-start  gap-5 justify-between ">
      <div className="flex items-center gap-3 flex-col">
        <div className="flex flex-row gap-3 items-center">
          <FaLocationDot className="text-red-600 text-3xl hover:scale-125 duration-200" />
          <h2 className="text-4xl text-white font-bold">
            {data.name}, {data.sys.country}
          </h2>
        </div>
        <div className="">
          <p className="text-gray-400">
            {cityTime}
            {/* Sunday, April 26, {new Date().getHours().toLocaleString()} */}
            {/* {formattedDate()} */}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-col">
        <div className="flex items-center gap-3">
          <FaTemperatureHalf className="text-orange-400 text-3xl hover:scale-125 duration-200" />
          <p className="text-white text-4xl font-bold">
            Temperature: {Math.round(data.main.temp)}°C
          </p>
        </div>
        <div className="">
          <p className="text-gray-400">{data?.weather?.[0].main}</p>
        </div>
      </div>
    </div>
  );
};

export default CityAndTemperature;
