import { addWeeks } from "date-fns";
import { type TicketDetailData } from "types/admin/attendance.type";
import { TicketType } from "types/member/enrollment.types";

interface RenewalCalculator {
  calculateRenewal(info: TicketDetailData): TicketDetailData;
}

class NewRoundTicket implements RenewalCalculator {
  calculateRenewal(info: TicketDetailData): TicketDetailData {
    const today = new Date();
    return {
      ...info,
      ticketStartDate: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
      currentRoundTicket: info.allRoundTicket,
      ticketExpirationDate: null
    };
  }
}

class NewMonthlyTicket implements RenewalCalculator {
  calculateRenewal(info: TicketDetailData): TicketDetailData {
    const today = new Date();
    const futureDate = addWeeks(today, info.monthlyTicketNumber);
    return {
      ...info,
      ticketStartDate: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
      ticketExpirationDate: [
        futureDate.getFullYear(),
        futureDate.getMonth() + 1,
        futureDate.getDate()
      ]
    };
  }
}

const renewalCalculators: Record<TicketType, RenewalCalculator> = {
  [TicketType.ROUND]: new NewRoundTicket(),
  [TicketType.MONTHLY]: new NewMonthlyTicket()
};

export function calculateRenewal(currentData: TicketDetailData): TicketDetailData {
  const calculator = renewalCalculators[currentData.ticketType];

  if (!calculator) {
    throw new Error("Invalid ticket type");
  }
  return calculator.calculateRenewal(currentData);
}
