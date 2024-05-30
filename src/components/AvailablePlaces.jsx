import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorM from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchDataReq } from "../../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [loaded, setLoaded] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoaded(false);
        const places = await fetchDataReq()
        navigator.geolocation.getCurrentPosition((position) => {
          const sortPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortPlaces);
          setLoaded(true);
        });
      } catch (err) {
        setError({
          message:
            err.message || "Could not fetch places, please try again later!",
        });
        setLoaded(true);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <ErrorM title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      loadingText="Fetching places data..."
      loaded={loaded}
    />
  );
}
