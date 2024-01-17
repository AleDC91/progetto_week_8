import React from "react";
import { BsClouds } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { BsCloudRainHeavy } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import { TbMist } from "react-icons/tb";
import "../styles/SingleDayForecast.css";
import { useNavigate } from "react-router-dom";

export default function SingleDayForecastComponent({ item, coordinates }) {

  const navigate = useNavigate();

  const weather = item.weather[0].main;

const day = item.dt_txt.split("-")[2].slice(0,2)
const year = item.dt_txt.split("-")[0]
const month = item.dt_txt.split("-")[1]

  return (
    <div className="single-day-forecast" onClick={() => navigate(`/${coordinates.latitude}/${coordinates.longitude}/${item.dt}`)}>
      <p className="fw-bold">{day}/{month}/{year}</p>
      <div className="d-flex align-items-center">
        <p className="m-0 me-3 p-0 fs-5">{Math.round(item.main.temp)} °C</p>
        <p className="fs-3 p-0">
          {(() => {
            switch (weather) {
              case "Clouds":
                return <BsClouds />;
              case "Clear":
                return <GoSun />;
              case "Rain":
                return <BsCloudRainHeavy />;
              case "Snow":
                return <BsSnow />;
              case "Drizzle":
                return <BsCloudDrizzle />;
              case "Thunderstorm":
                return <MdOutlineThunderstorm />;
              case "Mist":
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
