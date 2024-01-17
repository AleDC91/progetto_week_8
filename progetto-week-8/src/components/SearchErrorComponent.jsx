import React from "react";
import { Alert } from "react-bootstrap";

export default function SearchErrorComponent() {
  return (
    <div className="error-search mt-4">
      <Alert variant="warning" className="text-center">
        I can't find this location, please check the spell or retry!
      </Alert>
    </div>
  );
}
