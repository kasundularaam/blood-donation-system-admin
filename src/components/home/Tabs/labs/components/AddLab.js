import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { app } from "../../../../../App";

import { Button, Alert, Col, Form, Row, Container } from "react-bootstrap";

const AddLab = () => {
  const [lab, setLab] = useState({
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
    setLab({ ...lab, [name]: value });
  };

  const clearForm = () => {
    setLab({
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
    console.log(lab);
    if (!loading) {
      e.preventDefault();
      if (lab.email && lab.name && lab.address && lab.telephone && password) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, lab.email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const newLab = { ...lab, id: uid };
        setDoc(doc(db, "lab", uid), newLab)
          .then((labData) => {
            setLoading(false);
            showSucceedMessage();
            clearForm();
          })
          .catch((labError) => {
            setLoading(false);
            console.log(labError);
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
                  value={lab.email}
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
                  value={lab.telephone}
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
                  value={lab.name}
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
                  value={lab.address}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Add Lab"}
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
      <strong>Succeed!</strong> Lab added!
    </Alert>
  );
};

export default AddLab;
