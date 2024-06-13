import { useState } from "react";

import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";

import "./Login.css";
import { loginService } from "../../utils/user.service";
import { NavLink } from "react-router-dom";

const Login = ({ handleUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginService({
      username: username,
      password: password,
    });
    if (res.status === 200) {
      setModal(true);
      setModalMessage(res.data.message);
      handleUserId(res.data.user);
      setUsername("");
      setPassword("");
    } else {
      setErrorModal(true);
      setModalMessage(res.response.data.message);
    }
  };

  const handleClose = () => {
    setModal(false);
    setErrorModal(false);
  };

  return (
    <>
      <SuccessModal
        message={modalMessage}
        show={modal}
        close={handleClose}
      ></SuccessModal>
      <ErrorModal
        error={modalMessage}
        show={errorModal}
        handleClose={handleClose}
      />
      <div className="login d-flex flex-row align-items-center justify-content-center flex-wrap gap-5">
        <form
          className="d-flex flex-column align-items-center gap-5"
          onSubmit={handleSubmit}
          method="post"
        >
          <input
            type="text"
            className="form-control me-2 bg-dark text-white"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control me-2 bg-dark text-white"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-success btn-lg" type="submit">
            Login
          </button>
          <NavLink to="/passChange">
            <button className="btn btn-success btn-lg">Change Password</button>
          </NavLink>
        </form>
        <div className="d-flex flex-column align-items-center gap-5">
          <h2 className="text-light">Don't have an account?</h2>
          <NavLink to="/register">
            <button className="btn btn-success btn-lg" type="submit">
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Login;
