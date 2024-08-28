/**
 * 필드 매핑을 위한 상수 객체
 * 각 필드는 백엔드 키와 프론트엔드 값의 쌍으로 구성되어 있습니다.
 */
export const FIELD_MAPPING = {
  memberGender: { MALE: "남", FEMALE: "여" },
  dogGender: { MALE: "수컷", FEMALE: "암컷" },
  dogSize: { BIG: "대형견", MEDIUM: "중형견", SMALL: "소형견" },
  neutralization: { NEUTERED: "했어요", NOT_NEUTERED: "안했어요" },
  vaccination: { VACCINATED: "했어요", NOT_VACCINATED: "안했어요" },
  pickDropRequest: { REQUEST: "신청", NOT_REQUEST: "미신청" },
  pickDropType: { ONE_WAY: "편도", ROUND: "왕복" },
  pickDropState: { RUNNING: "운영", NOT_RUNNING: "미운영" },
  ticketType: { ROUND: "회차권", MONTHLY: "정기권" }
} as const;

export type FieldMappingType = typeof FIELD_MAPPING;
export type FieldKey = keyof FieldMappingType;
export type BeFieldType<K extends FieldKey> = keyof FieldMappingType[K];
export type FeFieldType<K extends FieldKey> = FieldMappingType[K][BeFieldType<K>];
