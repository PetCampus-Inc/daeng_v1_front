import { createContext, PropsWithChildren, useContext, useState } from "react";

type AlertSettings = {
  attendance: boolean;
  careDog: boolean;
  school: boolean;
};

interface AlertSettingProps {
  alertSettings: AlertSettings;
  isAllOn: boolean;
  toggleAll: () => void;
  toggleIndividual: (key: keyof AlertSettings) => void;
}

export const AlertSettingContext = createContext<AlertSettingProps | null>(null);

export const AlertSettingProvider = ({ children }: PropsWithChildren) => {
  const [alertSettings, setAlertSettings] = useState({
    attendance: false,
    careDog: false,
    school: false
  });

  const isAllOn = Object.values(alertSettings).every(Boolean);

  const toggleAll = () => {
    const newState = !isAllOn;
    setAlertSettings({
      attendance: newState,
      careDog: newState,
      school: newState
    });
  };

  const toggleIndividual = (key: keyof AlertSettings) => {
    setAlertSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AlertSettingContext.Provider value={{ alertSettings, isAllOn, toggleAll, toggleIndividual }}>
      {children}
    </AlertSettingContext.Provider>
  );
};

export const useAlertSetting = () => {
  const context = useContext(AlertSettingContext);
  if (!context) {
    throw new Error("useAlertSetting must be used within a AlertSettingProvider");
  }
  return context;
};
