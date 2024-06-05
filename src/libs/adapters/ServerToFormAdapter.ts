import { AGREEMENT_ITEM } from "constants/item";

import { getLabelForValue } from "utils/formatter";

import type { MemberFormData, TPickDropState } from "types/admin/enrollment.types";
import type { EnrollmentDataType, EnrollmentFormDataType } from "types/member/enrollment.types";

// 가입신청서 폼 조회
// case1. (견주) 가입신청서 폼 조회, case2. (원장) 가입 신청서 폼 조회
export class EnrollmentFormAdapter {
  private value: EnrollmentDataType;

  constructor(obj: EnrollmentDataType) {
    this.value = obj;
  }

  get getRequiredItemList(): Map<number, boolean> {
    return new Map(this.value.requiredItemList.map((itemNumber: number) => [itemNumber, true]));
  }

  get ticketType() {
    return this.value.ticketType.map((type) => getLabelForValue("ticketType", type));
  }

  adapt(): EnrollmentFormDataType {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.ticketType
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
      this.value.schoolFormResponse.requiredItemList.map((itemNumber: number) => [itemNumber, true])
    );
  }

  // get pickDropState() {
  //   return getLabelForValue("pickDropState", this.value.schoolFormResponse.pickDropState);
  // }

  get enrollmentTicketType(): string {
    return getLabelForValue("ticketType", this.value.enrollmentTicketType);
  }

  get ticketType(): string[] {
    return this.value.schoolFormResponse.ticketType.map((type) =>
      getLabelForValue("ticketType", type)
    );
  }

  get year() {
    return this.value.dogBirthDate[0];
  }

  get month() {
    return this.value.dogBirthDate[1];
  }

  get day() {
    return this.value.dogBirthDate[2];
  }

  get pickDropRequest() {
    return getLabelForValue("pickDropRequest", this.value.pickDropRequest);
  }

  get pickDropType() {
    return getLabelForValue("pickDropType", this.value.pickDropType);
  }

  get memberGender() {
    return getLabelForValue("memberGender", this.value.memberGender);
  }

  get dogGender(): string {
    return getLabelForValue("dogGender", this.value.dogGender);
  }

  get dogSize(): string {
    return getLabelForValue("dogSize", this.value.dogSize);
  }

  get neutralization(): string {
    return getLabelForValue("neutralization", this.value.neutralization);
  }

  get vaccination(): string {
    return getLabelForValue("vaccination", this.value.vaccination);
  }

  get agreementsList() {
    const result: { [key: string]: boolean } = {};
    this.value.agreements.forEach((id) => {
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
      enrollmentTicketType: this.enrollmentTicketType,
      pickDropRequest: this.pickDropRequest,
      pickDropType: this.pickDropType,
      memberGender: this.memberGender,
      dogGender: this.dogGender,
      dogSize: this.dogSize,
      neutralization: this.neutralization,
      vaccination: this.vaccination,
      agreements: this.agreementsList,
      year: this.year,
      month: this.month,
      day: this.day,
      requiredItemList: this.getRequiredItemList,
      schoolFormId: this.value.schoolFormResponse.schoolFormId,
      schoolFormName: this.value.schoolFormResponse.schoolFormName,
      priceInfo: this.value.schoolFormResponse.priceInfo,
      roundTicketNumber: this.value.schoolFormResponse.roundTicketNumber,
      openDays: this.value.schoolFormResponse.openDays,
      monthlyTicketNumber: this.value.schoolFormResponse.monthlyTicketNumber,
      ticketType: this.ticketType,
      ticketInfo: this.value.schoolFormResponse.ticketInfo,
      limitsInfo: this.value.schoolFormResponse.limitsInfo,
      accidentInfo: this.value.schoolFormResponse.accidentInfo,
      abandonmentInfo: this.value.schoolFormResponse.abandonmentInfo,
      pickDropNotice: this.value.schoolFormResponse.pickDropNotice,
      pickDropInfo: this.value.schoolFormResponse.pickDropInfo,
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

  get ticketType(): string[] {
    return this.value.ticketType.map((type) => getLabelForValue("ticketType", type));
  }

  get pickDropState() {
    return getLabelForValue("pickDropState", this.value.pickDropState) as TPickDropState;
  }
}

export class ReadModeAdapter extends ServerToFormAdapter {
  get getRequiredItemList(): Map<number, boolean> {
    return new Map(this.value.requiredItemList.map((itemNumber: number) => [itemNumber, true]));
  }

  adapt() {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.ticketType,
      roundTicketNumber: this.value.roundTicketNumber,
      monthlyTicketNumber: this.value.monthlyTicketNumber,
      pickDropState: this.pickDropState
    };
  }
}

export class EditModeAdapter extends ServerToFormAdapter {
  get getRequiredItemList(): boolean[] {
    const maxNumber = Math.max(...this.value.requiredItemList);
    const itemList = new Array(maxNumber + 1).fill(false);

    this.value.requiredItemList.forEach((number) => {
      if (number <= maxNumber) {
        itemList[number] = true;
      }
    });

    return itemList;
  }

  get roundTicketNumber() {
    return this.value.roundTicketNumber.map((number) => ({ value: number }));
  }

  get monthlyTicketNumber() {
    return this.value.monthlyTicketNumber.map((number) => ({ value: number }));
  }

  adapt() {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList,
      ticketType: this.ticketType,
      roundTicketNumber: this.roundTicketNumber,
      monthlyTicketNumber: this.monthlyTicketNumber,
      pickDropState: this.pickDropState
    };
  }
}
