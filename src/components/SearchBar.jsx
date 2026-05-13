import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
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
  // const handleChangeCity = (e) => {
  //   setInputValue(e.target.value);
  //   // setCityName(e.target.value);
  //   // setCityWeather(e.target.value);
  // };

  return (
    <div
      // className="flex w-full max-w-md px-4"
      className="flex justify-center mb-14"
    >
      <div className="w-full flex items-center  bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300 md:hover:bg-white/20 cursor-text md:w-[70%] lg:">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          // value={city}
          // onChange={handleChangeCity}
          placeholder="Enter city (e.g. London)"
          className="flex-1 px-4 py-3 w-full bg-transparent outline-none text-white placeholder-gray-400"
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
