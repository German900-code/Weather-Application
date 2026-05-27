// Function to get the air quality label based on the AQI value
export const getAQILabel = (aqi) => {
  if (aqi <= 50) return "Good 🟢";
  if (aqi <= 100) return "Fair 🟡";
  if (aqi <= 150) return "Moderate 🟠";
  if (aqi <= 200) return "Poor 🔴";
  if (aqi <= 300) return "Very Poor 🟣";
  return "Hazardous ⚠️";
};
