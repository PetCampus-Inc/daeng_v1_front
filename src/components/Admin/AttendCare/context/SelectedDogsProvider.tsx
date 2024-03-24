import React, { createContext, useReducer, useMemo, type PropsWithChildren } from "react";

import type { ICareDogInfo } from "types/admin.caredog.type";

type Action =
  | { type: "ADD_DOG"; payload: ICareDogInfo }
  | { type: "REMOVE_DOG"; payload: number }
  | { type: "SET_DOGS"; payload: ICareDogInfo[] };

export type SelectedDogsContextProps = [ICareDogInfo[], React.Dispatch<Action>];

const noOpDispatch: React.Dispatch<Action> = () => undefined;
export const SelectedDogsContext = createContext<SelectedDogsContextProps>([[], noOpDispatch]);

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

export const SelectedDogsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(selectedDogsReducer, []);

  const context: SelectedDogsContextProps = useMemo(() => [state, dispatch], [state, dispatch]);

  return <SelectedDogsContext.Provider value={context}>{children}</SelectedDogsContext.Provider>;
};
