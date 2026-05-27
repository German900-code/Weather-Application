import { motion } from "framer-motion";
import React from "react";

const WeatherConditionCard = ({ id, icon, name, value, item }) => {
  return (
    <motion.div
      key={id}
      variants={item}
      className=" min-w-[120px] h-auto text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition-all  transform will-change-transform md:hover:scale-95 lg:hover:scale-95 duration-300 md:hover:border-2  lg:hover:border-2 border-purple-500  
      shadow-[0_8px_25px_rgba(168,85,247,0.25)]"
    >
      {icon}
      <p className="text-sm text-gray-400 mb-2 mt-2">{name}</p>
      <p className="text-xl font-semibold break-words">{value}</p>
    </motion.div>
  );
};

export default WeatherConditionCard;
