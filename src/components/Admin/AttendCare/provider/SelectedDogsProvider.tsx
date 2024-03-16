import React, { createContext, useContext, useReducer, ReactNode } from "react";

import type { ICareDogInfo } from "types/admin.caredog.type";

type Action =
  | { type: "ADD_DOG"; payload: ICareDogInfo }
  | { type: "REMOVE_DOG"; payload: number }
  | { type: "SET_DOGS"; payload: ICareDogInfo[] };

type SelectedDogsContextProps = [ICareDogInfo[], React.Dispatch<Action>];

const noOpDispatch: React.Dispatch<Action> = () => undefined;
const SelectedDogsContext = createContext<SelectedDogsContextProps>([[], noOpDispatch]);

const selectedDogsReducer = (state: ICareDogInfo[], action: Action) => {
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
    case "SET_DOGS": {
      return action.payload;
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
