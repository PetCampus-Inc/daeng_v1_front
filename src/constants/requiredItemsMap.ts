import { FIELD_KEYS } from "./field";

// MEMO: 값이 고정되어 있는 것 같은데,
// 필수입력, 선택 입력 관리를 어떻게 하고 있는건 지 궁금합니다!

/**
 * 강아지 상세 정보 > 가입신청서의 requiredItems
 * 필수입력, 선택 입력 표시
 */
export const REQUIRED_ITEMS_DOG_MAP = new Map<number, boolean>([
  [FIELD_KEYS.MEMBER_NAME, false],
  [FIELD_KEYS.MEMBER_GENDER, true],
  [FIELD_KEYS.MEMBER_ADDRESS, false],
  [FIELD_KEYS.MEMBER_PHONE, false],
  [FIELD_KEYS.EMERGENCY_NUMBER, false],
  [FIELD_KEYS.DOG_NAME, false],
  [FIELD_KEYS.DOG_GENDER, true],
  [FIELD_KEYS.DOG_SIZE, false],
  [FIELD_KEYS.BREED_ID, false],
  [FIELD_KEYS.BIRTHDAY, false],
  [FIELD_KEYS.NEUTRALIZATION, true],
  [FIELD_KEYS.VACCINATION, true],
  [FIELD_KEYS.VACCINATION_URL, false],
  [FIELD_KEYS.ALLERGY_DISEASE, false],
  [FIELD_KEYS.TICKET_TYPE, false],
  [FIELD_KEYS.MONTHLY_TICKET_NUMBER, true],
  [FIELD_KEYS.ROUND_TICKET_NUMBER, true],
  [FIELD_KEYS.OPEN_DAYS, true],
  [FIELD_KEYS.TICKET_INFO, true],
  [FIELD_KEYS.LIMITS_INFO, true],
  [FIELD_KEYS.ACCIDENT_INFO, true],
  [FIELD_KEYS.ABANDONMENT_INFO, true],
  [FIELD_KEYS.ABANDONMENT_INFO, true],
  [FIELD_KEYS.PICKDROP_REQUEST, true],
  [FIELD_KEYS.PICKDROP_TYPE, true],
  [FIELD_KEYS.PICKDROP_MEMO, true],
  [FIELD_KEYS.PICKDROP_INFO, true],
  [FIELD_KEYS.ABANDONMENT_INFO, true]
]);
