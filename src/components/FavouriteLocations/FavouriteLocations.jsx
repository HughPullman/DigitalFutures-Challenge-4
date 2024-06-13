import { useEffect, useState } from "react";
import LocationCard from "../LocationCard/LocationCard";
import "./FavouriteLocations.css";
import { getLocations } from "../../utils/user.service";

const FavouriteLocations = ({ userId, selectLocation }) => {
  const [locations, setLocations] = useState([]);

  const handleLocations = async () => {
    if (userId !== "") {
      const res = await getLocations({
        id: userId,
      });
      const userLocations = res.data.userLocations;
      const favLocations = userLocations.map((location) => (
        <LocationCard
          location={location}
          userId={userId}
          selectLocation={selectLocation}
          handleLocations={handleLocations}
          key={location}
        />
      ));
      setLocations(favLocations);
    }
  };

  useEffect(() => {
    handleLocations();
  }, []);

  return (
    <>
      <div className="favLocations d-flex flex-column align-items-center justify-content-center text-white gap-2">
        {userId !== "" ? (
          <>
            <div className="bg-black bg-gradient p-4 rounded-4">
              <h1>Telling you about...</h1>
              <h1>Favourite Locations</h1>
            </div>
            <div className="bg-black bg-gradient p-4 rounded-4 d-flex flex-row gap-2">
              <p>Click</p>
              <div className="savedIcon">
                <img src="/public/assets/img/bookmark.png" alt="" />
              </div>
              <p>to remove from favourites.</p>
              <p>Click name to view info.</p>
            </div>
            <div className="locations d-flex flex-wrap flex-row bg-black bg-gradient p-4 rounded-4">
              <div className="d-flex flex-column gap-2">{locations}</div>
            </div>
          </>
        ) : (
          <div className="bg-black bg-gradient p-4 rounded-4">
            <p>Please Login to see Favourite Locations</p>
          </div>
        )}
      </div>
    </>
  );
};
export default FavouriteLocations;
