// Function to format the sunrise and sunset times based on the city's timezone
export const formatLocalTime = (timestamp, timezoneOffsetSeconds) => {
  if (!timezoneOffsetSeconds && timezoneOffsetSeconds !== 0) {
    console.warn("No timezone data, using UTC");
    timezoneOffsetSeconds = 0;
  }

  const localTimestamp = (timestamp + timezoneOffsetSeconds) * 1000;
  const date = new Date(localTimestamp);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
