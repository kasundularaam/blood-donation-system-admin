import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../../App";
import { Button, Row, Col, Table } from "react-bootstrap";

const ShowForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadFormFields = async () => {
    if (!loading) {
      setLoading(true);
      getDocs(collection(db, "donationForm")).then((snapshot) => {
        setLoading(false);
        setFormFields(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    loadFormFields();
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
            onClick={loadFormFields}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {formFields.map((formField) => (
            <tr key={formField.id}>
              <td>{formField.question}</td>
              <td>{formField.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowForm;
