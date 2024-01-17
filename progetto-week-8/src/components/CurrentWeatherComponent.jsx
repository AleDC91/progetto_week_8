import React from "react";
import { BsClouds } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { BsCloudRainHeavy } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import { TbMist } from "react-icons/tb";
import "../styles/CurrentWeatherComponent.css";
import { useDispatch } from "react-redux";
import { changeBackground } from "../actions";

export default function CurrentWeatherComponent({ currentWeather }) {
  const dispatch = useDispatch();
  const weather = currentWeather.weather[0].main;

  return (
    <div className="weather-header">
      <h1 className="text-center">{currentWeather.name}</h1>
      <div className="d-flex align-items-center justify-content-center">
        <p className="fs-1 p-0 mx-3">
          {Math.round(currentWeather.main.temp)}°C
        </p>
        <p className="fs-1 p-0">
          {(() => {
            switch (weather) {
              case "Clouds":
                dispatch(changeBackground("/images/cloudy.jpg"));
                return <BsClouds />;
              case "Clear":
                dispatch(changeBackground("/images/sunny.jpg"));
                return <GoSun />;
              case "Rain":
                dispatch(changeBackground("/images/rain.webp"));
                return <BsCloudRainHeavy />;
              case "Snow":
                dispatch(changeBackground("/images/snow.jpg"));
                return <BsSnow />;
              case "Drizzle":
                dispatch(changeBackground("/images/drizzle.jpeg"));
                return <BsCloudDrizzle />;
              case "Thunderstorm":
                dispatch(changeBackground("/images/thunderstorm.jpg"));
                return <MdOutlineThunderstorm />;
              case "Mist":
                dispatch(changeBackground("/images/fog.jpg"));
                return <TbMist />;
              default:
                break;
            }
          })()}
        </p>
      </div>
    </div>
  );
}
