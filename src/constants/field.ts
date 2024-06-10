const AGREEMENT_FIELD = {
  TICKET_INFO_TERM: "ticketInfo_agreement",
  LIMITS_INFO_TERM: "limitsInfo_agreement",
  ACCIDENT_INFO_TERM: "accidentInfo_agreement",
  ABANDONMENT_INFO_TERM: "abandonmentInfo_agreement",
  PICKDROP_INFO_TERM: "pickDropInfo_agreement"
} as const;

/**
 * @description 가입신청서 필드 이름
 */
export const FIELD = {
  REQUEST_ITEMS: "requiredItemList",
  MEMBER_NAME: "memberName",
  MEMBER_GENDER: "memberGender",
  MEMBER_ADDRESS: "address",
  MEMBER_ADDRESS_DETAIL: "addressDetail",
  MEMBER_PHONE: "phoneNumber",
  EMERGENCY_NUMBER: "emergencyPhoneNumber",
  DOG_NAME: "dogName",
  DOG_GENDER: "dogGender",
  DOG_SIZE: "dogSize",
  BREED_ID: "breedId",
  BREED_NAME: "breedName",
  NEW_BREED: "newBreed",
  DOG_BIRTHDAY: "birthDate",
  NEUTRALIZATION: "neutralization",
  VACCINATION: "vaccination",
  VACCINATION_URL: "vaccinationUri",
  ALLERGY_DISEASE: "allergyDisease",
  PRICE_INFO: "priceInfo",
  TICKET_TYPE: "ticketType",
  ROUND_TICKET_NUMBER: "roundTicketNumber",
  MONTHLY_TICKET_NUMBER: "monthlyTicketNumber",
  ENROLLMENT_TICKET_TYPE: "enrollmentTicketType",
  ENROLLMENT_ROUND_TICKET_NUMBER: "enrollmentRoundTicketNumber",
  ENROLLMENT_MONTHLY_TICKET_NUMBER: "enrollmentMonthlyTicketNumber",
  OPEN_DAYS: "openDays",
  TICKET_INFO: "ticketInfo",
  LIMITS_INFO: "limitsInfo",
  ACCIDENT_INFO: "accidentInfo",
  ABANDONMENT_INFO: "abandonmentInfo",
  PICKDROP_STATE: "pickDropState",
  PICKDROP_NOTICE: "pickDropNotice",
  PICKDROP_REQUEST: "pickDropRequest",
  PICKDROP_TYPE: "pickDropType",
  PICKDROP_MEMO: "pickDropMemo",
  PICKDROP_INFO: "pickDropInfo",
  ...AGREEMENT_FIELD
} as const;

export const FIELD_KEYS = {
  MEMBER_NAME: 1,
  MEMBER_GENDER: 2,
  MEMBER_ADDRESS: 3,
  MEMBER_PHONE: 4,
  EMERGENCY_NUMBER: 5,
  DOG_NAME: 6,
  DOG_GENDER: 7,
  DOG_SIZE: 8,
  BREED_ID: 9,
  NEW_BREED: 10,
  DOG_BIRTHDAY: 11,
  NEUTRALIZATION: 12,
  VACCINATION: 13,
  VACCINATION_URL: 14,
  ALLERGY_DISEASE: 15,
  PRICE_INFO: 16,
  TICKET_TYPE: 17,
  ROUND_TICKET_NUMBER: 18,
  OPEN_DAYS: 19,
  MONTHLY_TICKET_NUMBER: 20,
  TICKET_INFO: 21,
  LIMITS_INFO: 22,
  ACCIDENT_INFO: 23,
  ABANDONMENT_INFO: 24,
  PICKDROP_STATE: 25,
  PICKDROP_NOTICE: 26,
  PICKDROP_REQUEST: 27,
  PICKDROP_TYPE: 28,
  PICKDROP_MEMO: 29,
  PICKDROP_INFO: 30
} as const;

/**
 * @description 이넘 객체로 필드 아이템을 정의
 */
export const FIELD_ITEMS = {
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
export type FieldItemLabels = typeof FIELD_ITEMS;
export type FieldItemKeys<K extends keyof FieldItemLabels> = keyof FieldItemLabels[K];

export const AGREEMENT_ITEM: Map<string, number> = new Map([
  [FIELD.TICKET_INFO_TERM, 21],
  [FIELD.LIMITS_INFO_TERM, 22],
  [FIELD.ACCIDENT_INFO_TERM, 23],
  [FIELD.ABANDONMENT_INFO_TERM, 24],
  [FIELD.PICKDROP_INFO_TERM, 30]
]);

export type AgreementsListType = {
  ticketInfo_agreement?: boolean;
  limitsInfo_agreement?: boolean;
  accidentInfo_agreement?: boolean;
  abandonmentInfo_agreement?: boolean;
  pickDropInfo_agreement?: boolean;
};
