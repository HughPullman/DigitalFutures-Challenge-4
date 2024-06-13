import { deleteLocations } from "../../utils/user.service";
import "./LocationCard.css";

const LocationCard = ({
  location,
  selectLocation,
  userId,
  handleLocations,
}) => {
  const handleRemove = async () => {
    const res = await deleteLocations({ id: userId, location });
    if (res.status === 200) handleLocations();
  };

  return (
    <div className="d-flex flex-row locationCard gap-4 m-3 mx-4">
      <div className="savedIcon d-flex">
        <img
          src="/public/assets/img/bookmark.png"
          alt=""
          onClick={handleRemove}
        />
      </div>
      <p onClick={() => selectLocation(location)}>{location}</p>
    </div>
  );
};
export default LocationCard;
