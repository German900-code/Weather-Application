// Function to get the UV level label based on the UV index value
export const getUVLevel = (uv) => {
  if (uv <= 2) return "Low 🟢";
  if (uv <= 5) return "Moderate 🟡";
  if (uv <= 7) return "High 🟠";
  if (uv <= 10) return "Very High 🔴";
  return "Extreme 🟣";
};
