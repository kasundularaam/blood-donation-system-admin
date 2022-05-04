import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";

const ShowNurses = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadNurses = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "nurse")).then((snapshot) => {
        setLoading(false);
        setNurses(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    loadNurses();
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
            onClick={loadNurses}
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
          {nurses.map((doctor) => (
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

export default ShowNurses;
