import React, { useState } from "react";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore/lite";
import { app } from "../../../../../App";

import {
  Button,
  Alert,
  Col,
  Form,
  Row,
  Container,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const AddLabTest = () => {
  const [labTest, setLabTest] = useState({
    id: "",
    test: "",
    unit: "",
    resultType: "range",
  });

  const [failed, setFailed] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableUnit, setAvailableUnit] = useState(true);

  const types = [
    { name: "range", value: "range", text: "Range" },
    { name: "np", value: "np", text: "Negative or Positive" },
  ];

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "resultType") {
      value === "np" ? setAvailableUnit(false) : setAvailableUnit(true);
    }
    setLabTest({ ...labTest, [name]: value });
  };

  const clearForm = () => {
    setLabTest({
      id: "",
      test: "",
      unit: "",
      resultType: "range",
    });
  };

  const showFailedMessage = () => {
    setSucceed(false);
    setFailed(true);
    setTimeout(() => {
      setSucceed(false);
      setFailed(false);
    }, 2000);
  };

  const showSucceedMessage = () => {
    setFailed(false);
    setSucceed(true);
    setTimeout(() => {
      setSucceed(false);
      setFailed(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    console.log(labTest);
    if (!loading) {
      e.preventDefault();
      if (availableUnit) {
        if (labTest.test && labTest.unit && labTest.resultType) {
          addToDatabase();
        }
      } else {
        if (labTest.test && labTest.resultType) {
          addToDatabase();
        }
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    const ref = doc(collection(db, "labTest"));
    const newLabTest = { ...labTest, id: ref.id };
    setDoc(ref, newLabTest)
      .then((labTestData) => {
        setLoading(false);
        showSucceedMessage();
        clearForm();
      })
      .catch((labTestError) => {
        setLoading(false);
        console.log(labTestError);
        showFailedMessage();
      });
  };
  return (
    <Container fluid>
      <Row>
        {failed && <FailedMessage />}
        {succeed && <SucceedMessage />}
      </Row>

      <Form>
        <Row>
          <Col md="auto">
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>test</Form.Label>
                <Form.Control
                  type="text"
                  id="test"
                  name="test"
                  onChange={handleChange}
                  value={labTest.test}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">result type</Form.Label>
                <br />
                <ButtonGroup>
                  {types.map((radio) => (
                    <ToggleButton
                      key={radio.name}
                      id={radio.name}
                      type="radio"
                      variant={
                        labTest.resultType === radio.value && "outline-success"
                      }
                      name="resultType"
                      value={radio.name}
                      checked={labTest.resultType === radio.value}
                      onChange={handleChange}
                    >
                      {radio.text}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Row>
            {availableUnit && (
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>unit</Form.Label>
                  <Form.Control
                    type="text"
                    id="unit"
                    name="unit"
                    onChange={handleChange}
                    value={labTest.unit}
                  ></Form.Control>
                </Form.Group>
              </Row>
            )}

            <Row className="mt-5">
              <Col></Col>
              <Col md="auto">
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Add Lab Test"}
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </Container>
  );
};

const FailedMessage = () => {
  return (
    <Alert variant="danger">
      <strong>Failed!</strong> An error occurred!
    </Alert>
  );
};

const SucceedMessage = () => {
  return (
    <Alert variant="success">
      <strong>Succeed!</strong> Lab Test added!
    </Alert>
  );
};

export default AddLabTest;
