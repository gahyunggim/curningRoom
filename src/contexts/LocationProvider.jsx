import { useEffect, useState } from "react";

import apiClient from "../api/axios";
import { LocationContext } from "./LocationContext";

export const LocationProvider = ({ children }) => {
  const [locationList, setLocationList] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get("/api/location");
        setLocationList(response.data);
        setSelectedLocation(response.data[selectedLocationIndex]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    // selectedLocationIndex가 변경될 때마다 실행
    if (locationList.length > 0) {
      setSelectedLocation(locationList[selectedLocationIndex]);
    }
  }, [selectedLocationIndex, locationList]);

  const handlePrevLocation = () => {
    setSelectedLocationIndex((prevIndex) =>
      prevIndex === 0 ? locationList.length - 1 : prevIndex - 1
    );
  };

  const handleNextLocation = () => {
    setSelectedLocationIndex((prevIndex) =>
      prevIndex === locationList.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        handlePrevLocation,
        handleNextLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
