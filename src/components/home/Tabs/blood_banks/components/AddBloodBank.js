import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { app } from "../../../../../App";

import { Button, Alert, Col, Form, Row, Container } from "react-bootstrap";

const AddBloodBank = () => {
  const [bloodBank, setBloodBank] = useState({
    id: "",
    email: "",
    name: "",
    address: "",
    telephone: "",
  });

  const [password, setPassword] = useState("");

  const [failed, setFailed] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBloodBank({ ...bloodBank, [name]: value });
  };

  const clearForm = () => {
    setBloodBank({
      id: "",
      email: "",
      name: "",
      address: "",
      telephone: "",
    });
    setPassword("");
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
    console.log(bloodBank);
    if (!loading) {
      e.preventDefault();
      if (
        bloodBank.email &&
        bloodBank.name &&
        bloodBank.address &&
        bloodBank.telephone &&
        password
      ) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, bloodBank.email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const newBloodBank = { ...bloodBank, id: uid };
        setDoc(doc(db, "bloodBank", uid), newBloodBank)
          .then((bloodBankData) => {
            setLoading(false);
            showSucceedMessage();
            clearForm();
          })
          .catch((bloodBankError) => {
            setLoading(false);
            console.log(bloodBankError);
            showFailedMessage();
          });
      })
      .catch((authError) => {
        setLoading(false);
        console.log(authError);
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
        <Col>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={bloodBank.email}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>telephone</Form.Label>
                <Form.Control
                  type="telephone"
                  id="telephone"
                  name="telephone"
                  onChange={handleChange}
                  value={bloodBank.telephone}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={bloodBank.name}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>address</Form.Label>
                <Form.Control
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={bloodBank.address}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Add Blood Bank"}
              </Button>
            </Col>
          </Row>
        </Col>
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
      <strong>Succeed!</strong> Blood Bank added!
    </Alert>
  );
};

export default AddBloodBank;
