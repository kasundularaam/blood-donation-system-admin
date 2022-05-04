import React, { useState } from "react";
import ShowCampaigns from "./components/ShowCampaigns";
import AddCampaign from "./components/AddCampaign";
import { Button, Row, Col } from "react-bootstrap";

const Campaigns = () => {
  const [addCampaign, setAddCampaign] = useState(false);

  return (
    <Col>
      <Row className="py-1 bg-light mb-4 align-items-center">
        <Col>
          <h2 className="col">{addCampaign ? "New Campaign" : "Campaigns"}</h2>
        </Col>
        <Col md="auto">
          <Button
            className="btn-sm"
            variant={addCampaign ? "warning" : "primary"}
            onClick={() => setAddCampaign(!addCampaign)}
          >
            {addCampaign ? "Cancel" : "New"}
          </Button>
        </Col>
      </Row>
      {addCampaign ? <AddCampaign /> : <ShowCampaigns />}
    </Col>
  );
};

export default Campaigns;
