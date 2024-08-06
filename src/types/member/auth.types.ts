import { MemberRole } from "types/common/role.types";
import { Status } from "types/common/status.types";

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

export interface FirebaseAuthData {
  idToken: string;
  deviceId: string;
}

export interface MemberAuthData {
  memberId: number;
  role: typeof MemberRole.ROLE_ANONYMOUS | typeof MemberRole.ROLE_MEMBER;
  dogs: DogResponse[];
}

export interface DogResponse {
  dogId: number;
  status: Status;
  schoolName: string;
}
