import Places from "./Places.jsx";
import ErrorM from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchDataReq } from "../../http.js";
import { useFetch } from "../Hooks/useFetch.jsx";

async function fetchSortedPlaces() {
  const places = await fetchDataReq();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
    loaded,
    error,
  } = useFetch(fetchSortedPlaces, []);

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
