import React, { useState } from "react";
import ShowBloodBanks from "./components/ShowBloodBanks";
import AddBloodBank from "./components/AddBloodBank";
import { Button, Row, Col } from "react-bootstrap";

const Labs = () => {
  const [addLab, setAddLab] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">{addLab ? "New Blood Bank" : "Blood Banks"}</h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addLab ? "warning" : "primary"}
            onClick={() => setAddLab(!addLab)}
          >
            {addLab ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addLab ? <AddBloodBank /> : <ShowBloodBanks />}
    </Col>
  );
};

export default Labs;
