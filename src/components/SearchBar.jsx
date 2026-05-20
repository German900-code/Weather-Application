import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const { scrollY } = useScroll();

  // Using framer-motion's useTransform to create responsive width and scale animations based on scroll position
  const width = useTransform(scrollY, [0, 150], ["70%", "70%"]);
  const scale = useTransform(scrollY, [0, 150], [1, 0.9]);

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
        // First styles before animation
        // style={{ scale, width }}
        // initial={{ scale: 0 }}
        // animate={{ scale: 1 }}
        // transition={{ duration: 1 }}
        className="w-full max-w-full md:max-w-[60%] mx-auto md:px-4 "
      >
        <div className="flex items-center bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300 md:hover:bg-white/20 focus-within:shadow-purple-500/30">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
      </motion.div>
    </motion.header>
  );

  // My original code
  // return (
  //   <motion.header className=" flex justify-center mb-14 sticky top-5 z-30">
  //     <motion.div
  //       style={{ width, scale }}
  //       initial={{ scale: 0 }}
  //       animate={{ scale: 1 }}
  //       transition={{ duration: 1 }}
  //       className="w-full flex items-center  bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300 md:hover:bg-white/20 cursor-text lg:w-[60%]"
  //     >
  //       <input
  //         type="text"
  //         value={inputValue}
  //         onChange={(e) => setInputValue(e.target.value)}
  //         onKeyDown={handleKeyDown}
  //         placeholder="Enter city (e.g. London)"
  //         className="flex-1 px-4 py-3 w-full bg-transparent outline-none text-white placeholder-gray-400 "
  //       />

  //       <button
  //         className="px-5 py-3 bg-purple-500 hover:bg-purple-600 transition text-white flex items-center gap-2 "
  //         onClick={handleSubmit}
  //       >
  //         🔍 Search
  //       </button>
  //     </motion.div>
  //   </motion.header>
  // );
};

export default SearchBar;
