import "./LocationCard.css";

const LocationCard = ({ name }) => {
  return (
    <div className="d-flex flex-row locationCard gap-4 m-3 mx-5">
      <img src="/public/assets/img/favorite-48.png" alt="" />
      <p>Location Name</p>
    </div>
  );
};
export default LocationCard;
