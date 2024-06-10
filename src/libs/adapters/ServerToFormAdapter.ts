import { AGREEMENT_ITEM, FIELD } from "constants/field";

import { getLabelForValue } from "utils/formatter";

import type { MemberFormData } from "types/admin/enrollment.types";
import type { EnrollmentDataType, EnrollmentFormDataType } from "types/member/enrollment.types";

// 가입신청서 폼 조회
// case1. (견주) 가입신청서 폼 조회, case2. (원장) 가입 신청서 폼 조회
export class EnrollmentFormAdapter {
  private value: EnrollmentDataType;

  constructor(obj: EnrollmentDataType) {
    this.value = obj;
  }

  get getRequiredItemList(): Map<number, boolean> {
    return new Map(this.value[FIELD.REQUEST_ITEMS].map((itemNumber: number) => [itemNumber, true]));
  }

  get getTicketType() {
    return this.value[FIELD.TICKET_TYPE].map((type) => getLabelForValue(FIELD.TICKET_TYPE, type));
  }

  adapt(): EnrollmentFormDataType {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.getTicketType
    };
  }
}

// (견주가 작성한) 가입 신청서 조회
export class MemberFormAdapter {
  protected value: MemberFormData;

  constructor(obj: MemberFormData) {
    this.value = obj;
  }

  get getRequiredItemList(): Map<number, boolean> {
    return new Map(
      this.value.schoolFormResponse[FIELD.REQUEST_ITEMS].map((itemNumber: number) => [
        itemNumber,
        true
      ])
    );
  }

  // get pickDropState() {
  //   return getLabelForValue("pickDropState", this.value.schoolFormResponse.pickDropState);
  // }

  get getEnrollmentTicketType(): string {
    return getLabelForValue(FIELD.TICKET_TYPE, this.value[FIELD.ENROLLMENT_TICKET_TYPE]);
  }

  get getTicketType(): string[] {
    return this.value.schoolFormResponse[FIELD.TICKET_TYPE].map((type) =>
      getLabelForValue(FIELD.TICKET_TYPE, type)
    );
  }

  get year() {
    return this.value[FIELD.BIRTHDAY][0];
  }

  get month() {
    return this.value[FIELD.BIRTHDAY][1];
  }

  get day() {
    return this.value[FIELD.BIRTHDAY][2];
  }

  get getPickDropRequest() {
    return getLabelForValue(FIELD.PICKDROP_REQUEST, this.value[FIELD.PICKDROP_REQUEST]);
  }

  get getPickDropType() {
    return getLabelForValue(FIELD.PICKDROP_TYPE, this.value[FIELD.PICKDROP_TYPE]);
  }

  get getMemberGender() {
    return getLabelForValue(FIELD.MEMBER_GENDER, this.value[FIELD.MEMBER_GENDER]);
  }

  get getDogGender(): string {
    return getLabelForValue(FIELD.DOG_GENDER, this.value[FIELD.DOG_GENDER]);
  }

  get getDogSize(): string {
    return getLabelForValue(FIELD.DOG_SIZE, this.value[FIELD.DOG_SIZE]);
  }

  get getNeutralization(): string {
    return getLabelForValue(FIELD.NEUTRALIZATION, this.value[FIELD.NEUTRALIZATION]);
  }

  get getVaccination(): string {
    return getLabelForValue(FIELD.VACCINATION, this.value[FIELD.VACCINATION]);
  }

  get getAgreementsList() {
    const result: { [key: string]: boolean } = {};
    this.value[FIELD.AGREEMENTS].forEach((id) => {
      const key = Array.from(AGREEMENT_ITEM.entries()).find(([_, value]) => value === id)?.[0];
      if (key) {
        result[key] = true;
      }
    });

    return result;
  }

  adapt() {
    return {
      ...this.value,
      enrollmentTicketType: this.getEnrollmentTicketType,
      pickDropRequest: this.getPickDropRequest,
      pickDropType: this.getPickDropType,
      memberGender: this.getMemberGender,
      dogGender: this.getDogGender,
      dogSize: this.getDogSize,
      neutralization: this.getNeutralization,
      vaccination: this.getVaccination,
      agreements: this.getAgreementsList,
      year: this.year,
      month: this.month,
      day: this.day,
      requiredItemList: this.getRequiredItemList,
      schoolFormId: this.value.schoolFormResponse.schoolFormId,
      schoolFormName: this.value.schoolFormResponse.schoolFormName,
      priceInfo: this.value.schoolFormResponse[FIELD.PRICE_INFO],
      roundTicketNumber: this.value.schoolFormResponse[FIELD.ROUND_TICKET_NUMBER],
      openDays: this.value.schoolFormResponse[FIELD.OPEN_DAYS],
      monthlyTicketNumber: this.value.schoolFormResponse[FIELD.MONTHLY_TICKET_NUMBER],
      ticketType: this.getTicketType,
      ticketInfo: this.value.schoolFormResponse[FIELD.TICKET_INFO],
      limitsInfo: this.value.schoolFormResponse[FIELD.LIMITS_INFO],
      accidentInfo: this.value.schoolFormResponse[FIELD.ACCIDENT_INFO],
      abandonmentInfo: this.value.schoolFormResponse[FIELD.ABANDONMENT_INFO],
      pickDropNotice: this.value.schoolFormResponse[FIELD.PICKDROP_NOTICE],
      pickDropInfo: this.value.schoolFormResponse[FIELD.PICKDROP_INFO],
      member: this.value.schoolFormResponse.member
    };
  }
}

// 원장 가입신청서
class ServerToFormAdapter {
  protected value: EnrollmentDataType;

  constructor(obj: EnrollmentDataType) {
    this.value = obj;
  }

  get getTicketType(): string[] {
    return this.value[FIELD.TICKET_TYPE].map((type) => getLabelForValue(FIELD.TICKET_TYPE, type));
  }

  get getPickDropState() {
    return getLabelForValue(FIELD.PICKDROP_STATE, this.value[FIELD.PICKDROP_STATE]);
  }
}

export class ReadModeAdapter extends ServerToFormAdapter {
  get getRequiredItemList(): Map<number, boolean> {
    return new Map(this.value[FIELD.REQUEST_ITEMS].map((itemNumber: number) => [itemNumber, true]));
  }

  adapt() {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.getTicketType,
      roundTicketNumber: this.value[FIELD.ROUND_TICKET_NUMBER],
      monthlyTicketNumber: this.value[FIELD.MONTHLY_TICKET_NUMBER],
      pickDropState: this.getPickDropState
    };
  }
}

export class EditModeAdapter extends ServerToFormAdapter {
  get getRequiredItemList(): boolean[] {
    const maxNumber = Math.max(...this.value[FIELD.REQUEST_ITEMS]);
    const itemList = new Array(maxNumber + 1).fill(false);

    this.value[FIELD.REQUEST_ITEMS].forEach((number) => {
      if (number <= maxNumber) {
        itemList[number] = true;
      }
    });

    return itemList;
  }

  get getRoundTicketNumber() {
    return this.value[FIELD.ROUND_TICKET_NUMBER].map((number) => ({ value: number }));
  }

  get getMonthlyTicketNumber() {
    return this.value[FIELD.MONTHLY_TICKET_NUMBER].map((number) => ({ value: number }));
  }

  adapt() {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.getTicketType,
      roundTicketNumber: this.getRoundTicketNumber,
      monthlyTicketNumber: this.getMonthlyTicketNumber,
      pickDropState: this.getPickDropState
    };
  }
}
