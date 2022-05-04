import React, { useState } from "react";
import ShowNurses from "./components/ShowNurses";
import AddNurse from "./components/AddNurse";
import { Button, Row, Col } from "react-bootstrap";

const Nurses = () => {
  const [addNurse, setAddNurse] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">{addNurse ? "New Nurse" : "Nurses"}</h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addNurse ? "warning" : "primary"}
            onClick={() => setAddNurse(!addNurse)}
          >
            {addNurse ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addNurse ? <AddNurse /> : <ShowNurses />}
    </Col>
  );
};

export default Nurses;
