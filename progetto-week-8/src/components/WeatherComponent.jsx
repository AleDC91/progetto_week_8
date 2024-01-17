import React from "react";
import SingleDayForecastComponent from "./SingleDayForecastComponent";
import CurrentWeatherComponent from "./CurrentWeatherComponent";
import ForecastComponent from "./ForecastComponent";
import "../styles/WeatherComponent.css";
import { useSelector } from "react-redux";

export default function WeatherComponent({ currentWeather, forecast, coordinates }) {
  const bgURL = useSelector(state => state.homeBackground)

  return (
    currentWeather &&
    forecast && (
      <div
        className="weather-component"
        style={{
          backgroundImage: `url(${bgURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <CurrentWeatherComponent currentWeather={currentWeather} />
        <ForecastComponent forecast={forecast} coordinates={coordinates}/>
      </div>
    )
  );
}
