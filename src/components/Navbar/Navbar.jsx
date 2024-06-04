import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import NavSearch from "../NavSearch/NavSearch";

const Navbar = ({ handleSearch, setSearchLocation, searchLocation }) => {
  const [searchBar, setSearchBar] = useState(false);

  useEffect(() => {
    if (window.location.href === "http://localhost:5173/") {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  }, [window.location.href]);

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
            <li className="nav-item ps-5">
              <NavLink to="/login" className="nav-link ">
                Login
              </NavLink>
            </li>
            <li className="nav-item dropdown ps-5">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Saved Locations
              </button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/favouriteLocations" className="dropdown-item">
                    My Favourite Locations
                  </NavLink>
                </li>
              </ul>
            </li>
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
