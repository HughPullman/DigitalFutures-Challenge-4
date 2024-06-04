import "./Register.css";

import { useState } from "react";

const Register = ({ setRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="register d-flex align-items-center justify-content-center flex-column flex-wrap gap-5">
      <form className="d-flex flex-column align-items-center gap-5">
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
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button className="btn btn-success btn-lg" type="submit">
          Register
        </button>
      </form>
      <button
        className="btn btn-success btn-lg"
        onClick={() => setRegister(false)}
      >
        Back to Login
      </button>
    </div>
  );
};
export default Register;
