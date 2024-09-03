export type SocialProvider = "KAKAO" | "GOOGLE" | "APPLE";

export interface SocialAuthData {
  idToken: string;
  deviceId: string;
  fcmToken: string;
}

export interface MemberAuthData {
  dogId: string;
  schoolName: string;
}
