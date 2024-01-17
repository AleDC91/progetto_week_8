import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingPositionComponent() {
  return (
    <div className="loading-position d-flex align-items-center justify-content-center mt-5">
      <Spinner animation="grow" variant="success" className="fs-3" />
      <p className="ms-4 fs-3 text-white">Loading position...</p>
    </div>
  );
}
