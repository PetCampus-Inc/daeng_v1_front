import { Role } from "types/common/role.types";

export type SocialProvider = "KAKAO" | "GOOGLE" | "APPLE";

export interface MemberLoginData {
  idToken: string;
  deviceId: string;
}

export interface MemberAuthData {
  memberId: number;
  role: Role;
  schoolName: string;
  enrollmentFormId: number;
}
