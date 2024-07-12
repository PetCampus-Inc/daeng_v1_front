import { useState, useCallback } from "react";

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value !== null) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("Error reading localStorage key “" + keyName + "”: ", err);
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);
      } catch (err) {
        console.error("Error setting localStorage key “" + keyName + "”: ", err);
      }
    },
    [keyName]
  );

  return [storedValue, setValue] as const;
};

// 로컬 스토리지에서 값을 가져오는 훅
export const useLocalStorageValue = <T>(
  keyName: string,
  defaultValue: T | null = null
): T | null => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value !== null) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("Error reading localStorage key “" + keyName + "”: ", err);
      return defaultValue;
    }
  });

  return storedValue;
};

// 로컬 스토리지에 값을 설정하는 훅
export const useSetLocalStorage = () => {
  const setStoredValue = useCallback(<T>({ key, value }: { key: string; value: T }) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting localStorage key “" + key + "”: ", err);
    }
  }, []);

  return setStoredValue;
};

// 로컬 스토리지에서 특정 값을 삭제하는 훅
export const useResetLocalStorage = (keyName: string) => {
  const resetStoredValue = useCallback(() => {
    try {
      window.localStorage.removeItem(keyName);
    } catch (err) {
      console.error("Error resetting localStorage key “" + keyName + "”: ", err);
    }
  }, [keyName]);

  return resetStoredValue;
};

// 로컬 스토리지를 초기화하는 훅
export const useLocalStorageClear = () => {
  const clearStorage = useCallback(() => {
    try {
      window.localStorage.clear();
    } catch (err) {
      console.error("Error clearing localStorage: ", err);
    }
  }, []);

  return clearStorage;
};
