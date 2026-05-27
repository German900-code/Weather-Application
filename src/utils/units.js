// Utility functions for handling units and formatting in the weather app
export const getTemperatureUnit = (units) => {
  return units === "metric" ? "°C" : "°F";
};

export const getWindSpeedUnit = (units) => {
  return units === "metric" ? "m/s" : "mph";
};

export const formatTemperature = (temp, units) => {
  if (units === "imperial") {
    return Math.round((temp * 9) / 5 + 32); // Convert Celsius to Fahrenheit
  }

  return Math.round(temp);
};

export const formatWindSpeed = (speed, units) => {
  if (units === "imperial") {
    return Math.round(speed * 2.237); // m/s to mph
  }

  return Math.round(speed); // m/s
};
