import React from "react";
import SingleDayForecastComponent from "./SingleDayForecastComponent";
import "../styles/ForecastComponent.css"


export default function ForecastComponent({ forecast, coordinates }) {


  
  return (
    <div className="forecast-component">
    {forecast.list
    .filter((_, index) => index % 8 === 0)
    .map((item, i) => <SingleDayForecastComponent key={i} item={item} coordinates={coordinates}/>)}
    </div>
  )
}
