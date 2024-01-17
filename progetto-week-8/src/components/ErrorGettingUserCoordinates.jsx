import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorGettingUserCoordinates() {
  return (
    <div className="error-user-coordinates">
      <Alert variant="warning" className="text-center">
        Error getting user coordinates! Enter a location{" "}
      </Alert>
    </div>
  );
}
