import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../../../App";

import { Button, Modal, Row, Col, Table } from "react-bootstrap";

const StaffDetails = ({ show, onHide, staff }) => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const loadStaff = async () => {
    setLoading(true);
    let staffList = [];
    for (const nic of staff) {
      const docRef = doc(db, "user", nic);
      const docSnap = await getDoc(docRef);
      staffList.push(docSnap.data());
      setLoading(false);
    }
    setStaffMembers(staffList);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Row>
              <Col></Col>
              <Col>
                <h5>Loading...</h5>
              </Col>
              <Col></Col>
            </Row>
          ) : (
            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Nic</th>
                    <th>Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {staffMembers.map((staffMem) => (
                    <tr key={staffMem.nic}>
                      <td>{staffMem.name}</td>
                      <td>{staffMem.nic}</td>
                      <td>{staffMem.hospital}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StaffDetails;
