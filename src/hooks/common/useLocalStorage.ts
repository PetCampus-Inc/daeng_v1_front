import { useState, useCallback, useEffect } from "react";

const isWindowUndefined = typeof window === "undefined";
const CUSTOM_STORAGE_EVENT = "storage-change";

/**
 * `localStorage`의 값을 React 상태로 관리하는 커스텀 훅입니다.
 *
 * - `localStorage`에서 값을 읽어와 상태로 관리
 * - 상태 변경 시, 자동으로 `localStorage`에 저장
 * - 다른 탭/창에서의 `localStorage` 변경 감지 및 상태 동기화
 *
 * @template T - 저장할 값의 타입
 * @param keyName `localStorage`에서 사용할 키 이름
 * @param defaultValue `localStorage`에 값이 없을 때 사용할 기본값
 * @param isNotUpdate 값이 자주 변경 되는 경우 true로 설정해 무한 루프를 막습니다. // FIXME 해당 매개변수 삭제 후 견주 마이페이지는 다른 hook으로 관리하기 (지은)
 * @returns `stateful` 값과, 이를 업데이트하는 함수를 튜플로 반환합니다.
 */
export const useLocalStorage = <T>(keyName: string, defaultValue: T, isNotUpdate?: boolean) => {
  const readValue = useCallback((): T => {
    if (isWindowUndefined) return defaultValue;

    try {
      const item = localStorage.getItem(keyName);
      return item ? parseStoredValue(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${keyName}":`, error);
      return defaultValue;
    }
  }, [defaultValue, keyName]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    if (isWindowUndefined) return;

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      localStorage.setItem(keyName, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);

      dispatchEvent(new Event(CUSTOM_STORAGE_EVENT));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isNotUpdate) {
      setStoredValue(readValue());
    }
  }, [readValue]);

  useEffect(() => {
    const handleStorageChange = (event: Event) => {
      if ("key" in event && event.key === keyName) setStoredValue(readValue());
    };

    addEventListener("storage", handleStorageChange);
    addEventListener(CUSTOM_STORAGE_EVENT, handleStorageChange);

    return () => {
      removeEventListener("storage", handleStorageChange);
      removeEventListener(CUSTOM_STORAGE_EVENT, handleStorageChange);
    };
  }, [keyName, defaultValue, readValue]);

  return [storedValue, setValue] as const;
};

/**
 * `localStorage`에서 특정 값을 삭제하는 훅
 *
 * - `localStorage`에서 특정 키의 값을 삭제
 * - 삭제 후, `localStorage`의 변경 이벤트를 발생시켜 상태 동기화
 *
 * @param keyName `localStorage`에서 삭제할 키 이름
 * @returns 로컬 스토리지 값 삭제 함수
 */
export const useResetLocalStorage = (keyName: string) =>
  useCallback(() => {
    if (isWindowUndefined) return;

    try {
      localStorage.removeItem(keyName);
      dispatchEvent(createStorageEvent(keyName));
    } catch (error) {
      console.error(`Error resetting localStorage key “${keyName}”:`, error);
    }
  }, [keyName]);

/**
 * `localStorage`에 값을 저장하는 훅
 *
 * - `localStorage`에 특정 키의 값을 저장
 * - 저장 후, `localStorage`의 변경 이벤트를 발생시켜 상태 동기화
 *
 * @returns `localStorage` 저장 함수
 */
export const useSetLocalStorage = () => useCallback(setLocalStorage, []);

/**
 * `localStorage`를 초기화하는 훅
 * @returns `localStorage` 초기화 함수
 */
export const useLocalStorageClear = () =>
  useCallback(() => {
    if (isWindowUndefined) return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage: ", error);
    }
  }, []);

const parseStoredValue = <T>(value: string): T => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing stored value:", error);
    throw error;
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  if (isWindowUndefined) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    dispatchEvent(createStorageEvent(key));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

class CustomStorageEvent extends Event {
  constructor(public key: string) {
    super(CUSTOM_STORAGE_EVENT, { bubbles: true, cancelable: true });
  }
}

const createStorageEvent = (key: string) => new CustomStorageEvent(key);
