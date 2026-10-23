import { useState, useEffect } from "react";
import type { City, WeatherData } from "./types/weather";
import { CITIES, fetchWeatherData } from "./services/weatherService";
import { CityList } from "./components/CityList";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForecastList } from "./components/ForecastList";
import { StatusView } from "./components/StatusView";
import "./App.css";

export function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(() => {
    const saved = localStorage.getItem("selectedCity");
    return saved ? JSON.parse(saved) : CITIES[0];
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const loadWeather = async (city: City) => {
    setStatus("loading");
    try {
      const data = await fetchWeatherData(city.latitude, city.longitude);
      setWeatherData(data);
      setStatus("idle");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Lỗi kết nối API");
    }
  };

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
      loadWeather(selectedCity);
    }
  }, [selectedCity]);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <div className="app-container">
      <h1>Ứng dụng Thời Tiết Việt Nam</h1>
      <div className="app-layout">
        <CityList selectedCity={selectedCity} onSelectCity={handleSelectCity} />
        <div className="main-content">
          {status !== "idle" && status !== "loading" && (
            <StatusView
              status={status}
              errorMsg={errorMsg}
              onRetry={() => selectedCity && loadWeather(selectedCity)}
            />
          )}
          {status === "loading" && (
            <StatusView status="loading" onRetry={() => {}} />
          )}
          {status === "idle" && selectedCity && weatherData && (
            <>
              <CurrentWeather city={selectedCity} data={weatherData} />
              <ForecastList daily={weatherData.daily} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
