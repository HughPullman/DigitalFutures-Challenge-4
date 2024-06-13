const LogoutButton = ({ handleUserId }) => {
  return (
    <li className="nav-item ps-5">
      <button onClick={() => handleUserId("")} className="nav-link ">
        Logout
      </button>
    </li>
  );
};
export default LogoutButton;
