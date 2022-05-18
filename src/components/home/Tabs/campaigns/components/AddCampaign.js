import React, { useState } from "react";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore/lite";
import { app } from "../../../../../App";
import MapView from "./MapView";

import {
  Button,
  Alert,
  Col,
  Form,
  Row,
  Container,
  Table,
} from "react-bootstrap";

const AddCampaign = () => {
  const [campaign, setCampaign] = useState({
    id: "",
    title: "",
    date: "",
    lat: "",
    long: "",
    start: "",
    end: "",
  });

  const [location, setLocation] = useState(null);

  const [campaignStaff, setCampaignStaff] = useState([]);

  const [staffNic, setStaffNic] = useState("");

  const [failed, setFailed] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCampaign({ ...campaign, [name]: value });
  };

  const selectLocation = (e) => {
    setLocation(e.latlng);
  };

  const handleStaff = (e) => setStaffNic(e.target.value);

  const addStaff = () => {
    if (staffNic) {
      setCampaignStaff([...campaignStaff, staffNic]);
      setStaffNic("");
    }
  };

  const clearForm = () => {
    setCampaign({
      id: "",
      title: "",
      date: "",
      lat: "",
      long: "",
      start: "",
      end: "",
    });
    setLocation(null);
    setCampaignStaff([]);
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
    console.log(campaign);
    if (!loading) {
      e.preventDefault();
      if (
        campaign.title &&
        campaign.date &&
        campaign.start &&
        campaign.end &&
        location &&
        campaignStaff
      ) {
        addToDatabase();
      }
    }
  };

  const addToDatabase = () => {
    setLoading(true);
    const ref = doc(collection(db, "campaign"));
    const newCampaign = {
      ...campaign,
      id: ref.id,
      lat: location.lat,
      long: location.lng,
      date: new Date(campaign.date).getTime(),
      campaignStaff: campaignStaff,
    };
    setDoc(ref, newCampaign)
      .then((campaignData) => {
        setLoading(false);
        showSucceedMessage();
        clearForm();
      })
      .catch((campaignError) => {
        setLoading(false);
        console.log(campaignError);
        showFailedMessage();
      });
  };
  return (
    <Container>
      <Row>
        {failed && <FailedMessage />}
        {succeed && <SucceedMessage />}
      </Row>

      <Form>
        <Col>
          <Row className="mb-4">
            <MapView onselectLocation={selectLocation} />
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>location</Form.Label>
              <p className={location !== null ? "text-primary" : "text-danger"}>
                {location === null
                  ? "location not picked"
                  : `${location.lat}, ${location.lng}`}
              </p>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  value={campaign.title}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>date</Form.Label>
                <Form.Control
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleChange}
                  value={campaign.date}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>start</Form.Label>
                <Form.Control
                  type="time"
                  id="start"
                  name="start"
                  onChange={handleChange}
                  value={campaign.start}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>end</Form.Label>
                <Form.Control
                  type="time"
                  id="end"
                  name="end"
                  onChange={handleChange}
                  value={campaign.end}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className=" mb-3 align-items-end">
            <Col>
              <Row className="align-items-end">
                <Col>
                  <Form.Group>
                    <Form.Label>Staff</Form.Label>
                    <Form.Control
                      type="text"
                      id="staffNic"
                      name="staffNic"
                      onChange={handleStaff}
                      value={staffNic}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    className="btn-sm"
                    disabled={loading}
                    onClick={addStaff}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              <Row>
                <Row>
                  <Table hover className="m-3">
                    <tbody>
                      {campaignStaff.map((nic) => (
                        <tr key={nic}>
                          <td>{nic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </Row>
            </Col>
            <Col md="auto">
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Add Campaign"}
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

export default AddCampaign;
