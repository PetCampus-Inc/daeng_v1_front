import { AGREEMENT_ITEM, FIELD } from "constants/field";
import { FILE_NAME } from "constants/s3File";

import { MemberDogInfoReq } from "types/member/main.types";
import { extractNumber, formatDate } from "utils/formatter";
import { isNumber } from "utils/is";

import { DataFormatAdapter } from "./Adapter";
import { FIELD_MAPPING } from "./adaptor";

import type { FieldValues } from "react-hook-form";
import type { NewTicketReq } from "types/admin/attendance.type";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { EnrollmentInfoType } from "types/member/enrollment.types";

/* -------------------------------------------------------------------------- */
/*                                견주 가입신청서                                 */
/* -------------------------------------------------------------------------- */
abstract class MemberFormBase<T extends FieldValues> extends DataFormatAdapter<T> {
  constructor(value: T) {
    super(value);
  }

  /** breedId와 newBreed 정보를 반환하는 함수 */
  protected get breedInfo(): { breedId: number; newBreed: string } {
    // breedId가 존재하면 breedId를 그대로 사용하고, newBreed를 빈 문자열로 설정
    // breedId가 존재하지 않으면 breedId는 0으로, newBreed는 원래 값으로 설정
    const breedId = this.value[FIELD.BREED_ID] || 0;
    const newBreed = breedId ? "" : this.value[FIELD.NEW_BREED] || "";
    return { breedId, newBreed };
  }

  /** 티켓 갯수를 반환하는 함수 */
  protected getTicketNumber(type: "ROUND" | "MONTHLY"): number {
    const fieldName = type === "ROUND" ? FIELD.ROUND_TICKET_NUMBER : FIELD.MONTHLY_TICKET_NUMBER;

    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_MAPPING[FIELD.TICKET_TYPE][type])) {
      return 0;
    }

    return parseInt(this.value[fieldName]);
  }

  /** 약관 동의 리스트를 반환하는 함수 */
  protected getAgreementList(fields: string[]): number[] {
    return fields
      .filter((field) => this.value[field] === true)
      .map((field) => AGREEMENT_ITEM.get(field))
      .filter(isNumber);
  }
}

/** 견주 가입신청서 등록 어댑터 */
export class CreateMemberForm2BeAdapter extends MemberFormBase<FieldValues> {
  adapt(): EnrollmentInfoType {
    const { breedId, newBreed } = this.breedInfo;
    const mappedData = this.toBackend();

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
      memberName: this.value[FIELD.MEMBER_NAME] || "",
      memberGender: mappedData[FIELD.MEMBER_GENDER] || "",
      address: this.value[FIELD.MEMBER_ADDRESS] || "",
      addressDetail: this.value[FIELD.MEMBER_ADDRESS_DETAIL] || "",
      phoneNumber: this.value[FIELD.MEMBER_PHONE] || "",
      emergencyPhoneNumber: this.value[FIELD.EMERGENCY_NUMBER] || "",
      dogName: this.value[FIELD.DOG_NAME] || "",
      breedId,
      newBreed,
      dogGender: mappedData[FIELD.DOG_GENDER] || "",
      dogSize: mappedData[FIELD.DOG_SIZE] || "",
      birthDate: formatDate(this.value.year || 0, this.value.month || 0, this.value.day || 0),
      neutralization: mappedData[FIELD.NEUTRALIZATION] || "",
      vaccination: mappedData[FIELD.VACCINATION] || "",
      vaccinationUri: this.value[FIELD.VACCINATION_URL] || [],
      allergyDisease: this.value[FIELD.ALLERGY_DISEASE] || "",
      ticketType: mappedData[FIELD.TICKET_TYPE] || "",
      monthlyTicketNumber: extractNumber(this.value[FIELD.MONTHLY_TICKET_NUMBER] || 0),
      roundTicketNumber: extractNumber(this.value[FIELD.ROUND_TICKET_NUMBER] || 0),
      attendanceDays: this.value[FIELD.OPEN_DAYS] || [],
      pickDropRequest: mappedData[FIELD.PICKDROP_REQUEST] || "",
      pickDropType: mappedData[FIELD.PICKDROP_TYPE] || "",
      pickDropMemo: this.value.pickDropMemo || "",
      agreementList: this.getAgreementList(agreementFields) || []
    };
  }
}

/** 강아지 정보 편집 어댑터 */
export class DogInfoDetail2BeAdapter extends MemberFormBase<FieldValues> {
  adapt(): MemberDogInfoReq {
    const mappedData = this.toBackend();

    return {
      dogId: this.value.dogId,
      dogName: this.value[FIELD.DOG_NAME],
      dogGender: mappedData[FIELD.DOG_GENDER],
      dogSize: mappedData[FIELD.DOG_SIZE],
      breedId: this.value[FIELD.BREED_ID] || 0,
      newBreed: this.value[FIELD.NEW_BREED] || "",
      profileUri: this.value[FILE_NAME.PROFILE_COMMON],
      birthDate: `${this.value.year}-${this.value.month}-${this.value.day}`,
      neutralization: mappedData[FIELD.NEUTRALIZATION]
    };
  }
}

/** 이용권 갱신 어댑터 */
export class NewTicketForm2BeAdapter extends MemberFormBase<FieldValues> {
  adapt(): NewTicketReq {
    const mappedData = this.toBackend();

    return {
      dogId: this.value.dogId,
      ticketType: mappedData[FIELD.TICKET_TYPE] || "",
      roundTicketNumber: this.getTicketNumber("ROUND"),
      monthlyTicketNumber: this.getTicketNumber("MONTHLY"),
      startDate: `${this.value.year}-${this.value.month}-${this.value.day}`,
      attendanceDays: this.value.attendanceDays
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               유치원 가입신청서                                 */
/* -------------------------------------------------------------------------- */
abstract class SchoolFormBase<T extends FieldValues> extends DataFormatAdapter<T> {
  constructor(value: T) {
    super(value);
  }

  private extractTicketValues(items: Record<string, string>[]): number[] {
    return items.map((item) => parseInt(item.value, 10));
  }

  /** requiredItemList 반환하는 함수 */
  protected get requiredItemList(): number[] {
    return this.value[FIELD.REQUEST_ITEMS]
      .map((item: boolean, idx: number) => (item ? idx : null))
      .filter((id: number | null): id is number => id !== null);
  }

  /** 티켓 갯수를 반환하는 함수 */
  protected getTicketNumber(type: "ROUND" | "MONTHLY"): number[] {
    const fieldName = type === "ROUND" ? FIELD.ROUND_TICKET_NUMBER : FIELD.MONTHLY_TICKET_NUMBER;

    // 선택된 티켓 유형만 갯수 추출 나머지 유형은 [0] 반환
    if (!this.value[FIELD.TICKET_TYPE].includes(FIELD_MAPPING[FIELD.TICKET_TYPE][type])) {
      return [0];
    }

    return this.extractTicketValues(this.value[fieldName]);
  }
}

/** 유치원 가입신청서 등록 어댑터 **/
export class CreateSchoolForm2BeAdapter extends SchoolFormBase<FieldValues> {
  adapt(): AdminEnrollmentInfoType {
    const mappedData = this.toBackend();

    return {
      schoolId: this.value.schoolId,
      formName: this.value.formName,
      openDays: this.value[FIELD.OPEN_DAYS] || [],
      priceInfo: this.value[FIELD.PRICE_INFO] || "",
      ticketType: mappedData[FIELD.TICKET_TYPE] || [],
      ticketInfo: this.value[FIELD.TICKET_INFO] || "",
      limitsInfo: this.value[FIELD.LIMITS_INFO] || "",
      accidentInfo: this.value[FIELD.ACCIDENT_INFO] || "",
      abandonmentInfo: this.value[FIELD.ABANDONMENT_INFO] || "",
      pickDropInfo: this.value[FIELD.PICKDROP_INFO] || "",
      pickDropNotice: this.value[FIELD.PICKDROP_NOTICE] || "",
      requiredItemList: this.requiredItemList || [],
      roundTicketNumber: this.getTicketNumber("ROUND") || [],
      monthlyTicketNumber: this.getTicketNumber("MONTHLY") || [],
      pickDropState: mappedData[FIELD.PICKDROP_STATE] || ""
    };
  }
}
