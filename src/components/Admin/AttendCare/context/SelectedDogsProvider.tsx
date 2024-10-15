import React, { createContext, useReducer, useMemo, type PropsWithChildren } from "react";

import type { CareDogInfo } from "types/admin/care.types";

type Action =
  | { type: "ADD_DOG"; payload: CareDogInfo }
  | { type: "REMOVE_DOG"; payload: number }
  | { type: "SET_DOGS"; payload: CareDogInfo[] };

export type SelectedDogsContextProps = [CareDogInfo[], React.Dispatch<Action>];

const noOpDispatch: React.Dispatch<Action> = () => undefined;
export const SelectedDogsContext = createContext<SelectedDogsContextProps>([[], noOpDispatch]);

const selectedDogsReducer = (state: CareDogInfo[], action: Action) => {
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

export const SelectedDogsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(selectedDogsReducer, []);

  const context: SelectedDogsContextProps = useMemo(() => [state, dispatch], [state, dispatch]);

  return <SelectedDogsContext.Provider value={context}>{children}</SelectedDogsContext.Provider>;
};
