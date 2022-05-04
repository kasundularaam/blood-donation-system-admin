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

const AddNurse = () => {
  const [nurse, setNurse] = useState({
    nic: "",
    email: "",
    name: "",
    address: "",
    bloodGroup: "",
    dob: "",
    mobile: "",
    gender: "",
    hospital: "",
    lastTestedDate: "",
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

  const auth = getAuth();

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNurse({ ...nurse, [name]: value });
  };

  const clearForm = () => {
    setNurse({
      nic: "",
      email: "",
      name: "",
      address: "",
      bloodGroup: "",
      dob: "",
      mobile: "",
      gender: "",
      hospital: "",
      password: "",
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
        nurse.nic &&
        nurse.email &&
        nurse.name &&
        nurse.address &&
        nurse.bloodGroup &&
        nurse.dob &&
        nurse.mobile &&
        nurse.gender &&
        nurse.hospital &&
        nurse.password
      ) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    const newNurse = { ...nurse, dob: new Date(nurse.dob).getTime() };

    setLoading(true);
    createUserWithEmailAndPassword(auth, newNurse.email, newNurse.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setDoc(doc(db, "userMap", newNurse.nic), { userType: "nurse" })
          .then((userMapData) => {
            setDoc(doc(db, "nurse", uid), newNurse)
              .then((nurseData) => {
                setLoading(false);
                showSucceedMessage();
                clearForm();
              })
              .catch((nurseError) => {
                setLoading(false);
                console.log(nurseError);
                showFailedMessage();
              });
          })
          .catch((userMapError) => {
            setLoading(false);
            console.log(userMapError);
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
                  value={nurse.nic}
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
                  value={nurse.dob}
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
                  value={nurse.name}
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
                  value={nurse.mobile}
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
                  value={nurse.email}
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
                        nurse.gender === radio.value && "outline-success"
                      }
                      name="gender"
                      value={radio.value}
                      checked={nurse.gender === radio.value}
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
                  value={nurse.address}
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
                  value={nurse.hospital}
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
                  value={nurse.password}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col></Col>
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
                        nurse.bloodGroup === bloodGroup.value &&
                        "outline-success"
                      }
                      name="bloodGroup"
                      value={bloodGroup.value}
                      checked={nurse.bloodGroup === bloodGroup.value}
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
                    {loading ? "Loading..." : "Add Nurse"}
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
      <strong>Succeed!</strong> Nurse added!
    </Alert>
  );
};

export default AddNurse;
