import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../../../App";

import { Button, Modal, Container, Row, Col, Table } from "react-bootstrap";

const StaffDetails = ({ show, onHide, staff }) => {
  const doctorIds = staff.doctors;
  const nurseIds = staff.nurses;
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const getDoctors = async () => {
    let doctorList = [];
    for (const nic of doctorIds) {
      const q = query(collection(db, "doctor"), where("nic", "==", nic));
      const qSnap = await getDocs(q);
      const res = qSnap.docs.map((doc) => doc.data());
      doctorList.push(res[0]);
    }
    setDoctors(doctorList);
  };

  const getNurses = async () => {
    let nurseList = [];
    for (const nic of nurseIds) {
      const q = query(collection(db, "nurse"), where("nic", "==", nic));
      const qSnap = await getDocs(q);
      const res = qSnap.docs.map((doc) => doc.data());
      nurseList.push(res[0]);
    }
    setNurses(nurseList);
  };

  const loadStaff = async () => {
    setLoading(true);
    await getDoctors();
    await getNurses();

    setLoading(false);
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
            <Col>
              <Row>
                <Col>
                  <h4>Doctors</h4>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Nic</th>
                        <th>Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.map((staffMem) => (
                        <tr key={staffMem.nic}>
                          <td>{staffMem.name}</td>
                          <td>{staffMem.nic}</td>
                          <td>{staffMem.hospital}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Nurses</h4>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Nic</th>
                        <th>Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nurses.map((staffMem) => (
                        <tr key={staffMem.nic}>
                          <td>{staffMem.name}</td>
                          <td>{staffMem.nic}</td>
                          <td>{staffMem.hospital}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
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
