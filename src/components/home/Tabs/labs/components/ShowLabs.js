import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";

const ShowLabs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadLabs = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "lab")).then((snapshot) => {
        setLoading(false);
        setLabs(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    loadLabs();
  }, []);

  return (
    <>
      <Row>
        <Col></Col>
        <Col md="auto">
          <Button
            variant="secondary"
            className="btn-sm"
            disabled={loading}
            onClick={loadLabs}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr key={lab.id}>
              <td>{lab.name}</td>
              <td>{lab.email}</td>
              <td>{lab.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowLabs;
