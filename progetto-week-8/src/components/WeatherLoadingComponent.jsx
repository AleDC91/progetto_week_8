import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function WeatherLoadingComponent() {
  return (
    <div className="loading-weather d-flex align-items-center justify-content-center mt-5">
    <Spinner animation="grow" variant="primary" className="fs-3" />
    <p className="ms-4 fs-3 text-white">Loading weather...</p>
  </div>
  )
}