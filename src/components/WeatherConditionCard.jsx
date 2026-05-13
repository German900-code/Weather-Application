import React from "react";

const WeatherConditionCard = ({ id, icon, name, value }) => {
  return (
    <div
      key={id}
      className=" min-w-[120px] h-auto text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition transition-transform duration-300 transform will-change-transform hover:scale-95 duration-300 hover:border-2 border-purple-500"
    >
      {icon}
      <p className="text-sm text-gray-400">{name}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};

export default WeatherConditionCard;
