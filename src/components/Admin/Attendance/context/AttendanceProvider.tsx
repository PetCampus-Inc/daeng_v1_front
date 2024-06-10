import { type PropsWithChildren, createContext, useContext, useState } from "react";

interface AttendanceContextVale {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

const AttendanceContext = createContext<AttendanceContextVale | null>(null);

export const AttendanceProvider = ({ children }: PropsWithChildren) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <AttendanceContext.Provider value={{ isFocused, setIsFocused }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useInputFocus = () => {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error("useInputFocus must be used within a AttendanceProvider");
  }

  return context;
};
