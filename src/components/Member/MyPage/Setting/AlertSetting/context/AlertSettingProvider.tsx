import { createContext, PropsWithChildren, useContext, useState } from "react";

type AlertSettings = {
  careDog: boolean;
  activity: boolean;
};

interface AlertSettingProps {
  alertSettings: AlertSettings;
  isAllOn: boolean;
  toggleAll: () => void;
  toggleIndividual: (key: keyof AlertSettings) => void;
}

export const AlertSettingContext = createContext<AlertSettingProps | null>(null);

export const AlertSettingProvider = ({ children }: PropsWithChildren) => {
  // FIXME 알림 여부 api 추가 필요
  const [alertSettings, setAlertSettings] = useState({
    careDog: false,
    activity: false
  });

  const isAllOn = Object.values(alertSettings).every(Boolean);

  const toggleAll = () => {
    const newState = !isAllOn;
    setAlertSettings({
      careDog: newState,
      activity: newState
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
