import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 py-6 text-center text-sm text-white/60">
      <p>Made with 💜 by German</p>
      <p className="mt-3">Weather data provided by OpenWeatherMap</p>
      <p className="mt-3">© {new Date().getFullYear()} Weather Application</p>
    </footer>
  );
};

export default Footer;
