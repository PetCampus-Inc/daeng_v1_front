import { AGREEMENT_ITEM, FIELD, FIELD_ITEMS } from "constants/field";

import { extractNumber, formatDate, getKeyForLabel } from "utils/formatter";
import { isNumber } from "utils/typeGuard";

import type { FieldValues } from "react-hook-form";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { EnrollmentInfoType } from "types/member/enrollment.types";

// 견주 가입신청서 등록 어댑터
export class MemberFormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  get memberGender() {
    return getKeyForLabel(FIELD.MEMBER_GENDER, this.value[FIELD.MEMBER_GENDER]);
  }

  get dogGender() {
    return getKeyForLabel(FIELD.DOG_GENDER, this.value[FIELD.DOG_GENDER]);
  }

  get dogSize() {
    return getKeyForLabel(FIELD.DOG_SIZE, this.value[FIELD.DOG_SIZE]);
  }

  get neutralization() {
    return getKeyForLabel(FIELD.NEUTRALIZATION, this.value[FIELD.NEUTRALIZATION]);
  }

  get vaccination() {
    return getKeyForLabel(FIELD.VACCINATION, this.value[FIELD.VACCINATION]);
  }

  get ticketType() {
    return getKeyForLabel(FIELD.TICKET_TYPE, this.value[FIELD.TICKET_TYPE]);
  }

  get pickDropRequest() {
    return getKeyForLabel(FIELD.PICKDROP_REQUEST, this.value[FIELD.PICKDROP_REQUEST]);
  }

  get pickDropType() {
    return getKeyForLabel(FIELD.PICKDROP_TYPE, this.value[FIELD.PICKDROP_TYPE]);
  }

  get agreementList() {
    const item = {
      ticketInfo_agreement: this.value?.[FIELD.TICKET_INFO_TERM],
      limitsInfo_agreement: this.value?.[FIELD.LIMITS_INFO_TERM],
      accidentInfo_agreement: this.value?.[FIELD.ACCIDENT_INFO_TERM],
      abandonmentInfo_agreement: this.value?.[FIELD.ABANDONMENT_INFO_TERM],
      pickDropInfo_agreement: this.value?.[FIELD.PICKDROP_INFO_TERM]
    };

    return Object.entries(item)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => AGREEMENT_ITEM.get(key))
      .filter(isNumber);
  }

  adapt(): EnrollmentInfoType {
    // breedId가 존재하면 breedId를 그대로 사용하고, newBreed를 빈 문자열로 설정
    // breedId가 존재하지 않으면 breedId는 0으로, newBreed는 원래 값으로 설정
    const breedId = this.value[FIELD.DOG_BREED] || 0;
    const newBreed = this.value[FIELD.DOG_BREED] ? "" : this.value[FIELD.NEW_BREED] || "";

    return {
      schoolFormId: this.value.schoolFormId,
      dogId: this.value.dogId || 0,
      memberId: this.value.member.memberId,
      memberName: this.value[FIELD.MEMBER_NAME] || "",
      memberGender: this.memberGender || "",
      address: this.value[FIELD.MEMBER_ADDRESS] || "",
      addressDetail: this.value[FIELD.MEMBER_ADDRESS_DETAIL] || "",
      phoneNumber: this.value[FIELD.MEMBER_PHONE] || "",
      emergencyPhoneNumber: this.value[FIELD.EMERGENCY_NUMBER] || "",
      dogName: this.value[FIELD.DOG_NAME] || "",
      breedId,
      newBreed,
      dogGender: this.dogGender || "",
      dogSize: this.dogSize || "",
      birthDate: formatDate(this.value.year || 0, this.value.month || 0, this.value.day || 0),
      neutralization: this.neutralization || "",
      vaccination: this.vaccination || "",
      vaccinationUri: this.value[FIELD.VACCINATION_URL] || "",
      allergyDisease: this.value[FIELD.ALLERGY_DISEASE] || "",
      ticketType: this.ticketType || "",
      monthlyTicketNumber: extractNumber(this.value[FIELD.MONTHLY_TICKET_NUMBER] || 0),
      roundTicketNumber: extractNumber(this.value[FIELD.ROUND_TICKET_NUMBER] || 0),
      attendanceDays: this.value[FIELD.OPEN_DAYS] || [],
      pickDropRequest: this.pickDropRequest || "",
      pickDropType: this.pickDropType || "",
      pickDropMemo: this.value.pickDropMemo || "",
      agreementList: this.agreementList || []
    };
  }
}

// 원장 가입신청서 등록 어댑터
export class AdminFormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  static extractTicketValues = (items: Record<string, string>[]): number[] => {
    return items.map((item) => parseInt(item.value, 10));
  };

  get requiredItemList(): number[] {
    return this.value[FIELD.REQUEST_ITEMS]
      .map((item: boolean, idx: number) => (item ? idx : null)) // true일 때 id, 아니면 null
      .filter((id: number) => id !== null);
  }

  get ticketType(): string[] {
    return this.value[FIELD.TICKET_TYPE].map((type: string) =>
      getKeyForLabel(FIELD.TICKET_TYPE, type)
    );
  }

  get pickDropState() {
    return getKeyForLabel(FIELD.PICKDROP_STATE, this.value[FIELD.PICKDROP_STATE]);
  }

  get roundTicketNumber() {
    // 회차권 티켓이 아닌 경우 0 반환
    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_ITEMS[FIELD.TICKET_TYPE]["ROUND"])) return 0;
    return AdminFormToServerAdapter.extractTicketValues(this.value[FIELD.ROUND_TICKET_NUMBER]);
  }

  get monthlyTicketNumber() {
    // 정기권 티켓이 아닌 경우 0 반환
    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_ITEMS[FIELD.TICKET_TYPE]["MONTHLY"]))
      return 0;
    return AdminFormToServerAdapter.extractTicketValues(this.value[FIELD.MONTHLY_TICKET_NUMBER]);
  }

  adapt(): AdminEnrollmentInfoType {
    return {
      schoolId: this.value.schoolId,
      adminId: this.value.adminId,
      formName: "",
      openDays: this.value[FIELD.OPEN_DAYS] || [],
      priceInfo: this.value[FIELD.PRICE_INFO] || "",
      ticketType: this.ticketType || [],
      ticketInfo: this.value[FIELD.TICKET_INFO] || "",
      limitsInfo: this.value[FIELD.LIMITS_INFO] || "",
      accidentInfo: this.value[FIELD.ACCIDENT_INFO] || "",
      abandonmentInfo: this.value[FIELD.ABANDONMENT_INFO] || "",
      pickDropInfo: this.value[FIELD.PICKDROP_INFO] || "",
      pickDropNotice: this.value[FIELD.PICKDROP_NOTICE] || "",
      requiredItemList: this.requiredItemList || [],
      roundTicketNumber: this.roundTicketNumber || [],
      monthlyTicketNumber: this.monthlyTicketNumber || [],
      pickDropState: this.pickDropState || ""
    };
  }
}
