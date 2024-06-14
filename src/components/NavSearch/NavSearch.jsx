import "./NavSearch.css";

const NavSearch = ({ handleSearch, setSearchLocation, searchLocation }) => {
  return (
    <form
      className="d-flex float-end align-items-center justify-content-end w-100"
      role="navSearch"
      onSubmit={handleSearch}
    >
      <input
        type="search"
        className="form-control me-2 bg-dark text-white navSearchInput"
        placeholder="Location name..."
        aria-label="Search"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      />
      <button className="btn btn-outline-success btn-lg" type="submit">
        Search
      </button>
    </form>
  );
};
export default NavSearch;
