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
    <motion.button
      onClick={scrollToTop}
      className={`
            fixed 
            bottom-5 
            right-5
            text-purple-500
            hover:text-purple-600
            md:hover:scale-110
            lg:hover:scale-125
            transition-all
            duration-300
            ${visible ? "opacity-100" : "opacity-0 pointer-events-none"} 
      `}
    >
      <FaArrowAltCircleUp className="text-purple-500 " size={40} />
    </motion.button>
  );
};

export default ScrollToTopButton;
