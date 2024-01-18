import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found text-white text-center mt-5 pt-5">
      <h1 className="my-5"> PAGE FOT FOUND </h1>
      <Button className="mx-3" variant="light" onClick={() => navigate(-1)}>BACK</Button>
      <Button className="mx-3" variant="light" onClick={() => navigate("/")} >HOME PAGE</Button>
    </div>
  );
}
