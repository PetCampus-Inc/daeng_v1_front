import type { MemberGenderType, RelationType } from "./enrollment.types";

export type MemberAuthType = {
  memberId: number;
  memberProfileUri: string;
  memberName: string;
  memberGender: MemberGenderType;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  relation: RelationType;
};

export type LoginMethod = "kakao" | "google" | "apple" | "email";

export interface MemberLoginInfo {
  method: LoginMethod;
  idToken: string;
  deviceId: string;
}
