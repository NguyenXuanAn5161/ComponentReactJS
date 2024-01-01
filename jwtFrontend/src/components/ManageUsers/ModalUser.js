import _ from "lodash";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { createNewUser, fetchGroup } from "../../services/userService";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const { action, dataModalUser } = props; // js object destructuring

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const [userData, setUserData] = useState(defaultUserData);

  const defaultValidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, group: userGroup[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response && response.data && response.data.EC === 0) {
      setUserGroup(response.data.DT);
      if (response.data.DT && response.data.DT.length > 0) {
        let groups = response.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    console.log("user data", userData);
    // create user
    setObjCheckInput(defaultValidInput);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _objCheckInput = _.cloneDeep(defaultValidInput);
        _objCheckInput[arr[i]] = false;
        setObjCheckInput(_objCheckInput);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidateInput();
    if (check === true) {
      let response = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (response.data && response.data.EC === 0) {
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroup[0].id });
        toast.success(response.data.EM);
      }

      if (response.data && response.data.EC !== 0) {
        toast.error(response.data.EM);
        let _objCheckInput = _.cloneDeep(defaultValidInput);
        _objCheckInput[response.data.DT] = false;
        setObjCheckInput(_objCheckInput);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData({ ...defaultUserData, group: userGroup[0].id });
    setObjCheckInput(defaultValidInput);
    // if (action === "CREATE") {
    //   setUserData({ ...defaultUserData, group: userGroup[0].id });
    // }
  };

  return (
    <>
      <Modal show={props.show} onHide={() => handleCloseModalUser()} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "CREATE" ? "Create new user" : "Edit a user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Email address(<span style={{ color: "red" }}>*</span>)
                </label>
                <input
                  disabled={action === "CREATE" ? false : true}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "email")
                  }
                  value={userData.email}
                  type="text"
                  className={
                    objCheckInput.email
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Email address"
                />
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Phone number(<span style={{ color: "red" }}>*</span>)
                </label>
                <input
                  disabled={action === "CREATE" ? false : true}
                  value={userData.phone}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "phone")
                  }
                  type="text"
                  className={
                    objCheckInput.phone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Phone number"
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>Username</label>
                <input
                  value={userData.username}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "username")
                  }
                  type="text"
                  className={
                    objCheckInput.username
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Username"
                />
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                {action === "CREATE" && (
                  <>
                    <label>
                      Password(<span style={{ color: "red" }}>*</span>)
                    </label>
                    <input
                      value={userData.password}
                      onChange={(event) =>
                        handleOnChangeInput(event.target.value, "password")
                      }
                      type="password"
                      className={
                        objCheckInput.password
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      placeholder="Password"
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-12 form-group">
                <label>Address</label>
                <input
                  value={userData.address}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "address")
                  }
                  type="text"
                  className={
                    objCheckInput.address
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Address"
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-sm-6 form-group">
                <label>Gender</label>
                <select
                  value={userData.sex}
                  className="form-select"
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "sex")
                  }
                >
                  <option defaultValue="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Col>
              <Col className="col-12 col-sm-6 form-group">
                <label>
                  Group(<span style={{ color: "red" }}>*</span>)
                </label>
                <select
                  value={userData.group}
                  className={
                    objCheckInput.group
                      ? "form-select"
                      : "form-select is-invalid"
                  }
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "group")
                  }
                >
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
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
