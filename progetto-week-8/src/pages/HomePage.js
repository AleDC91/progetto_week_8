import React, { useEffect, useState } from "react";
import SearchLocationComponent from "../components/SearchLocationComponent";
import {
  weatherURL,
  OpenWeatherMap_API_KEY,
  forecastURL,
  geoURL
} from "../config/config";
import { BsTypeH1 } from "react-icons/bs";
import WeatherComponent from "../components/WeatherComponent";
import LoadingPositionComponent from "../components/LoadingPositionComponent";
import WeatherLoadingComponent from "../components/WeatherLoadingComponent";
import ErrorGettingUserCoordinates from "../components/ErrorGettingUserCoordinates";
import axios from 'axios'
import SearchErrorComponent from "../components/SearchErrorComponent";

export default function HomePage() {
  const [coordinates, setCoordinates] = useState(null);
  const [userCoordinatesError, setUserCoordinateError] = useState(false);
  const [isCurrentPositionLoading, setIsCurrentPositionLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [city, setCity] = useState();
  const [searchCityError, setSearchCityError] = useState(false)



  const getUserCoordinates = () => {
    setIsCurrentPositionLoading(true);
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);

          const newCoordinates = {
            latitude: latitude,
            longitude: longitude,
          };

          setCoordinates(newCoordinates);
          setIsCurrentPositionLoading(false);
        },
        function (error) {
          setIsCurrentPositionLoading(false);
          setUserCoordinateError(true);

          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
            default:
              console.error("An unknown error occurred.");
          }
        }
      );
    } else {
      setIsCurrentPositionLoading(false);
      setUserCoordinateError(true);
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getCurrentWeather = () => {
    setIsCurrentPositionLoading(false);
    setIsWeatherLoading(true)
    setCurrentWeather(true);
    setUserCoordinateError(false)
    if (coordinates) {
      const { latitude, longitude } = coordinates;

      fetch(
        `${weatherURL}?appid=${OpenWeatherMap_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setCurrentWeather(json);
          setIsWeatherLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setIsWeatherLoading(false);
        });
    }
  };

  const getForecast = () => {
    

    if (coordinates) {
      const { latitude, longitude } = coordinates;
      setIsWeatherLoading(true);
      fetch(
        `${forecastURL}?appid=${OpenWeatherMap_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setForecast(json);
          setIsWeatherLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setIsWeatherLoading(false);
        });
    }
  };

  const getCityCoordinates = (e) => {
    e.preventDefault();
    setSearchCityError(false)
    axios(`${geoURL}?appid=${OpenWeatherMap_API_KEY}&q=${city}`)
    .then(res => {
        console.log(res)
        if(res.status === 200){
            if(res.data[0]){
                const newCoordinates = {
                    latitude: res.data[0].lat,
                    longitude: res.data[0].lon
                }
                console.log(newCoordinates)
                setCoordinates(newCoordinates);
            } else {
                setSearchCityError(true)
            }
        } else {
            setSearchCityError(true)
        }
    })
    .catch(err => {
        setSearchCityError(true)
        console.error("errore!" + err.message)
    })
        
        
        
  };

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates !== null) {
      getCurrentWeather();
      getForecast();
    }
  }, [coordinates]);



const bgURL = "/images/snow.jpg"

  return (
    <div className="home-page">
      {isCurrentPositionLoading && <LoadingPositionComponent />}
      {isWeatherLoading && <WeatherLoadingComponent />}
      {userCoordinatesError && <ErrorGettingUserCoordinates />}
      {!isCurrentPositionLoading && (
        <SearchLocationComponent
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          city={city}
          setCity={setCity}
          getCityCoordinates={getCityCoordinates}
        />
      )}
      {searchCityError && <SearchErrorComponent />}
      {!isCurrentPositionLoading && !userCoordinatesError && (
        <>
          {currentWeather && forecast && !isWeatherLoading &&(
            <WeatherComponent
              currentWeather={currentWeather}
              forecast={forecast}
              coordinates={coordinates}

            />
          )}
        </>
      )}
    </div>
  );
}
