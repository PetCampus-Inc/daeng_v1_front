import { Role } from "types/common/role.types";

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

export type LoginMethod = "kakao" | "google" | "apple";

export interface MemberLoginData {
  idToken: string;
  deviceId: string;
}

export interface MemberAuthData {
  role: Role;
  memberId: number;
  dogIds: number[];
  schoolId: number;
  schoolName: string;
  enrollmentFormId: number;
}
