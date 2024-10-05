import {
  AGREEMENT_ITEM,
  AgreementsListType,
  FIELD,
  FieldItemKeys,
  FieldItemLabels
} from "constants/field";

import { NewTicketData, TicketDetailData } from "types/admin/attendance.type";
import { getPadString } from "utils/date";
import { getLabelForValue } from "utils/formatter";

import type { MemberFormData } from "types/admin/enrollment.types";
import type { EnrollmentDataType, EnrollmentFormDataType } from "types/member/enrollment.types";
import type { MemberDogInfoData, MemberDogInfoFormData } from "types/member/main.types";

abstract class BaseAdapter<T, U> {
  protected value: T;

  constructor(obj: T) {
    this.value = obj;
  }

  abstract adapt(): U;

  protected getLabelForValue<K extends keyof FieldItemLabels>(
    category: K,
    value: FieldItemKeys<K>
  ): string {
    return getLabelForValue(category, value) as string;
  }

  protected getFieldLabel<K extends keyof FieldItemLabels>(field: K): string {
    const value = this.value[field as unknown as keyof T];
    return this.getLabelForValue(field, value as FieldItemKeys<K>);
  }

  protected getFieldLabels<K extends keyof FieldItemLabels>(field: K, key?: keyof T): string[] {
    const value = key ? this.value[key] : this.value[field as unknown as keyof T];
    if (Array.isArray(value)) {
      return value.map((item) => this.getLabelForValue(field, item as FieldItemKeys<K>));
    }
    return [this.getLabelForValue(field, value as FieldItemKeys<K>)];
  }

  protected getRequiredItemList(field: keyof T): Map<number, boolean> {
    const items = this.value[field];
    if (Array.isArray(items)) {
      return new Map(items.map((itemNumber: number) => [itemNumber, true]));
    }
    return new Map();
  }

  protected getTicketTypes(field: keyof T): string[] {
    const types = this.value[field];
    if (Array.isArray(types)) {
      return types.map((type) =>
        this.getLabelForValue(FIELD.TICKET_TYPE, type as FieldItemKeys<typeof FIELD.TICKET_TYPE>)
      );
    }
    return [];
  }
}

// 가입신청서 폼 조회
// case1. (견주) 가입신청서 폼 조회, case2. (원장) 가입 신청서 폼 조회
export class EnrollmentFormAdapter extends BaseAdapter<EnrollmentDataType, EnrollmentFormDataType> {
  adapt(): EnrollmentFormDataType {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList(FIELD.REQUEST_ITEMS),
      ticketType: this.getTicketTypes(FIELD.TICKET_TYPE)
    };
  }
}

// (견주가 작성한) 가입 신청서 조회
type MemberFormAdaptedType = Omit<
  MemberFormData,
  | "requiredItemList"
  | "agreements"
  | "memberGender"
  | "dogGender"
  | "dogSize"
  | "neutralization"
  | "vaccination"
  | "enrollmentTicketType"
  | "pickDropRequest"
  | "pickDropType"
> & {
  requiredItemList: Map<number, boolean>;
  agreements: AgreementsListType;
  openDays: string[];
  roundTicketNumber: number[];
  monthlyTicketNumber: number[];
  memberGender: string;
  dogGender: string;
  dogSize: string;
  neutralization: string;
  vaccination: string;
  enrollmentTicketType: string;
  pickDropRequest: string;
  pickDropType: string;
  year: number;
  month: number;
  day: number;
};

export class MemberFormAdapter extends BaseAdapter<MemberFormData, MemberFormAdaptedType> {
  adapt(): MemberFormAdaptedType {
    const [year, month, day] = this.value[FIELD.BIRTHDAY];
    const adaptedData: MemberFormAdaptedType = {
      ...this.value,
      ...this.value.schoolFormResponse,
      enrollmentTicketType: this.getEnrollmentFieldLabel(
        FIELD.TICKET_TYPE,
        FIELD.ENROLLMENT_TICKET_TYPE
      ),
      pickDropRequest: this.getFieldLabel(FIELD.PICKDROP_REQUEST),
      pickDropType: this.getFieldLabel(FIELD.PICKDROP_TYPE),
      memberGender: this.getFieldLabel(FIELD.MEMBER_GENDER),
      dogGender: this.getFieldLabel(FIELD.DOG_GENDER),
      dogSize: this.getFieldLabel(FIELD.DOG_SIZE),
      neutralization: this.getFieldLabel(FIELD.NEUTRALIZATION),
      vaccination: this.getFieldLabel(FIELD.VACCINATION),
      agreements: this.getAgreementsList(),
      year,
      month,
      day,
      requiredItemList: this.getRequiredItemList(),
      openDays: this.value.schoolFormResponse.openDays,
      roundTicketNumber: this.value.schoolFormResponse.roundTicketNumber,
      monthlyTicketNumber: this.value.schoolFormResponse.monthlyTicketNumber
    };
    return adaptedData;
  }

  protected getEnrollmentFieldLabel<K extends keyof FieldItemLabels>(
    field: K,
    key: keyof MemberFormData
  ): string {
    const value = this.value[key];
    return this.getLabelForValue(field, value as FieldItemKeys<K>);
  }

  protected getRequiredItemList(): Map<number, boolean> {
    return new Map(
      this.value.schoolFormResponse[FIELD.REQUEST_ITEMS].map((itemNumber: number) => [
        itemNumber,
        true
      ])
    );
  }

  private getAgreementsList() {
    const result: { [key: string]: boolean } = {};
    this.value[FIELD.AGREEMENTS].forEach((id) => {
      const key = Array.from(AGREEMENT_ITEM.entries()).find(([_, value]) => value === id)?.[0];
      if (key) {
        result[key] = true;
      }
    });

    return result;
  }
}
/**
 * 강아지 정보 폼 어댑터
 * use case: 견주 홈 - 강아지 상세 정보 조회
 */
export class DogInfoFormAdapter extends BaseAdapter<MemberDogInfoData, MemberDogInfoFormData> {
  // MEMO: "requireItemList" 필요함
  // get getRequiredItemList(): Map<number, boolean> {
  //   return new Map(this.value[FIELD.REQUEST_ITEMS].map((itemNumber: number) => [itemNumber, true]));
  // }

  adapt(): MemberDogInfoFormData {
    return {
      ...this.value,
      dogGender: this.getFieldLabel(FIELD.DOG_GENDER),
      dogSize: this.getFieldLabel(FIELD.DOG_SIZE),
      neutralization: this.getFieldLabel(FIELD.NEUTRALIZATION)
    };
  }
}

/**
 * 원장 가입신청서
 */

abstract class AdminFormAdapter {
  protected value: EnrollmentDataType;

  constructor(obj: EnrollmentDataType) {
    this.value = obj;
  }

  get getTicketType(): string[] {
    return this.value[FIELD.TICKET_TYPE].map((type) =>
      getLabelForValue(FIELD.TICKET_TYPE, type as FieldItemKeys<typeof FIELD.TICKET_TYPE>)
    );
  }

  get getPickDropState(): string {
    return getLabelForValue(
      FIELD.PICKDROP_STATE,
      this.value[FIELD.PICKDROP_STATE] as FieldItemKeys<typeof FIELD.PICKDROP_STATE>
    );
  }
}

export class AdminFormDetailAdapter extends AdminFormAdapter {
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

export class AdminFormEditAdapter extends AdminFormAdapter {
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

/**
 * 이용권 갱신 어댑터
 */
export interface NewTicketFormType {
  ticketType: string[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
}
export class NewTicketFormAdapter extends BaseAdapter<NewTicketData, NewTicketFormType> {
  adapt() {
    return {
      ...this.value,
      ticketType: this.getFieldLabels(FIELD.TICKET_TYPE)
    };
  }
}

/**
 * (기존에 선택한) 이용권 정보 어댑터
 */
export class TicketDetailFormAdapter extends BaseAdapter<
  TicketDetailData,
  {
    ticketType: string;
    monthlyTicketNumber: string;
    roundTicketNumber: string;
    attendanceDays: string[];
    year: string;
    month: string;
    day: string;
  }
> {
  adapt() {
    const currentDate = new Date();

    return {
      ticketType: this.getFieldLabel(FIELD.TICKET_TYPE),
      monthlyTicketNumber: this.value[FIELD.MONTHLY_TICKET_NUMBER] + "주",
      roundTicketNumber: this.value.allRoundTicket + "회",
      attendanceDays: this.value[FIELD.ATTENDANCE_DAYS] ?? [],
      year: currentDate.getFullYear().toString(),
      month: getPadString(currentDate.getMonth() + 1) as string,
      day: getPadString(currentDate.getDate()) as string
    };
  }
}
