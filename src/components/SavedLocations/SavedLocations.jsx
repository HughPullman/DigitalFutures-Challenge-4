import { NavLink } from "react-router-dom";

const SavedLocations = ({ getSavedLocations, savedLoc }) => {
  return (
    <li className="nav-item dropdown ps-5">
      <button
        className="nav-link dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => getSavedLocations()}
      >
        My Saved Locations
      </button>
      <ul className="dropdown-menu">
        <li>
          <NavLink to="/favouriteLocations" className="dropdown-item">
            My Favourite Locations
          </NavLink>
        </li>
        {savedLoc}
      </ul>
    </li>
  );
};
export default SavedLocations;
