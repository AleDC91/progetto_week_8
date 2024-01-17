import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  OpenWeatherMap_API_KEY,
  forecastURL,
} from "../config/config";
import axios from "axios";
import "../styles/DayDetail.css";
import { BsClouds } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { BsCloudRainHeavy } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import { TbMist } from "react-icons/tb";
import { Button, Container, ListGroup } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import WeatherLoadingComponent from "../components/WeatherLoadingComponent";

export default function DayDetailPage() {
  const { latitude, longitude, dt } = useParams();
  const [detailList, setDetailList] = useState();
  const [detailUrl, setDetailUrl] = useState();
  const [singleDayError, setSingleDayError] = useState(false);
  const [singleDayLoadingData, setSingleDayLoadingData] = useState(false);
  const [detailData, setDetailData] = useState();




const navigate = useNavigate()
  const getCurrentCity = () => {
    // setIsCurrentPositionLoading(false);
    // setIsWeatherLoading(true)
    // setCurrentWeather(true);
    // setUserCoordinateError(false)
    axios(
      `${forecastURL}?appid=${OpenWeatherMap_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setDetailList(res.data);
          const selectedDetail = res.data.list.find((item) => String(item.dt) === dt);
          console.log(selectedDetail)
          setDetailData(selectedDetail);
          setSingleDayLoadingData(false);
          setSingleDayError(false);
        } else {
          setSingleDayLoadingData(false);
          setSingleDayError(true);
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })

      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setSingleDayError(true);
        setSingleDayLoadingData(false);
      });
  };

  useEffect(() => {
    setSingleDayError(false);
    setSingleDayLoadingData(true);
    getCurrentCity();
  }, []);

  useEffect(() => {
    setBG();
  }, [detailList]);

  const setBG = () => {
    if (detailData) {
      switch (detailData.weather[0].main) {
        case "Clouds":
          setDetailUrl("/images/cloudy.jpg");
          break;
        case "Clear":
          setDetailUrl("/images/sunny.jpg");
          break;
        case "Rain":
          setDetailUrl("/images/rain.webp");
          break;
        case "Snow":
          setDetailUrl("/images/snow.jpg");
          break;
        case "Drizzle":
          setDetailUrl("/images/drizzle.jpeg");
          break;
        case "Thunderstorm":
          setDetailUrl("/images/thunderstorm.jpg");
          break;
        case "Mist":
          setDetailUrl("/images/fog.jpg");
          break;
        default:
          break;
      }
    }
  };

  const dateObject = new Date(dt * 1000);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");

  return (
    <>
      <Button
        variant="light"
        className="my-2 d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowBack className="fs-2 me-3" /> <p className="p-0 m-0">BACK</p>
      </Button>
      {singleDayError && !singleDayLoadingData && <singleDayError />}
      {!singleDayError && singleDayLoadingData && <WeatherLoadingComponent />}

      {detailData && detailList  && !singleDayError && !singleDayLoadingData && (
        <div
          className="day-detail"
          style={{
            backgroundImage: `url(${detailUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="detail-header d-inline-block p-4 mb-4">
            <h1>{detailList.city.name}</h1>
            <p className="fs-3">
              {day}/{month}/{year}
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <p className="fs-2 p-0 me-3">
                {Math.round(detailData.main.temp)}°C
              </p>
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
          </div>
          <Container>
            <ListGroup>
              <ListGroup.Item>
                Weather: {detailData.weather[0].description}
              </ListGroup.Item>
              <ListGroup.Item>
                Min Temperature: {Math.round(detailData.main.temp_min)} °C
              </ListGroup.Item>
              <ListGroup.Item>
                Max Temperature: {Math.round(detailData.main.temp_max)} °C
              </ListGroup.Item>
              <ListGroup.Item>
                Feels like Temperature: {Math.round(detailData.main.feels_like)}
                °C
              </ListGroup.Item>
              <ListGroup.Item>
                Pressure: {detailData.main.pressure} hPa /{" "}
                {(detailData.main.pressure * 0.000986923).toFixed(4)} atm
              </ListGroup.Item>
              <ListGroup.Item>
                Humidity: {detailData.main.humidity}%
              </ListGroup.Item>
              <ListGroup.Item>
                Wind speed: {detailData.wind.speed} m/s
              </ListGroup.Item>
              <ListGroup.Item>
                Wind direction:
                {(() => {
                  if (
                    detailData.wind.deg >= 337.5 ||
                    detailData.wind.deg <= 22.5
                  ) {
                    return <> "N" </>;
                  } else if (
                    detailData.wind.deg > 22.5 &&
                    detailData.wind.deg <= 67.5
                  ) {
                    return <> "NE" </>;
                  } else if (
                    detailData.wind.deg > 67.5 ||
                    detailData.wind.deg <= 112.5
                  ) {
                    return <> "E" </>;
                  } else if (
                    detailData.wind.deg > 112.5 ||
                    detailData.wind.deg <= 157.5
                  ) {
                    return <> "SE" </>;
                  } else if (
                    detailData.wind.deg > 157.5 ||
                    detailData.wind.deg <= 202.5
                  ) {
                    return <> "S" </>;
                  } else if (
                    detailData.wind.deg > 202.5 ||
                    detailData.wind.deg <= 247.5
                  ) {
                    return <> "SW" </>;
                  } else if (
                    detailData.wind.deg > 247.5 ||
                    detailData.wind.deg <= 292.5
                  ) {
                    return <> "W" </>;
                  } else if (
                    detailData.wind.deg > 292.5 ||
                    detailData.wind.deg <= 337.5
                  ) {
                    return <> "NW" </>;
                  }
                })()}
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </div>
      )}
    </>
  );
}
