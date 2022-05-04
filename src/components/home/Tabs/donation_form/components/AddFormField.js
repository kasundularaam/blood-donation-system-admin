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

const AddFormField = () => {
  const [formField, setFormField] = useState({
    id: "",
    question: "",
    type: "",
  });

  const [failed, setFailed] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const types = [
    { name: "yn", value: "yn", text: "Yes No" },
    { name: "text", value: "text", text: "Text" },
  ];

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormField({ ...formField, [name]: value });
  };

  const clearForm = () => {
    setFormField({
      id: "",
      question: "",
      type: "",
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
    console.log(formField);
    if (!loading) {
      e.preventDefault();
      if (formField.question && formField.type) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    const ref = doc(collection(db, "donationForm"));
    const newQuestion = { ...formField, id: ref.id };
    setDoc(ref, newQuestion)
      .then((questionData) => {
        setLoading(false);
        showSucceedMessage();
        clearForm();
      })
      .catch((questionError) => {
        setLoading(false);
        console.log(questionError);
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
                <Form.Label className="mb-2">question type</Form.Label>
                <br />
                <ButtonGroup>
                  {types.map((radio) => (
                    <ToggleButton
                      key={radio.name}
                      id={radio.name}
                      type="radio"
                      variant={
                        formField.type === radio.value && "outline-success"
                      }
                      name="type"
                      value={radio.name}
                      checked={formField.type === radio.value}
                      onChange={handleChange}
                    >
                      {radio.text}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-5">
                <Form.Label>question</Form.Label>
                <Form.Control
                  type="text"
                  id="question"
                  name="question"
                  onChange={handleChange}
                  value={formField.question}
                ></Form.Control>
              </Form.Group>
              <Row />
              <Row>
                <Col></Col>
                <Col md="auto">
                  <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Add Question"}
                  </Button>
                </Col>
                <Col></Col>
              </Row>
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
      <strong>Succeed!</strong> Question added!
    </Alert>
  );
};

export default AddFormField;
