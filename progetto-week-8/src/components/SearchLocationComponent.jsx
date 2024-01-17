import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";


export default function SearchLocationComponent({city, setCity, getCityCoordinates}) {
  return (
    <div className="search-location d-flex justify-content-center mt-5">
      <Form className="d-flex align-items-center w-75 justify-content-center"
      onSubmit={(e) => getCityCoordinates(e)}>
        <Form.Group className="me-1 w-100">
          <Form.Control 
          autoFocus
          type="text" 
          placeholder="Enter a location..." 
          onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <BsSearch />
        </Button>
      </Form>
    </div>
  );
}
