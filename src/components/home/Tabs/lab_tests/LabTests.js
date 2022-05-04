import React, { useState } from "react";
import ShowLabTests from "./components/ShowLabTests";
import AddLabTest from "./components/AddLabTest";
import { Button, Row, Col } from "react-bootstrap";

const DonationForm = () => {
  const [addLabTest, setAddLabTest] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">{addLabTest ? "New Lab Test" : "Lab Tests"}</h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addLabTest ? "warning" : "primary"}
            onClick={() => setAddLabTest(!addLabTest)}
          >
            {addLabTest ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addLabTest ? <AddLabTest /> : <ShowLabTests />}
    </Col>
  );
};

export default DonationForm;
