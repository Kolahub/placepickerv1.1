import { useEffect, useState } from "react";
export function useFetch(fetchFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [loaded, setLoaded] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setLoaded(false);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (err) {
        setError({ message: err.message || "Failed to fetch data." });
      }
      setLoaded(true);
    }
    fetchPlaces();
  }, [fetchFn]);

  return {
    fetchedData,
    setFetchedData,
    loaded,
    error,
  };
}
