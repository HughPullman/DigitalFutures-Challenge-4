import "./Navbar.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid ms-5">
        <a href="#" className="navbar-brand">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/03/31/weather-icon-illustration03-Graphics-10205167-1-580x375.jpg"
            alt=""
            className="img-fluid rounded float-start"
            id="logo"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ps-5">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item dropdown ps-5">
              <a
                className="nav-link dropdown toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Saved Locations
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" className="dropdown-item">
                    test
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
