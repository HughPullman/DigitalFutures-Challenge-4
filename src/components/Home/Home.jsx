import HomeSearch from "../HomeSearch/HomeSearch";
import "./Home.css";

const Home = ({ handleSearch, searchLocation, setSearchLocation }) => {
  return (
    <div className="bg-secondary align-items-center d-flex flex-column home justify-content-center gap-4">
      <h2 className="text-white">Tell me about...</h2>
      <HomeSearch
        setSearchLocation={setSearchLocation}
        handleSearch={handleSearch}
        searchLocation={searchLocation}
      />
    </div>
  );
};
export default Home;
