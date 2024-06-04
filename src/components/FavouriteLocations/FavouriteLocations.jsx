import LocationCard from "../LocationCard/LocationCard";
import "./FavouriteLocations.css";

const FavouriteLocations = () => {
  return (
    <div className="favLocations d-flex flex-column align-items-center justify-content-center text-white gap-2">
      <div className="bg-black bg-gradient p-4 rounded-4">
        <h1>Telling you about...</h1>
        <h1>Favourite Locations</h1>
      </div>
      <div className="bg-black bg-gradient p-4 rounded-4">
        <p>
          Click <img src="/public/assets/img/favorite-48.png" alt="" /> to
          remove from favourites.
        </p>
        <p>Click name to view info.</p>
      </div>
      <div className="locations d-flex flex-wrap flex-row bg-black bg-gradient p-4 rounded-4">
        <div className="d-flex flex-column">
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </div>
        <div className="d-flex flex-column">
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </div>
        <div className="d-flex flex-column">
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </div>
      </div>
    </div>
  );
};
export default FavouriteLocations;
