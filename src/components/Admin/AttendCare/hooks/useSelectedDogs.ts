import { useContext } from "react";

import {
  SelectedDogsContext,
  type SelectedDogsContextProps
} from "../context/SelectedDogsProvider";

export const useSelectedDogs = (): SelectedDogsContextProps => {
  const context = useContext(SelectedDogsContext);

  if (context === null) {
    throw new Error("useSelectedDogs must be used within a SelectedDogsProvider");
  }

  return context;
};
