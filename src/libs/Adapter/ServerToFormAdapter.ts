import { getMapValue } from "utils/formatter";
import type { IAdminEnrollment } from "types/School.type";

export class ServerToFormAdapter {
  private value: IAdminEnrollment;

  constructor(obj: IAdminEnrollment) {
    this.value = obj;
  }

  get requiredItemList(): boolean[] {
    const maxNumber = Math.max(...this.value.requiredItemList);
    const itemList = new Array(maxNumber + 1).fill(false);

    this.value.requiredItemList.forEach((number) => {
      if (number <= maxNumber) {
        itemList[number] = true;
      }
    });

    return itemList;
  }

  get ticketType(): string[] {
    return this.value.ticketType.map((type) => getMapValue("ticketType", type));
  }

  get pickDropState(): string {
    return getMapValue("pickDropState", this.value.pickDropState);
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
      requiredItemList: this.requiredItemList,
      ticketType: this.ticketType,
      roundTicketNumber: this.roundTicketNumber,
      monthlyTicketNumber: this.monthlyTicketNumber,
      pickDropState: this.pickDropState
    };
  }
}
