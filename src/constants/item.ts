export const ITEM_KEYS = {
  MEMBER_NAME: 1,
  MEMBER_GENDER: 2,
  MEMBER_ADDRESS: 3,
  MEMBER_PHONE: 4,
  EMERGENCY_NUMBER: 5,
  DOG_NAME: 6,
  DOG_GENDER: 7,
  DOG_SIZE: 8,
  DOG_BREED: 9,
  NEW_BREED: 10,
  DOG_BIRTHDAY: 11,
  NEUTRALIZATION: 12,
  VACCINATION: 13,
  VACCINATION_FILE: 14,
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
  PICKDROP_OPERATION: 25,
  PICKDROP_NOTICE: 26,
  PICKDROP_REQUEST: 27,
  PICKDROP_TYPE: 28,
  PICKDROP_MEMO: 29,
  PICKDROP_INFO: 30
} as const;

export interface ItemMapValue {
  neutralization: string;
  vaccination: string;
}
export const ITEM_MAP = new Map<string, string | ItemMapValue>([
  ["남", "MALE"],
  ["여", "FEMALE"],
  ["수컷", "MALE"],
  ["암컷", "FEMALE"],
  ["대형견", "BIG"],
  ["중형견", "MEDIUM"],
  ["소형견", "SMALL"],
  ["했어요", { neutralization: "NEUTERED", vaccination: "VACCINATED" }],
  ["안했어요", { neutralization: "NOT_NEUTERED", vaccination: "NOT_VACCINATED" }],
  ["신청", "REQUEST"],
  ["미신청", "NOT_REQUEST"],
  ["편도", "ONE_WAY"],
  ["왕복", "ROUND"],
  ["회차권", "ROUND"],
  ["정기권", "MONTHLY"],
  ["운영", "RUNNING"],
  ["미운영", "NOT_RUNNING"]
]);

export type ItemMaps = {
  memberGender: { MALE: string; FEMALE: string };
  dogGender: { MALE: string; FEMALE: string };
  dogSize: { BIG: string; MEDIUM: string; SMALL: string };
  neutralization: { NEUTERED: string; NOT_NEUTERED: string };
  vaccination: { VACCINATED: string; NOT_VACCINATED: string };
  pickDropRequest: { REQUEST: string; NOT_REQUEST: string };
  pickDropType: { ONE_WAY: string; ROUND: string };
  pickDropState: { RUNNING: string; NOT_RUNNING: string };
  ticketType: { ROUND: string; MONTHLY: string };
};

export const ITEM_MAPS: ItemMaps = {
  memberGender: { MALE: "남", FEMALE: "여" },
  dogGender: { MALE: "수컷", FEMALE: "암컷" },
  dogSize: { BIG: "대형견", MEDIUM: "중형견", SMALL: "소형견" },
  neutralization: { NEUTERED: "했어요", NOT_NEUTERED: "안했어요" },
  vaccination: { VACCINATED: "했어요", NOT_VACCINATED: "안했어요" },
  pickDropRequest: { REQUEST: "신청", NOT_REQUEST: "미신청" },
  pickDropType: { ONE_WAY: "편도", ROUND: "왕복" },
  pickDropState: { RUNNING: "운영", NOT_RUNNING: "미운영" },
  ticketType: { ROUND: "회차권", MONTHLY: "정기권" }
};
