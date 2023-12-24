import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.scss";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    let check = isValidInputs();
    let userData = { email, phone, username, password, confirmPassword };
    console.log(">>> check user data: ", userData);
  };

  const isValidInputs = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }

    if (!phone) {
      toast.error("Phone is required!");
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      return false;
    }

    if (password != confirmPassword) {
      toast.error("Your password is not the same!");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    return true;
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/test-api").then((data) => {
    //   console.log(">>> check data: ", data);
    // });
  }, []);

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Nguyen Xuan An</div>
            <div className="detail">
              Nguyen Xuan An helps you connect and share with the people in your
              life.
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Nguyen Xuan An</div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
