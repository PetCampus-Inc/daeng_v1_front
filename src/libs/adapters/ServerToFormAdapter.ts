import { AGREEMENT_ITEM, AgreementsListType, FIELD } from "constants/field";

import { NewTicketData, TicketDetailData } from "types/admin/attendance.type";
import { getPadString } from "utils/date";

import { DataFormatAdapter } from "./Adapter";
import { type BeFieldType, type FeFieldType, type FieldKey } from "./adaptor";

import type { MemberFormData } from "types/admin/enrollment.types";
import type {
  EnrollmentDataType,
  EnrollmentFormDataType,
  DogEnrollmentInfo
} from "types/member/enrollment.types";
import type { MemberDogInfoData, MemberDogInfoFormData } from "types/member/main.types";

/* -------------------------------------------------------------------------- */
/*                                견주 가입신청서                                 */
/* -------------------------------------------------------------------------- */
abstract class MemberFormBase<T extends Record<string, any>, U> extends DataFormatAdapter<T> {
  constructor(value: T) {
    super(value);
  }

  abstract adapt(): U;

  /** 필드 배열 값을 라벨 배열로 변환하는 함수 */
  protected getFieldLabels<K extends FieldKey>(field: K, key?: keyof T): FeFieldType<K>[] {
    const beValues: BeFieldType<K>[] = key ? this.value[key] : this.value[field];
    if (Array.isArray(beValues)) {
      return beValues.map((beValue) => this.convertBe2Fe(field, beValue));
    }
    return [];
  }

  /** requiredItemList를 반환하는 함수 */
  protected getRequiredItemList(items: number[]): Map<number, boolean> {
    return new Map(items.map((itemNumber: number) => [itemNumber, true]));
  }
}

/** 견주 가입신청서 조회 어댑터 */
export class MemberForm2FeAdapter extends MemberFormBase<
  EnrollmentDataType,
  EnrollmentFormDataType
> {
  adapt(): EnrollmentFormDataType {
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList(this.value[FIELD.REQUEST_ITEMS]),
      ticketType: this.getFieldLabels(FIELD.TICKET_TYPE)
    };
  }
}

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

/** 견주 가입신청서 조회 어댑터 */
export class MemberForm2FeForAdminAdapter extends MemberFormBase<
  MemberFormData,
  MemberFormAdaptedType
> {
  /** schoolForm의 ticketType을 변환하는 함수 */
  private getEnrollmentFieldLabel(): string {
    const beValue = this.value[FIELD.ENROLLMENT_TICKET_TYPE];
    return this.convertBe2Fe(FIELD.TICKET_TYPE, beValue as BeFieldType<typeof FIELD.TICKET_TYPE>);
  }

  /** 약관 동의 리스트를 반환하는 함수 */
  private get agreementsList() {
    const result: { [key: string]: boolean } = {};
    this.value[FIELD.AGREEMENTS].forEach((id) => {
      const key = Array.from(AGREEMENT_ITEM.entries()).find(([_, value]) => value === id)?.[0];
      if (key) {
        result[key] = true;
      }
    });
    return result;
  }

  adapt(): MemberFormAdaptedType {
    const mappedData = this.toFrontend();
    const [year, month, day] = this.value[FIELD.BIRTHDAY];

    return {
      ...this.value,
      ...this.value.schoolFormResponse,
      enrollmentTicketType: this.getEnrollmentFieldLabel(),
      pickDropRequest: mappedData[FIELD.PICKDROP_REQUEST],
      pickDropType: mappedData[FIELD.PICKDROP_TYPE],
      memberGender: mappedData[FIELD.MEMBER_GENDER],
      dogGender: mappedData[FIELD.DOG_GENDER],
      dogSize: mappedData[FIELD.DOG_SIZE],
      neutralization: mappedData[FIELD.NEUTRALIZATION],
      vaccination: mappedData[FIELD.VACCINATION],
      agreements: this.agreementsList,
      year,
      month,
      day,
      requiredItemList: this.getRequiredItemList(
        this.value.schoolFormResponse[FIELD.REQUEST_ITEMS]
      ),
      openDays: this.value.schoolFormResponse.openDays,
      roundTicketNumber: this.value.schoolFormResponse.roundTicketNumber,
      monthlyTicketNumber: this.value.schoolFormResponse.monthlyTicketNumber
    };
  }
}

export type DogFormType = Omit<
  DogEnrollmentInfo,
  "requiredItemList" | "pickDropRequest" | "pickDropType"
> & {
  requiredItemList: Map<number, boolean>;
  ticketType: string;
  pickDropRequest: string;
  pickDropType: string;
};

/** 강아지 정보 어댑터 */
export class DogInfoFormAdapter extends MemberFormBase<MemberDogInfoData, MemberDogInfoFormData> {
  // TODO: requiredItem 받고 있는지 확인

  adapt() {
    const mappedData = this.toFrontend();

    return {
      ...this.value,
      dogGender: mappedData[FIELD.DOG_GENDER],
      dogSize: mappedData[FIELD.DOG_SIZE],
      neutralization: mappedData[FIELD.NEUTRALIZATION]
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               유치원 가입신청서                                 */
/* -------------------------------------------------------------------------- */
abstract class SchoolFormBase<T extends Record<string, any>, U> extends DataFormatAdapter<T> {
  constructor(value: T) {
    super(value);
  }

  abstract adapt(): U;

  /** 필드 배열 값을 라벨 배열로 변환하는 함수 */
  protected getFieldLabels<K extends FieldKey>(field: K, key?: keyof T): FeFieldType<K>[] {
    const beValues = key ? this.value[key] : this.value[field];
    if (Array.isArray(beValues)) {
      return beValues.map((beValue: FieldKey) =>
        this.convertBe2Fe(field, beValue as BeFieldType<K>)
      );
    }
    return [];
  }

  /** requiredItemList를 반환하는 함수 */
  protected getRequiredItemList(field: keyof T): Map<number, boolean> {
    const items = this.value[field];
    if (Array.isArray(items)) {
      return new Map(items.map((itemNumber: number) => [itemNumber, true]));
    }
    return new Map();
  }
}

export type SchoolFormReadType = Omit<
  EnrollmentDataType,
  "requiredItemList" | "pickDropState" | "roundTicketNumber" | "monthlyTicketNumber" | "ticketType"
> & {
  requiredItemList: Map<number, boolean>;
  pickDropState: string;
  ticketType: string[];
  roundTicketNumber: number[];
  monthlyTicketNumber: number[];
};

/** 유치원 가입신청서 조회 어댑터 */
export class SchoolFormDetailAdapter extends SchoolFormBase<
  EnrollmentDataType,
  SchoolFormReadType
> {
  adapt() {
    const mappedData = this.toFrontend();
    return {
      ...this.value,
      requiredItemList: this.getRequiredItemList(FIELD.REQUEST_ITEMS),
      ticketType: this.getFieldLabels(FIELD.TICKET_TYPE),
      pickDropState: mappedData[FIELD.PICKDROP_STATE]
    };
  }
}

export type SchoolFormEditType = Omit<
  EnrollmentDataType,
  "requiredItemList" | "pickDropState" | "roundTicketNumber" | "monthlyTicketNumber" | "ticketType"
> & {
  requiredItemList: boolean[];
  pickDropState: string;
  ticketType: string[];
  roundTicketNumber: {
    value: number;
  }[];
  monthlyTicketNumber: {
    value: number;
  }[];
};

/** 유치원 가입신청서 편집 어댑터 */
export class EditSchoolFormAdapter extends SchoolFormBase<EnrollmentDataType, SchoolFormEditType> {
  /** requiredItemList를 boolean 배열로 반환하는 함수 */
  private get requiredItemList(): boolean[] {
    const totalItems = Math.max(...this.value[FIELD.REQUEST_ITEMS]);
    const itemList = new Array(totalItems + 1).fill(false);
    this.value[FIELD.REQUEST_ITEMS].forEach((field) => {
      if (field <= totalItems) {
        itemList[field] = true;
      }
    });
    return itemList;
  }

  /** 티켓 번호를 객체 배열로 반환하는 함수 */
  private getTicketNumberObjects(
    field: typeof FIELD.ROUND_TICKET_NUMBER | typeof FIELD.MONTHLY_TICKET_NUMBER
  ): { value: number }[] {
    return this.value[field].map((number) => ({ value: number }));
  }

  adapt() {
    const mappedData = this.toFrontend();

    return {
      ...this.value,
      requiredItemList: this.requiredItemList,
      ticketType: this.getFieldLabels(FIELD.TICKET_TYPE),
      roundTicketNumber: this.getTicketNumberObjects(FIELD.ROUND_TICKET_NUMBER),
      monthlyTicketNumber: this.getTicketNumberObjects(FIELD.MONTHLY_TICKET_NUMBER),
      pickDropState: mappedData[FIELD.PICKDROP_STATE]
    };
  }
}

export interface NewTicketFormType {
  ticketType: string[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
}

/** 이용권 갱신 어댑터 */
export class NewTicketFormAdapter extends MemberFormBase<NewTicketData, NewTicketFormType> {
  adapt() {
    return {
      ...this.value,
      ticketType: this.getFieldLabels(FIELD.TICKET_TYPE)
    };
  }
}

type TicketDetailFormType = {
  ticketType: string;
  monthlyTicketNumber: string;
  roundTicketNumber: string;
  attendanceDays: string[];
  year: string;
  month: string;
  day: string;
};

/** 기존 이용권 정보 어댑터 */
export class TicketDetailFormAdapter extends MemberFormBase<
  TicketDetailData,
  TicketDetailFormType
> {
  adapt() {
    const mappedData = this.toFrontend();
    const currentDate = new Date();

    return {
      ticketType: mappedData[FIELD.TICKET_TYPE],
      monthlyTicketNumber: this.value[FIELD.MONTHLY_TICKET_NUMBER] + "주",
      roundTicketNumber: this.value.allRoundTicket + "회",
      attendanceDays: this.value[FIELD.ATTENDANCE_DAYS] ?? [],
      year: currentDate.getFullYear().toString(),
      month: getPadString(currentDate.getMonth() + 1),
      day: getPadString(currentDate.getDate())
    };
  }
}
