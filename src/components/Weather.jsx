import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

const Weather = () => {
  const {
    selectCountry,
    setSelectCountry,
    weatherData,
    setWeatherData,
    conutries,
  } = useContext(WeatherContext);
  return (
    <div className="weather-wrap">
      <h2>국가별 날씨</h2>
      <select
        value={selectCountry}
        onChange={(e) => setSelectCountry(e.target.value)}
      >
        {Object.keys(conutries).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {weatherData ? (
        <div>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </p>
          <div>
            <p>온도{weatherData.main.temp}℃</p>
            <p>도시{conutries[selectCountry]}</p>
            <p>설명{weatherData.weather[0].description}</p>
            <p>풍속{weatherData.wind.speed}</p>
          </div>
        </div>
      ) : (
        <p>날씨 정보를 불러오는중...</p>
      )}
    </div>
  );
};

export default Weather;
