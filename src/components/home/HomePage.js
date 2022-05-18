import React, { useState } from "react";

import { Container, Row, Col, Nav } from "react-bootstrap";

import Dashboard from "./Tabs/dashboard/Dashboard";
import Doctors from "./Tabs/doctors/Doctors";
import Labs from "./Tabs/labs/Labs";
import BloodBanks from "./Tabs/blood_banks/BloodBanks";
import DonationForm from "./Tabs/donation_form/DonationForm";
import LabTests from "./Tabs/lab_tests/LabTests";
import Campaigns from "./Tabs/campaigns/Campaigns";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="bg-primary text-white" style={{ height: "10vh" }}>
        <h3 style={{ margin: "auto" }} className="text-center">
          Blood Donation System
        </h3>
      </Row>
      <Row style={{ height: "90vh" }}>
        <Col md="auto" className="px-4 py-4 bg-dark">
          <Nav className="flex-column" variant="pills" role="tablist">
            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 0 && "active")
                }
                onClick={() => setActiveTab(0)}
                role="button"
              >
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 1 && "active")
                }
                onClick={() => setActiveTab(1)}
                role="button"
              >
                Hospital staff
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 2 && "active")
                }
                onClick={() => setActiveTab(2)}
                role="button"
              >
                Labs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 3 && "active")
                }
                onClick={() => setActiveTab(3)}
                role="button"
              >
                Blood Banks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 4 && "active")
                }
                onClick={() => setActiveTab(4)}
                role="button"
              >
                Donation Form
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 5 && "active")
                }
                onClick={() => setActiveTab(5)}
                role="button"
              >
                Lab Tests
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  "px-4 text-white nav-link " + (activeTab === 6 && "active")
                }
                onClick={() => setActiveTab(6)}
                role="button"
              >
                campaigns
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          {activeTab === 0 && <Dashboard />}
          {activeTab === 1 && <Doctors />}
          {activeTab === 2 && <Labs />}
          {activeTab === 3 && <BloodBanks />}
          {activeTab === 4 && <DonationForm />}
          {activeTab === 5 && <LabTests />}
          {activeTab === 6 && <Campaigns />}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
