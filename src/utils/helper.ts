export function throttle<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let lastTime = 0;
  return function executedFunction(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      func(...args);
    }
  } as T;
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  } as T;
}

/**
 * @description Check if the object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};
