import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const SearchBar = ({ onSearch, units, toggleUnits }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const { scrollY } = useScroll();

  // Using framer-motion's useTransform to create responsive width and scale animations based on scroll position
  const width = useTransform(scrollY, [0, 150], ["70%", "70%"]);
  const scale = useTransform(scrollY, [0, 150], [1, 0.9]);

  // Handler for the search button click and Enter key press
  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setError("Please enter a city name");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError("");
    onSearch(inputValue.trim());
    setInputValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.header className="sticky top-5 z-30 mb-14">
      <motion.div
        style={{ scale, width }}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          scale: {
            duration: 1,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="w-full max-w-full md:max-w-[70%] mx-auto md:px-4"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div
            className={`flex flex-1 items-center bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md transition-all duration-300
            ${
              error
                ? "ring-2 ring-red-400"
                : "focus-within:ring-2 focus-within:ring-purple-500"
            }
  `}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter city (e.g. London)"
              className="w-[80%] lg:w-full px-3 md:px-4 md:py-3 lg:px-5 lg:py-3 py-2 bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />

            <button
              className="w-[20%] px-2 sm:px-5 py-3 bg-purple-500 hover:bg-purple-600 transition text-white flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap"
              onClick={handleSubmit}
            >
              🔍 <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          <div className="relative group">
            <button
              onClick={toggleUnits}
              className="min-w-[72px] w-full px-4 py-3 bg-white/10 md:hover:bg-purple-500 text-white rounded-xl transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {units === "metric" ? "°F" : "°C"}
            </button>

            <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Switch temperature unit
            </div>
          </div>
        </div>
        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}
      </motion.div>
    </motion.header>
  );
};

export default SearchBar;
