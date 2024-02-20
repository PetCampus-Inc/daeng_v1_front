import { formatDate, extractNumber } from "utils/formatter";
import type { IRequestEnrollment, TPickDropRequest, TTicketType } from "types/School.type";
import { ITEM_MAP, type ItemMapValue } from "constants/item";

export class EnrollmentFormTransformer {
  private formData: any;

  constructor(formData: any) {
    this.formData = formData;
  }

  public getMapValue(key: string): string | ItemMapValue {
    if (ITEM_MAP.has(key)) {
      return ITEM_MAP.get(key) as string | ItemMapValue;
    }
    return "";
  }

  public transformMemberGender(): string {
    return this.getMapValue(this.formData.memberGender) as string;
  }

  public transformDogGender(): string {
    return this.getMapValue(this.formData.dogGender) as string;
  }

  public transformDogSize(): string {
    return this.getMapValue(this.formData.dogSize) as string;
  }

  public transformNeutralization(): string {
    return (this.getMapValue(this.formData.neutralization) as ItemMapValue)
      .neutralization as string;
  }

  public transformVaccination(): string {
    return (this.getMapValue(this.formData.vaccination) as ItemMapValue).vaccination as string;
  }

  public transformTicketType(): TTicketType {
    return this.getMapValue(this.formData.ticketType) as TTicketType;
  }

  public transformPickDropRequest(): TPickDropRequest {
    return this.getMapValue(this.formData.pickDropRequest) as TPickDropRequest;
  }

  public transformPickDropType(): string {
    return this.getMapValue(this.formData.pickDropType) as string;
  }

  public transform(): IRequestEnrollment {
    return {
      schoolFormId: this.formData.schoolFormId || "1",
      memberId: this.formData.memberGenderId || "2",
      memberName: this.formData.memberName,
      memberGender: this.transformMemberGender(),
      address: [this.formData.address.street, this.formData.address.detail]
        .filter(Boolean)
        .join(" "),
      phoneNumber: this.formData.phoneNumber,
      emergencyNumber: this.formData.emergencyNumber || "",
      dogName: this.formData.dogName,
      breedId: this.formData.breedId,
      newBreed: this.formData.breedId ? "" : this.formData.newBreed,
      dogGender: this.transformDogGender(),
      dogSize: this.transformDogSize(),
      birthDate: formatDate(this.formData.year, this.formData.month, this.formData.day),
      neutralization: this.transformNeutralization(),
      vaccination: this.transformVaccination(),
      fileUrl: this.formData.fileUrl || "",
      allergyDisease: this.formData.allergyDisease,
      ticketType: this.transformTicketType(),
      monthlyTicketNumber: extractNumber(this.formData.monthlyTicketNumber),
      roundTicketNumber: extractNumber(this.formData.roundTicketNumber),
      openDays: this.formData.openDays,
      pickDropRequest: this.transformPickDropRequest(),
      pickDropType: this.transformPickDropType(),
      pickDropMemo: this.formData.pickDropMemo || ""
    };
  }
}
