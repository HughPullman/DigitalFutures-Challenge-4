import { NavLink } from "react-router-dom";
import { registerService } from "../../utils/user.service";
import "./Register.css";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";

import { useState } from "react";
import { passwordValidation } from "../../utils/registerValidation.service.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passVal = passwordValidation(password);
    if (passVal) {
      const res = await registerService({
        username: username,
        password: password,
      });
      if (res.status === 201) {
        setModal(true);
        setModalMessage("Successfully created account");
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data);
      }
    } else {
      setErrorModal(true);
      setModalMessage(
        "Password must be at least 8 characters with, a uppercase, a number and a special character"
      );
    }
  };

  const handleClose = () => {
    setModal(false);
    setErrorModal(false);
  };

  return (
    <div className="register d-flex align-items-center justify-content-center flex-column flex-wrap gap-5">
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
      <form
        className="d-flex flex-column align-items-center gap-5"
        method="post"
        onSubmit={handleSubmit}
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
          Register
        </button>
      </form>
      <NavLink to="/login">
        <button className="btn btn-success btn-lg" type="submit">
          Back to Login
        </button>
      </NavLink>
    </div>
  );
};
export default Register;
