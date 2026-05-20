import { motion } from "framer-motion";
import React from "react";

const WeatherConditionCard = ({ id, icon, name, value, item }) => {
  return (
    <motion.div
      key={id}
      variants={item}
      // initial={{ scale: 0 }}
      // animate={{
      //   scale: 1,
      //   y: [0, -6, 0],
      // }}
      // transition={{
      //   scale: {
      //     duration: 1,
      //   },
      //   y: {
      //     duration: 4,
      //     repeat: Infinity,
      //     ease: "easeInOut",
      //   },
      // }}
      className=" min-w-[120px] h-auto text-white bg-white/10 p-5 rounded-lg backdrop-blur-md hover:bg-white/20 transition-all  transform will-change-transform hover:scale-95 duration-300 hover:border-2 border-purple-500"
    >
      {icon}
      <p className="text-sm text-gray-400">{name}</p>
      <p className="text-xl font-semibold break-words">{value}</p>
    </motion.div>
  );
};

export default WeatherConditionCard;
