import React, { useState } from "react";
import type { City } from "../types/weather";
import { CITIES } from "../services/weatherService";

interface CityListProps {
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
}

export const CityList: React.FC<CityListProps> = ({
  selectedCity,
  onSelectCity,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizeStr = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCities = CITIES.filter((city) =>
    normalizeStr(city.name).includes(normalizeStr(searchTerm)),
  );

  return (
    <div className="city-list-container">
      <h3>Danh sách thành phố</h3>
      <input
        type="text"
        placeholder="Tìm kiếm thành phố"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="city-list">
        {filteredCities.map((city) => (
          <li
            key={city.id}
            className={`city-item ${selectedCity?.id === city.id ? "active" : ""}`}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
