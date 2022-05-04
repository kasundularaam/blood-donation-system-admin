import React, { useState } from "react";
import ShowDoctors from "./components/ShowDoctors";
import AddDoctor from "./components/AddDoctor";
import { Button, Container, Row, Col } from "react-bootstrap";

const Doctors = () => {
  const [addDoctor, setAddDoctor] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">{addDoctor ? "New Doctor" : "Doctors"}</h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addDoctor ? "warning" : "primary"}
            onClick={() => setAddDoctor(!addDoctor)}
          >
            {addDoctor ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addDoctor ? <AddDoctor /> : <ShowDoctors />}
    </Col>
  );
};

export default Doctors;
