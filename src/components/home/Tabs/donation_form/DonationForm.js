import React, { useState } from "react";
import ShowForm from "./components/ShowForm";
import AddFormField from "./components/AddFormField";
import { Button, Row, Col } from "react-bootstrap";

const DonationForm = () => {
  const [addFormField, setAddFormField] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">
            {addFormField ? "New Form Field" : "Donation Form"}
          </h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addFormField ? "warning" : "primary"}
            onClick={() => setAddFormField(!addFormField)}
          >
            {addFormField ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addFormField ? <AddFormField /> : <ShowForm />}
    </Col>
  );
};

export default DonationForm;
