import { useState } from "react";

import Register from "../Register/Register";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  return (
    <>
      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <div className="login d-flex flex-row align-items-center justify-content-center flex-wrap gap-5">
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
            <button className="btn btn-success btn-lg" type="submit">
              Login
            </button>
          </form>
          <div className="d-flex flex-column align-items-center gap-5">
            <h2 className="text-light">Don't have an account?</h2>
            <button
              className="btn btn-success btn-lg"
              onClick={() => setRegister(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
