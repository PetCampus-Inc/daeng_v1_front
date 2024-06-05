import { AGREEMENT_ITEM, FIELD_ITEMS } from "constants/item";

import { extractNumber, formatDate, getKeyForLabel } from "utils/formatter";
import { isNumber } from "utils/typeGuard";

import type { FieldValues } from "react-hook-form";
import type { AdminEnrollmentInfoType, TPickDropState } from "types/admin/enrollment.types";
import type { EnrollmentInfoType } from "types/member/enrollment.types";

// 견주 가입신청서 등록 어댑터
export class MemberFormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  get memberGender() {
    return getKeyForLabel("memberGender", this.value.memberGender);
  }

  get dogGender() {
    return getKeyForLabel("dogGender", this.value.dogGender);
  }

  get dogSize() {
    return getKeyForLabel("dogSize", this.value.dogSize);
  }

  get neutralization() {
    return getKeyForLabel("neutralization", this.value.neutralization);
  }

  get vaccination() {
    return getKeyForLabel("vaccination", this.value.vaccination);
  }

  get ticketType() {
    return getKeyForLabel("ticketType", this.value.ticketType);
  }

  get pickDropRequest() {
    return getKeyForLabel("pickDropRequest", this.value.pickDropRequest);
  }

  get pickDropType() {
    return getKeyForLabel("pickDropType", this.value.pickDropType);
  }

  get agreementList() {
    const item = {
      ticketInfo_agreement: this.value?.ticketInfo_agreement,
      limitsInfo_agreement: this.value?.limitsInfo_agreement,
      accidentInfo_agreement: this.value?.accidentInfo_agreement,
      abandonmentInfo_agreement: this.value?.abandonmentInfo_agreement,
      pickDropInfo_agreement: this.value?.pickDropInfo_agreement
    };

    return Object.entries(item)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => AGREEMENT_ITEM.get(key))
      .filter(isNumber);
  }

  adapt(): EnrollmentInfoType {
    // breedId가 존재하면 breedId를 그대로 사용하고, newBreed를 빈 문자열로 설정
    // breedId가 존재하지 않으면 breedId는 0으로, newBreed는 원래 값으로 설정
    const breedId = this.value.breedId || 0;
    const newBreed = this.value.breedId ? "" : this.value.newBreed || "";

    return {
      schoolFormId: this.value.schoolFormId,
      dogId: this.value.dogId || 0,
      memberId: this.value.member.memberId,
      memberName: this.value.memberName || "",
      memberGender: this.memberGender || "",
      address: this.value.address?.street || "",
      addressDetail: this.value.address?.detail || "",
      phoneNumber: this.value.phoneNumber || "",
      emergencyNumber: this.value.emergencyNumber || "",
      dogName: this.value.dogName || "",
      breedId,
      newBreed,
      dogGender: this.dogGender || "",
      dogSize: this.dogSize || "",
      birthDate: formatDate(this.value.year || 0, this.value.month || 0, this.value.day || 0),
      neutralization: this.neutralization || "",
      vaccination: this.vaccination || "",
      vaccinationUri: this.value.vaccinationUri || "",
      allergyDisease: this.value.allergyDisease || "",
      ticketType: this.ticketType || "",
      monthlyTicketNumber: extractNumber(this.value.monthlyTicketNumber || 0),
      roundTicketNumber: extractNumber(this.value.roundTicketNumber || 0),
      attendanceDays: this.value.openDays || [],
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
    return this.value.requiredItemList
      .map((item: boolean, idx: number) => (item ? idx : null)) // true일 때 id, 아니면 null
      .filter((id: number) => id !== null);
  }

  get ticketType(): string[] {
    return this.value.ticketType.map((type: string) => getKeyForLabel("ticketType", type));
  }

  get pickDropState() {
    return getKeyForLabel("pickDropState", this.value.pickDropState) as TPickDropState;
  }

  get roundTicketNumber() {
    // 회차권 티켓이 아닌 경우 0 반환
    if (!this.value.ticketType.includes(FIELD_ITEMS["ticketType"]["ROUND"])) return 0;
    return AdminFormToServerAdapter.extractTicketValues(this.value.roundTicketNumber);
  }

  get monthlyTicketNumber() {
    // 정기권 티켓이 아닌 경우 0 반환
    if (!this.value.ticketType.includes(FIELD_ITEMS["ticketType"]["MONTHLY"])) return 0;
    return AdminFormToServerAdapter.extractTicketValues(this.value.monthlyTicketNumber);
  }

  adapt(): AdminEnrollmentInfoType {
    return {
      schoolId: this.value.schoolId,
      adminId: this.value.adminId,
      formName: "",
      openDays: this.value.openDays || [],
      priceInfo: this.value.priceInfo || "",
      ticketType: this.ticketType || [],
      ticketInfo: this.value.ticketInfo || "",
      limitsInfo: this.value.limitsInfo || "",
      accidentInfo: this.value.accidentInfo || "",
      abandonmentInfo: this.value.abandonmentInfo || "",
      pickDropInfo: this.value.pickDropInfo || "",
      pickDropNotice: this.value.pickDropNotice || "",
      requiredItemList: this.requiredItemList || [],
      roundTicketNumber: this.roundTicketNumber || [],
      monthlyTicketNumber: this.monthlyTicketNumber || [],
      pickDropState: this.pickDropState
    };
  }
}
