import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OpenWeatherMap_API_KEY, weatherURL } from "../config/config";
import axios from "axios";
import "../styles/DayDetail.css";
import { BsClouds } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { BsCloudRainHeavy } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import { TbMist } from "react-icons/tb";
import { ListGroup } from "react-bootstrap";

export default function DayDetailPage() {
  const { latitude, longitude, dt } = useParams();
  const [detailData, setDetailData] = useState();

  const getCurrentCity = () => {
    // setIsCurrentPositionLoading(false);
    // setIsWeatherLoading(true)
    // setCurrentWeather(true);
    // setUserCoordinateError(false)
    axios(
      `${weatherURL}?appid=${OpenWeatherMap_API_KEY}&lat=${latitude}&lon=${longitude}&dt=${dt}&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          setDetailData(res.data);
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })

      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    getCurrentCity();

  }, []);

  const dateObject = new Date(dt * 1000);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  

  return (
    detailData && (
      <div className="day-detail">
        <h1>{detailData.name}</h1>
        <p className="fs-3">
          {day}/{month}/{year}
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <p className="fs-2 p-0 me-3">{Math.round(detailData.main.temp)}°C</p>
          <p className="fs-3 p-0">
            {(() => {
              switch (detailData.weather[0].main) {
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
        <ListGroup variant="flush">
          <ListGroup.Item>Weather: {detailData.weather[0].description}</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </div>
    )
  );
}
