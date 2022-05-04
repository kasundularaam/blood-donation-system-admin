import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";

const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadDoctors = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "doctor")).then((snapshot) => {
        setLoading(false);
        setDoctors(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    loadDoctors();
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
            onClick={loadDoctors}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Hospital</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.nic}>
              <td>{doctor.name}</td>
              <td>{doctor.nic}</td>
              <td>{doctor.hospital}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowDoctors;
