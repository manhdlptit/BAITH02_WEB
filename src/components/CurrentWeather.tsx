import React, { useState } from "react";
import type { City, WeatherData } from "../types/weather";
import { getWeatherDescription } from "../utils/weatherCode";

interface CurrentWeatherProps {
  city: City;
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  data,
}) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const {
    temperature_2m,
    relative_humidity_2m,
    wind_speed_10m,
    weather_code,
    time,
  } = data.current;
  const weatherInfo = getWeatherDescription(weather_code);

  const temp = isFahrenheit ? (temperature_2m * 9) / 5 + 32 : temperature_2m;
  const tempUnit = isFahrenheit ? "°F" : "°C";

  return (
    <div className="current-weather">
      <div className="header-weather">
        <h2>{city.name}</h2>
        <button
          onClick={() => setIsFahrenheit(!isFahrenheit)}
          className="unit-btn"
        >
          Đổi sang nhiệt độ {isFahrenheit ? "°C" : "°F"}
        </button>
      </div>
      <div className="weather-main-info">
        <div>
          <h1 className="temp">
            {Math.round(temp)} {tempUnit}
          </h1>
          <p className="desc">{weatherInfo.text}</p>
        </div>
      </div>
      <div className="weather-details">
        <p>Độ ẩm {relative_humidity_2m} %</p>
        <p>Tốc độ gió {wind_speed_10m} km/h</p>
        <p>Cập nhật {time}</p>
      </div>
    </div>
  );
};
