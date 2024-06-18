interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

// Avoid Chrome DevTools blue warning.
export function getPlatform(): string {
  const uaData = (navigator as any).userAgentData as NavigatorUAData | undefined;

  if (uaData?.platform) {
    return uaData.platform;
  }

  return navigator.platform;
}
