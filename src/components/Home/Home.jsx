import "./Home.css";

const Home = ({ handleSearch, searchLocation, setSearchLocation }) => {
  return (
    <div className="bg-secondary align-items-center d-flex flex-column home justify-content-center gap-4">
      <h2 className="text-white">Tell me about...</h2>
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
    </div>
  );
};
export default Home;
