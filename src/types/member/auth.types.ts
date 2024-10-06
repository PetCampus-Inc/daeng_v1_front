export type SocialProvider = "kakao" | "google" | "apple";

export interface SocialAuthData {
  idToken: string;
  fcmToken: string;
}

export interface MemberAuthData {
  dogId: number;
  schoolName: string;
}
