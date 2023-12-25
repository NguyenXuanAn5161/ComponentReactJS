import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import "./Login.scss";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleLogin = async () => {
    let check = isValidInputs();

    if (check === true) {
      let response = await loginUser(valueLogin, password);

      if (response && response.data && response.data.EC === 0) {
        // success
        let data = {
          isAuthenticated: true,
          token: "fake token",
        };
        sessionStorage.setItem("account", JSON.stringify(data));
        history.push("/users");
        window.location.reload();
      }

      if (response && response.data && response.data.EC !== 0) {
        // error
        toast.error(response.data.EM);
      }
    }
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);

    if (!valueLogin) {
      toast.error("Email or phone is required!");
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      setObjCheckInput({
        ...defaultValidInput,
        isValidPassword: false,
        isValidConfirmPassword: false,
      });
      return false;
    }

    return true;
  };

  const handlePressEnter = (event) => {
    if (event.keyCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  return (
    <div className="login-container">
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
            <input
              type="text"
              className={
                objCheckInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyDown={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
