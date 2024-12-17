import { useQuery } from "@tanstack/react-query";

export const useFetchLocation = () => {
  const fetchLocation = async () => {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          }
        );
      }
    );
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    return (
      data.address.state_district || data.address.county || "Unknown location"
    );
  };

  return useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const { latitude, longitude } = await fetchLocation();
      return await reverseGeocode(latitude, longitude);
    },
    refetchOnWindowFocus: false,
  });
};
