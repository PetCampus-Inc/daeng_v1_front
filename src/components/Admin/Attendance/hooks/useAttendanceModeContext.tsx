/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState, type PropsWithChildren } from "react";

import type { Attend } from "types/admin/attendance.type";

type Actions = {
  add: (dog: Attend) => void;
  remove: (dogId: number) => void;
};

const defaultActions: Actions = {
  add: () => {},
  remove: () => {}
};

const AttendanceModeContext = createContext<Attend[]>([]);
const AttendanceModeActions = createContext<Actions>(defaultActions);

export function AttendanceModeProvider({ children }: PropsWithChildren) {
  const [selectedDogs, setSelectedDogs] = useState<Attend[]>([]);

  const toggleSelectedDog = (dog: Attend) => {
    setSelectedDogs((prev) => {
      const isAlreadySelected = prev.some((d) => d.dogId === dog.dogId);

      if (isAlreadySelected) {
        return prev.filter((d) => d.dogId !== dog.dogId);
      } else {
        return [...prev, dog];
      }
    });
  };

  const removeSelectedDog = (dogId: number) => {
    setSelectedDogs((prev) => prev.filter((dog) => dog.dogId !== dogId));
  };

  const actions = {
    add: toggleSelectedDog,
    remove: removeSelectedDog
  };

  return (
    <AttendanceModeContext.Provider value={selectedDogs}>
      <AttendanceModeActions.Provider value={actions}>{children}</AttendanceModeActions.Provider>
    </AttendanceModeContext.Provider>
  );
}

export const useAttendanceModeContext = () => {
  const context = useContext(AttendanceModeContext);
  if (!context) {
    throw new Error("useAttendanceModeContext must be used within an AttendanceModeProvider");
  }
  return context;
};

export const useAttendanceModeActions = () => {
  const context = useContext(AttendanceModeActions);
  if (!context) {
    throw new Error("AttendanceModeActions must be used within an AttendanceModeProvider");
  }
  return context;
};
