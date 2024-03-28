import React, { createContext, useContext, useReducer, ReactNode } from "react";

import type { IAttendDogInfo } from "types/admin.attendance.type";

type Action =
  | { type: "ADD_DOG"; payload: IAttendDogInfo }
  | { type: "REMOVE_DOG"; payload: number };

type SelectedDogsContextProps = [IAttendDogInfo[], React.Dispatch<Action>];

const noOpDispatch: React.Dispatch<Action> = () => undefined;
const SelectedDogsContext = createContext<SelectedDogsContextProps>([[], noOpDispatch]);

const selectedDogsReducer = (state: IAttendDogInfo[], action: Action) => {
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

interface SelectedDogsProviderProps {
  children: ReactNode;
}

export const SelectedDogsProvider = ({ children }: SelectedDogsProviderProps) => {
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
