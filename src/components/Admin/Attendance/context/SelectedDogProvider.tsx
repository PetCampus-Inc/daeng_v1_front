import React, { createContext, useContext, useReducer, PropsWithChildren } from "react";

import type { AttendData } from "types/admin.attendance.type";

type Action = { type: "ADD_DOG"; payload: AttendData } | { type: "REMOVE_DOG"; payload: number };

type SelectedDogsContextProps = [AttendData[], React.Dispatch<Action>];

const noOpDispatch: React.Dispatch<Action> = () => undefined;
const SelectedDogsContext = createContext<SelectedDogsContextProps>([[], noOpDispatch]);

const selectedDogsReducer = (state: AttendData[], action: Action) => {
  switch (action.type) {
    case "ADD_DOG": {
      const dogIndex = state.findIndex((dog) => dog.dogId === action.payload.dogId);
      if (dogIndex === -1) {
        return [...state, action.payload];
      } else {
        return state.filter((dog, index) => index !== dogIndex);
      }
    }
    case "REMOVE_DOG": {
      return state.filter((dog) => dog.dogId !== action.payload);
    }
    default:
      throw new Error("Unhandled action type");
  }
};

export const SelectedDogsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(selectedDogsReducer, []);

  return (
    <SelectedDogsContext.Provider value={[state, dispatch]}>
      {children}
    </SelectedDogsContext.Provider>
  );
};

export const useSelectedDogs = (): SelectedDogsContextProps => {
  const context = useContext(SelectedDogsContext);
  if (context === undefined) {
    throw new Error("useSelectedDogs must be used within a SelectedDogsProvider");
  }
  return context;
};
