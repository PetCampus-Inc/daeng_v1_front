import { AGREEMENT_ITEM, FIELD, FIELD_ITEMS } from "constants/field";

import { extractNumber, formatDate, getKeyForLabel } from "utils/formatter";
import { isNumber } from "utils/is";

import type { FieldValues } from "react-hook-form";
import type { NewTicketReq } from "types/admin/attendance.type";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { EnrollmentInfoType } from "types/member/enrollment.types";

// 기본 어댑터
abstract class BaseAdapter {
  protected value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }
  protected extractNumber(value: string) {
    return extractNumber(value);
  }

  protected formatDate(year: string, month: string, day: string): string {
    return formatDate(year, month, day);
  }

  protected getAgreementList(fields: string[]): number[] {
    return fields
      .filter((field) => this.value[field] === true)
      .map((field) => AGREEMENT_ITEM.get(field))
      .filter(isNumber);
  }
}

// Member 관련 어댑터
abstract class MemberAdapter extends BaseAdapter {
  get getMemberGender() {
    return getKeyForLabel(FIELD.MEMBER_GENDER, this.value[FIELD.MEMBER_GENDER]);
  }

  get getDogGender() {
    return getKeyForLabel(FIELD.DOG_GENDER, this.value[FIELD.DOG_GENDER]);
  }

  get getDogSize() {
    return getKeyForLabel(FIELD.DOG_SIZE, this.value[FIELD.DOG_SIZE]);
  }

  get getNeutralization() {
    return getKeyForLabel(FIELD.NEUTRALIZATION, this.value[FIELD.NEUTRALIZATION]);
  }

  get getVaccination() {
    return getKeyForLabel(FIELD.VACCINATION, this.value[FIELD.VACCINATION]);
  }

  get getTicketType() {
    return getKeyForLabel(FIELD.TICKET_TYPE, this.value[FIELD.TICKET_TYPE]);
  }

  get getPickDropRequest() {
    return getKeyForLabel(FIELD.PICKDROP_REQUEST, this.value[FIELD.PICKDROP_REQUEST]);
  }

  get getPickDropType() {
    return getKeyForLabel(FIELD.PICKDROP_TYPE, this.value[FIELD.PICKDROP_TYPE]);
  }

  // breedId가 존재하면 breedId를 그대로 사용하고, newBreed를 빈 문자열로 설정
  // breedId가 존재하지 않으면 breedId는 0으로, newBreed는 원래 값으로 설정
  protected getBreedInfo(): { breedId: number; newBreed: string } {
    const breedId = this.value[FIELD.BREED_ID] || 0;
    const newBreed = breedId ? "" : this.value[FIELD.NEW_BREED] || "";
    return { breedId, newBreed };
  }

  // 티켓 갯수 반환하는 함수
  // 선택된 티켓 유형만 갯수 추출 나머지 유형은 0 반환
  protected getTicketNumber(type: "ROUND" | "MONTHLY"): number {
    const fieldName = type === "ROUND" ? FIELD.ROUND_TICKET_NUMBER : FIELD.MONTHLY_TICKET_NUMBER;
    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_ITEMS[FIELD.TICKET_TYPE][type])) return 0;
    return parseInt(this.value[fieldName]);
  }
}

// Admin 관련 어댑터
abstract class AdminAdapter extends BaseAdapter {
  protected static extractTicketValues(items: Record<string, string>[]): number[] {
    return items.map((item) => parseInt(item.value, 10));
  }

  get getRequiredItemList(): number[] {
    return this.value[FIELD.REQUEST_ITEMS]
      .map((item: boolean, idx: number) => (item ? idx : null))
      .filter((id: number) => id !== null);
  }

  get getTicketTypes(): string[] {
    return this.value[FIELD.TICKET_TYPE].map((type: string) =>
      getKeyForLabel(FIELD.TICKET_TYPE, type)
    );
  }

  get getPickDropState() {
    return getKeyForLabel(FIELD.PICKDROP_STATE, this.value[FIELD.PICKDROP_STATE]);
  }

  // 티켓 갯수 반환하는 함수
  // 선택된 티켓 유형만 갯수 추출 나머지 유형은 [0] 반환
  protected getTicketNumber(type: "ROUND" | "MONTHLY"): number[] {
    const fieldName = type === "ROUND" ? FIELD.ROUND_TICKET_NUMBER : FIELD.MONTHLY_TICKET_NUMBER;
    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_ITEMS[FIELD.TICKET_TYPE][type])) return [0];
    return AdminAdapter.extractTicketValues(this.value[fieldName]);
  }
}

// 견주 가입신청서 등록 어댑터
export class MemberFormToServerAdapter extends MemberAdapter {
  adapt(): EnrollmentInfoType {
    const { breedId, newBreed } = this.getBreedInfo();

    const agreementFields = [
      FIELD.TICKET_INFO_TERM,
      FIELD.LIMITS_INFO_TERM,
      FIELD.ACCIDENT_INFO_TERM,
      FIELD.ABANDONMENT_INFO_TERM,
      FIELD.PICKDROP_INFO_TERM
    ];

    return {
      schoolFormId: this.value.schoolFormId,
      dogId: this.value.dogId || 0,
      memberId: this.value.member.memberId,
      memberName: this.value[FIELD.MEMBER_NAME] || "",
      memberGender: this.getMemberGender || "",
      address: this.value[FIELD.MEMBER_ADDRESS] || "",
      addressDetail: this.value[FIELD.MEMBER_ADDRESS_DETAIL] || "",
      phoneNumber: this.value[FIELD.MEMBER_PHONE] || "",
      emergencyPhoneNumber: this.value[FIELD.EMERGENCY_NUMBER] || "",
      dogName: this.value[FIELD.DOG_NAME] || "",
      breedId,
      newBreed,
      dogGender: this.getDogGender || "",
      dogSize: this.getDogSize || "",
      birthDate: formatDate(this.value.year || 0, this.value.month || 0, this.value.day || 0),
      neutralization: this.getNeutralization || "",
      vaccination: this.getVaccination || "",
      vaccinationUri: this.value[FIELD.VACCINATION_URL] || [],
      allergyDisease: this.value[FIELD.ALLERGY_DISEASE] || "",
      ticketType: this.getTicketType || "",
      monthlyTicketNumber: extractNumber(this.value[FIELD.MONTHLY_TICKET_NUMBER] || 0),
      roundTicketNumber: extractNumber(this.value[FIELD.ROUND_TICKET_NUMBER] || 0),
      attendanceDays: this.value[FIELD.OPEN_DAYS] || [],
      pickDropRequest: this.getPickDropRequest || "",
      pickDropType: this.getPickDropType || "",
      pickDropMemo: this.value.pickDropMemo || "",
      agreementList: this.getAgreementList(agreementFields) || []
    };
  }
}

// 원장 가입신청서 등록 어댑터
export class AdminFormToServerAdapter extends AdminAdapter {
  adapt(): AdminEnrollmentInfoType {
    return {
      schoolId: this.value.schoolId,
      adminId: this.value.adminId,
      formName: "",
      openDays: this.value[FIELD.OPEN_DAYS] || [],
      priceInfo: this.value[FIELD.PRICE_INFO] || "",
      ticketType: this.getTicketTypes || [],
      ticketInfo: this.value[FIELD.TICKET_INFO] || "",
      limitsInfo: this.value[FIELD.LIMITS_INFO] || "",
      accidentInfo: this.value[FIELD.ACCIDENT_INFO] || "",
      abandonmentInfo: this.value[FIELD.ABANDONMENT_INFO] || "",
      pickDropInfo: this.value[FIELD.PICKDROP_INFO] || "",
      pickDropNotice: this.value[FIELD.PICKDROP_NOTICE] || "",
      requiredItemList: this.getRequiredItemList || [],
      roundTicketNumber: this.getTicketNumber("ROUND") || [],
      monthlyTicketNumber: this.getTicketNumber("MONTHLY") || [],
      pickDropState: this.getPickDropState || ""
    };
  }
}

// 이용권 갱신 어댑터
export class NewTicketFormToServerAdapter extends MemberAdapter {
  adapt(): NewTicketReq {
    return {
      dogId: this.value.dogId,
      ticketType: this.getTicketType || "",
      roundTicketNumber: this.getTicketNumber("ROUND"),
      monthlyTicketNumber: this.getTicketNumber("MONTHLY"),
      startDate: `${this.value.year}-${this.value.month}-${this.value.day}`,
      attendanceDays: this.value.attendanceDays
    };
  }
}
