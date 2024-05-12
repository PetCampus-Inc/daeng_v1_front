export function isProviderValid(
  provider: string | undefined
): provider is "kakao" | "google" | "apple" {
  return provider !== undefined && ["kakao", "google", "apple"].includes(provider);
}
