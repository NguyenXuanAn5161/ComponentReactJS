import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { fetchGroup } from "../../services/userService";

const ModalUser = (props) => {
  const [show, setShow] = useState(false);
  const [userGroup, setUserGroup] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response && response.data && response.data.EC === 0) {
      setUserGroup(response.data.DT);
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Email address(<span style={{ color: "red" }}>*</span>)
                </label>
                <input
                  type="text"
                  className={"form-control"}
                  placeholder="Email address"
                />
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Phone number(<span style={{ color: "red" }}>*</span>)
                </label>
                <input
                  type="text"
                  className={"form-control"}
                  placeholder="Phone number"
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>Username</label>
                <input
                  type="text"
                  className={"form-control"}
                  placeholder="Username"
                />
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Password(<span style={{ color: "red" }}>*</span>)
                </label>
                <input
                  type="password"
                  className={"form-control"}
                  placeholder="Password"
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-12 form-group">
                <label>Address</label>
                <input
                  type="text"
                  className={"form-control"}
                  placeholder="Address"
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>Gender</label>
                <select className="form-select">
                  <option defaultValue="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Group(<span style={{ color: "red" }}>*</span>)
                </label>
                <select className="form-select">
                  {userGroup.length > 0 &&
                    userGroup.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
