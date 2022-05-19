import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { app } from "../../../../../App";

import {
  Button,
  Alert,
  ButtonGroup,
  Col,
  Form,
  Row,
  ToggleButton,
  Container,
} from "react-bootstrap";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    nic: "",
    uid: "",
    type: "",
    email: "",
    img: "",
    name: "",
    address: "",
    bloodGroup: "",
    dob: "",
    status: true,
    mobile: "",
    gender: "",
    hospital: "",
    lastTestedDate: 0,
    donationAbility: "",
  });

  const [failed, setFailed] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const bloodGroups = [
    { name: "A+", value: "A+" },
    { name: "A-", value: "A-" },
    { name: "B+", value: "B+" },
    { name: "B-", value: "B-" },
    { name: "O+", value: "O+" },
    { name: "O-", value: "O-" },
    { name: "AB+", value: "AB+" },
    { name: "AB-", value: "AB-" },
  ];

  const genders = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
  ];

  const types = [
    { name: "doctor", value: "doctor" },
    { name: "nurse", value: "nurse" },
  ];

  const auth = getAuth();

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDoctor({ ...doctor, [name]: value });
  };

  const clearForm = () => {
    setDoctor({
      nic: "",
      uid: "",
      type: "",
      email: "",
      img: "",
      name: "",
      address: "",
      bloodGroup: "",
      dob: "",
      status: "",
      mobile: "",
      gender: "",
      hospital: "",
      lastTestedDate: "",
      donationAbility: "",
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
    if (!loading) {
      e.preventDefault();
      if (
        doctor.nic &&
        doctor.email &&
        doctor.name &&
        doctor.address &&
        doctor.bloodGroup &&
        doctor.dob &&
        doctor.mobile &&
        doctor.gender &&
        doctor.hospital &&
        doctor.password
      ) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, doctor.email, doctor.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const newDoctor = {
          ...doctor,
          dob: new Date(doctor.dob).getTime(),
          uid: uid,
        };
        setDoc(doc(db, "user", newDoctor.nic), newDoctor)
          .then((doctorData) => {
            setLoading(false);
            showSucceedMessage();
            clearForm();
          })
          .catch((doctorError) => {
            setLoading(false);
            console.log(doctorError);
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
                <Form.Label>nic</Form.Label>
                <Form.Control
                  type="text"
                  id="nic"
                  name="nic"
                  onChange={handleChange}
                  value={doctor.nic}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>dob</Form.Label>
                <Form.Control
                  type="date"
                  id="dob"
                  name="dob"
                  onChange={handleChange}
                  value={doctor.dob}
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
                  value={doctor.name}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>mobile</Form.Label>
                <Form.Control
                  type="text"
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  value={doctor.mobile}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={doctor.email}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">gender</Form.Label>
                <br />
                <ButtonGroup>
                  {genders.map((radio) => (
                    <ToggleButton
                      key={radio.name}
                      id={radio.name}
                      type="radio"
                      variant={
                        doctor.gender === radio.value && "outline-success"
                      }
                      name="gender"
                      value={radio.value}
                      checked={doctor.gender === radio.value}
                      onChange={handleChange}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
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
                  value={doctor.address}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>hospital</Form.Label>

                <Form.Control
                  type="text"
                  id="hospital"
                  name="hospital"
                  onChange={handleChange}
                  value={doctor.hospital}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={doctor.password}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">type</Form.Label>
                <br />
                <ButtonGroup>
                  {types.map((radio) => (
                    <ToggleButton
                      key={radio.name}
                      id={radio.name}
                      type="radio"
                      variant={doctor.type === radio.value && "outline-success"}
                      name="type"
                      value={radio.value}
                      checked={doctor.type === radio.value}
                      onChange={handleChange}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">blood group</Form.Label>
                <br />
                <ButtonGroup>
                  {bloodGroups.map((bloodGroup) => (
                    <ToggleButton
                      key={bloodGroup.name}
                      id={bloodGroup.name}
                      type="radio"
                      variant={
                        doctor.bloodGroup === bloodGroup.value &&
                        "outline-success"
                      }
                      name="bloodGroup"
                      value={bloodGroup.value}
                      checked={doctor.bloodGroup === bloodGroup.value}
                      onChange={handleChange}
                    >
                      {bloodGroup.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col></Col>
                <Col md="auto">
                  <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Add Doctor"}
                  </Button>
                </Col>
              </Row>
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
      <strong>Succeed!</strong> Doctor added!
    </Alert>
  );
};

export default AddDoctor;
