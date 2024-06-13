const HomeSearch = ({ setSearchLocation, handleSearch, searchLocation }) => {
  return (
    <form
      className="d-flex flex-column align-items-center gap-4"
      role="search"
      onSubmit={handleSearch}
    >
      <input
        type="search"
        className="form-control me-2 bg-dark text-white"
        placeholder="Location name..."
        aria-label="Search"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      />
      <button className="btn btn-success btn-lg" type="submit">
        Search
      </button>
    </form>
  );
};
export default HomeSearch;
