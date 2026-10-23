import React from "react";
import type { DailyForecast } from "../types/weather";
import { getWeatherDescription } from "../utils/weatherCode";

interface ForecastListProps {
  daily: DailyForecast;
}

export const ForecastList: React.FC<ForecastListProps> = ({ daily }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    });
  };

  return (
    <div className="forecast-container">
      <h3>Dự báo trong 1 tuần tới</h3>
      <div className="forecast-grid">
        {daily.time.map((date, index) => {
          const weatherInfo = getWeatherDescription(daily.weather_code[index]);
          return (
            <div key={date} className="forecast-card">
              <p className="forecast-date">{formatDate(date)}</p>{" "}
              <p className="forecast-desc">{weatherInfo.text}</p>
              <p className="forecast-temp">
                <span className="max">
                  {Math.round(daily.temperature_2m_max[index])}°
                </span>{" "}
                /{" "}
                <span className="min">
                  {Math.round(daily.temperature_2m_min[index])}°
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
