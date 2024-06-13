import { NavLink } from "react-router-dom";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";

import "./ChangePassword.css";

import { useState } from "react";
import { changePassService } from "../../utils/user.service";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await changePassService({
      username: username,
      password: password,
      newPassword: newPassword,
    });
    if (res.status === 200) {
      setModal(true);
      setModalMessage(res.data.message);
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
    <div className="changePass d-flex align-items-center justify-content-center flex-column flex-wrap gap-5">
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
        <input
          type="password"
          className="form-control me-2 bg-dark text-white"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <button className="btn btn-success btn-lg" type="submit">
          Change Password
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
export default ChangePassword;
