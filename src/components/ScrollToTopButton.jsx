import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`
      fixed
      bottom-5
      right-5
      z-50
      group
      ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      transition-all
      duration-300
    `}
    >
      <motion.button
        onClick={scrollToTop}
        className="
        text-purple-500
        hover:text-purple-600
        md:hover:scale-110
        lg:hover:scale-125
        transition-all
        duration-300
      "
      >
        <FaArrowAltCircleUp className="text-purple-500" size={40} />
      </motion.button>

      <div
        className="
        pointer-events-none
        absolute
        bottom-full
        right-0
        mb-3
        whitespace-nowrap
        rounded-lg
        bg-black/80
        px-3
        py-1.5
        text-sm
        text-white
        opacity-0
        shadow-lg
        transition-all
        duration-300
        group-hover:opacity-100
        group-hover:-translate-y-1
      "
      >
        Back to top
        <div
          className="
          absolute
          -bottom-1
          right-4
          h-2
          w-2
          rotate-45
          bg-black/80
        "
        />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
