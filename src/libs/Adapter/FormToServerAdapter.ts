import { AGREEMENT_ITEM, ITEM_MAPS } from "constants/item";

import { extractNumber, extractTicketValues, formatDate, reverseMapValue } from "utils/formatter";
import { isNumber } from "utils/typeGuard";

import type { FieldValues } from "react-hook-form";
import type { AdminFormSaveType, TPickDropState } from "types/admin/enrollment.types";
import type {
  IRequestEnrollment,
  TPickDropRequest,
  TTicketType
} from "types/member/enrollment.types";

export class MemberFormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  get memberGender() {
    return reverseMapValue("memberGender", this.value.memberGender);
  }

  get dogGender() {
    return reverseMapValue("dogGender", this.value.dogGender);
  }

  get dogSize() {
    return reverseMapValue("dogSize", this.value.dogSize);
  }

  get neutralization() {
    return reverseMapValue("neutralization", this.value.neutralization);
  }

  get vaccination() {
    return reverseMapValue("vaccination", this.value.vaccination);
  }

  get ticketType() {
    return reverseMapValue("ticketType", this.value.ticketType) as TTicketType;
  }

  get pickDropRequest() {
    return reverseMapValue("pickDropRequest", this.value.pickDropRequest) as TPickDropRequest;
  }

  get pickDropType() {
    return reverseMapValue("pickDropType", this.value.pickDropType);
  }

  get agreementList() {
    const item = {
      ticketInfo: this.value?.ticketInfo_agreement,
      limitsInfo: this.value?.limitsInfo_agreement,
      accidentInfo: this.value?.accidentInfo_agreement,
      abandonmentInfo: this.value?.abandonmentInfo_agreement,
      pickDropInfo: this.value?.pickDropInfo_agreement
    };

    return Object.entries(item)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => AGREEMENT_ITEM.get(key))
      .filter(isNumber);
  }

  adapt(): IRequestEnrollment {
    return {
      schoolFormId: this.value.schoolFormId,
      memberId: this.value.memberId,
      memberName: this.value.memberName || "",
      memberGender: this.memberGender || "",
      address: [this.value.address?.street, this.value.address?.detail].filter(Boolean).join(" "),
      phoneNumber: this.value.phoneNumber || "",
      emergencyNumber: this.value.emergencyNumber || "",
      dogName: this.value.dogName || "",
      breedId: this.value.breedId || 0,
      newBreed: this.value.newBreed || "",
      dogGender: this.dogGender || "",
      dogSize: this.dogSize,
      birthDate: formatDate(this.value.year || 0, this.value.month || 0, this.value.day || 0),
      neutralization: this.neutralization,
      vaccination: this.vaccination,
      fileUrl: this.value.fileUrl || "",
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

export class AdminFormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  get requiredItemList(): number[] {
    return this.value.requiredItemList
      .map((item: boolean, idx: number) => (item ? idx : null)) // true일 때 id, 아니면 null
      .filter((id: number) => id !== null);
  }

  get ticketType(): string[] {
    return this.value.ticketType.map((type: string) => reverseMapValue("ticketType", type));
  }

  get pickDropState() {
    return reverseMapValue("pickDropState", this.value.pickDropState) as TPickDropState;
  }

  get roundTicketNumber() {
    if (!this.value.ticketType.includes(ITEM_MAPS.ticketType.ROUND)) return 0;
    return extractTicketValues(this.value.roundTicketNumber);
  }

  get monthlyTicketNumber() {
    if (!this.value.ticketType.includes(ITEM_MAPS.ticketType.MONTHLY)) return 0;
    return extractTicketValues(this.value.monthlyTicketNumber);
  }

  adapt(): AdminFormSaveType {
    return {
      schoolId: this.value.schoolId,
      adminId: this.value.adminId,
      formName: null,
      openDays: this.value.openDays || [],
      priceInfo: this.value.priceInfo || "",
      ticketType: this.ticketType,
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
