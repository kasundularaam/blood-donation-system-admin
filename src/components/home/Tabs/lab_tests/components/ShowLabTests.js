import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";

const ShowLabTests = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadLabTests = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "labTest")).then((snapshot) => {
        setLoading(false);
        setLabTests(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    loadLabTests();
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
            onClick={loadLabTests}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>Test</th>
            <th>Unit</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {labTests.map((labTest) => (
            <tr key={labTest.id}>
              <td>{labTest.test}</td>
              <td>{labTest.unit}</td>
              <td>{labTest.resultType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowLabTests;
