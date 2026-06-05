import React from "react";
import WeatherIcon from "../assets/images/sun-behind-rain-cloud.svg";

const Header = ({ children }) => {
  return (
    <header className="mx-auto mb-10 max-w-6xl border-b border-white/10 px-4 py-8">
      <div className="flex items-center gap-4 md:hover:scale-110 transition-transform duration-300">
        <h1 className="text-4xl font-bold text-purple-500 duration-300 md:text-5xl md:hover:text-purple-800">
          Weather Forecast
        </h1>

        <img src={WeatherIcon} alt="weather icon" className="w-10 md:w-12" />
      </div>
      {children}
    </header>
  );
};

export default Header;
