import { NavLink } from "react-router-dom";

const LoginButton = () => {
  return (
    <li className="nav-item ps-5">
      <NavLink to="/login" className="nav-link ">
        Login
      </NavLink>
    </li>
  );
};
export default LoginButton;
