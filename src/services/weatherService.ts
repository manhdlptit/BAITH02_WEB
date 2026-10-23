import type { City, WeatherData } from "../types/weather";

export const CITIES: City[] = [
  { id: "hanoi", name: "Hà Nội", latitude: 21.0285, longitude: 105.8542 },
  { id: "haiphong", name: "Hải Phòng", latitude: 20.8449, longitude: 106.6881 },
  { id: "hue", name: "Huế", latitude: 16.4637, longitude: 107.5909 },
  { id: "danang", name: "Đà Nẵng", latitude: 16.0544, longitude: 108.2022 },
  { id: "nhatrang", name: "Nha Trang", latitude: 12.2388, longitude: 109.1967 },
  { id: "dalat", name: "Đà Lạt", latitude: 11.9404, longitude: 108.4583 },
  {
    id: "hcm",
    name: "TP. Hồ Chí Minh",
    latitude: 10.8231,
    longitude: 106.6297,
  },
  { id: "cantho", name: "Cần Thơ", latitude: 10.0452, longitude: 105.7469 },
];

export const fetchWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`,
  );
  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu thời tiết");
  }
  const data = await response.json();
  return {
    current: data.current,
    daily: data.daily,
  };
};
