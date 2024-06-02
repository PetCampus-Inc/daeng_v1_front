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
