import { extractTicketValues, reverseMapValue } from "utils/formatter";

import type { FieldValues } from "react-hook-form";
import type { IRequestAdminEnrollment } from "types/School.type";

export class FormToServerAdapter {
  private value: FieldValues;

  constructor(obj: FieldValues) {
    this.value = obj;
  }

  get requiredItemList(): number[] {
    return Object.entries(this.value.requiredItemList)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key, 10));
  }

  get ticketType(): string[] {
    return this.value.ticketType?.map((type: string) => reverseMapValue("ticketType", type)) ?? [];
  }

  get pickDropState(): string {
    return reverseMapValue("pickDropState", this.value.pickDropState);
  }

  get roundTicketNumber() {
    return extractTicketValues(this.value.roundTicketNumber);
  }

  get monthlyTicketNumber() {
    return extractTicketValues(this.value.monthlyTicketNumber);
  }

  adapt(): IRequestAdminEnrollment {
    return {
      schoolId: 3,
      adminId: 2,
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
      requiredItemList: this.requiredItemList,
      roundTicketNumber: this.roundTicketNumber,
      monthlyTicketNumber: this.monthlyTicketNumber,
      pickDropState: this.pickDropState
    };
  }
}
