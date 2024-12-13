import { useContext } from "react";

import { LocationContext } from "./LocationContext";

export const useLocation = () => {
  const { selectedLocation, handlePrevLocation, handleNextLocation } =
    useContext(LocationContext);

  return { selectedLocation, handlePrevLocation, handleNextLocation };
};
