import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";
import StaffDetails from "./StaffDetails";

const ShowCampaigns = () => {
  const [campaigns, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const db = getFirestore(app);

  const loadCampaigns = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "campaign")).then((snapshot) => {
        setLoading(false);
        setLabs(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  const dateConverter = (t) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var s = new Date(t).toLocaleDateString(undefined, options);
    return s;
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <>
      {campaigns.map((campaign) => (
        <StaffDetails
          key={campaign.id}
          show={show}
          onHide={handleClose}
          staff={campaign.campaignStaff}
        />
      ))}

      <Row>
        <Col></Col>
        <Col md="auto">
          <Button
            variant="secondary"
            className="btn-sm"
            disabled={loading}
            onClick={loadCampaigns}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} onClick={() => handleShow(campaign.id)}>
              <td>{campaign.title}</td>
              <td>{dateConverter(campaign.date)}</td>
              <td>{campaign.start}</td>
              <td>{campaign.end}</td>
              <td>{`${campaign.lat}, ${campaign.long}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowCampaigns;
