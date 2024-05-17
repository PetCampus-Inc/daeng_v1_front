import { AGREEMENT_ITEM } from "constants/item";

import { getMapValue } from "utils/formatter";

import type {
  MemberFormData,
  IResponseAdminForm,
  TPickDropState
} from "types/admin/enrollment.types";

// 대기 중 견주 가입 신청서 조회
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

  get pickDropState() {
    return getMapValue(
      "pickDropState",
      this.value.schoolFormResponse.pickDropState
    ) as TPickDropState;
  }

  get enrollmentTicketType() {
    return getMapValue("ticketType", this.value.enrollmentTicketType);
  }

  get ticketType() {
    return this.value.schoolFormResponse.ticketType.map((type) => getMapValue("ticketType", type));
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
    return getMapValue("pickDropRequest", this.value.pickDropRequest);
  }

  get pickDropType() {
    return getMapValue("pickDropType", this.value.pickDropType);
  }

  get memberGender() {
    return getMapValue("memberGender", this.value.memberGender);
  }

  get dogGender() {
    return getMapValue("dogGender", this.value.dogGender);
  }

  get dogSize() {
    return getMapValue("dogSize", this.value.dogSize);
  }

  get neutralization() {
    return getMapValue("neutralization", this.value.neutralization);
  }

  get vaccination() {
    return getMapValue("vaccination", this.value.vaccination);
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
      pickDropState: this.pickDropState,
      pickDropNotice: this.value.schoolFormResponse.pickDropNotice,
      pickDropInfo: this.value.schoolFormResponse.pickDropInfo,
      member: this.value.schoolFormResponse.member
    };
  }
}

// 원장 가입신청서
class ServerToFormAdapter {
  protected value: IResponseAdminForm;

  constructor(obj: IResponseAdminForm) {
    this.value = obj;
  }

  get ticketType(): string[] {
    return this.value.ticketType.map((type) => getMapValue("ticketType", type));
  }

  get pickDropState() {
    return getMapValue("pickDropState", this.value.pickDropState) as TPickDropState;
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
