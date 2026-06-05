import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";

const SearchBar = ({
  onSearch,
  units,
  toggleUnits,
  onUseLocation,
  loading,
}) => {
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
    <motion.section className="sticky top-5 z-30 mb-14">
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
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div
            className={`flex flex-1 min-w-0 items-center bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md transition-all duration-300
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
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city (e.g. London)"
              className="
        min-w-0
        flex-1
        bg-transparent
        px-4
        py-3
        text-white
        placeholder:text-white/50
        outline-none
      "
            />

            <button
              className="
        shrink-0
        px-4
        py-4
        bg-purple-500
        hover:bg-purple-600
        transition
        text-white
        flex
        items-center
        justify-center
        gap-2
        text-sm
        sm:text-base
        whitespace-nowrap
      "
              onClick={handleSubmit}
            >
              <span>🔍</span>
              <span className="hidden md:inline">Search</span>
            </button>
          </div>

          <div className="grid w-full grid-cols-[1fr_auto] gap-2 lg:flex lg:w-auto">
            <div className="relative group min-w-0">
              <button
                onClick={onUseLocation}
                disabled={loading}
                className="
          w-full
          min-w-0
          overflow-hidden
          px-5
          py-4
          bg-white/10
          md:hover:bg-purple-500
          text-white
          rounded-xl
          transition
          whitespace-nowrap
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
          flex
          items-center
          justify-center
          gap-2
        "
              >
                <IoEarth className="shrink-0 text-cyan-600" size={20} />
                <span className="truncate">
                  {loading ? "Detecting..." : "Use my location"}
                </span>
              </button>

              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-sm text-purple-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Detect your location to get the weather
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={toggleUnits}
                className="
          min-w-[72px]
          px-4
          py-4
          bg-white/10
          md:hover:bg-purple-500
          text-white
          rounded-xl
          transition
          whitespace-nowrap
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
              >
                {units === "metric" ? "°F" : "°C"}
              </button>

              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-sm text-purple-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Switch temperature unit
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default SearchBar;
