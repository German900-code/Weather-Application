import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const SearchBar = ({
  onSearch,
  fetchWeatherData,
  cityWeather,
  setCityWeather,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onSearch(inputValue);
    setInputValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleChangeCity = (e) => {
    setCityWeather(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[70%] flex items-center  bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300 hover:bg-white/20 cursor-text">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          // value={city}
          // onChange={handleChangeCity}
          placeholder="Enter city (e.g. London)"
          className="flex-1 px-4 py-3 bg-transparent outline-none text-white placeholder-gray-400"
        />

        <button
          className="px-5 py-3 bg-purple-500 hover:bg-purple-600 transition text-white flex items-center gap-2"
          onClick={handleSubmit}
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
