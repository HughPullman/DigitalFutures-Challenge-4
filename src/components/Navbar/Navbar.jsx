import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import NavSearch from "../NavSearch/NavSearch";
import { getLocations } from "../../utils/user.service";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import SavedLocations from "../SavedLocations/SavedLocations";

const Navbar = ({
  handleSearch,
  setSearchLocation,
  searchLocation,
  handleUserId,
  userId,
  selectLocation,
}) => {
  const [searchBar, setSearchBar] = useState(false);
  const [savedLoc, setSavedLoc] = useState([]);

  const handleFavSearch = (location) => {
    selectLocation(location);
  };

  useEffect(() => {
    if (window.location.href === "http://localhost:5173/") {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  }, [window.location.href]);

  const getSavedLocations = async () => {
    setSavedLoc([]);
    if (userId !== "") {
      const savedLocations = await getLocations({
        id: userId,
      });
      if (savedLocations.status === 200) {
        const favLocations = savedLocations.data.userLocations;
        const locations = favLocations.map((location) => (
          <li
            key={location}
            className="dropdown-item"
            onClick={() => handleFavSearch(location)}
          >
            {location}
          </li>
        ));
        setSavedLoc(locations);
      }
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/03/31/weather-icon-illustration03-Graphics-10205167-1-580x375.jpg"
            alt=""
            className="img-fluid rounded float-start"
            id="logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 w-100">
            <li className="nav-item active ps-5">
              <NavLink to="/" className="nav-link ">
                Home
              </NavLink>
            </li>

            {userId ? (
              <>
                <LogoutButton handleUserId={handleUserId} />
                <SavedLocations
                  getSavedLocations={getSavedLocations}
                  savedLoc={savedLoc}
                />
              </>
            ) : (
              <LoginButton />
            )}
            {searchBar ? (
              <NavSearch
                handleSearch={handleSearch}
                setSearchLocation={setSearchLocation}
                searchLocation={searchLocation}
              />
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
