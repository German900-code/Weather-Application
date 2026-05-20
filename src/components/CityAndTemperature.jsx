import React, { useEffect, useState } from "react";
import { FaLocationDot, FaTemperatureHalf } from "react-icons/fa6";

const CityAndTemperature = ({ data }) => {
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
    if (!data) return null;

    // Function to update the city time based on the timezone offset
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
    changeThermColor(data.main.temp);
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="mt-10 flex flex-wrap items-start  gap-7 justify-between md:justify-evenly">
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
            Temperature: {Math.round(data?.main?.temp)}°C
          </p>
        </div>
        <div>
          <p className="text-gray-400">{data?.weather?.[0].main}</p>
        </div>
      </div>
    </div>
  );
};

export default CityAndTemperature;
