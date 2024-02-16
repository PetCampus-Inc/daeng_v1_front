import { useFormContext } from "react-hook-form";

import { useSetRecoilState } from "recoil";
import { enrollmentFormAtom } from "store/form";

import * as S from "./styles";
import type { IRequestForm, TPickDropState, TTicketType } from "types/School.type";
import { extractTicketValues } from "utils/formatter";
import { ITEM_MAP, ItemMapValue } from "constants/item";
import { useNavigate } from "react-router-dom";
import { PATH } from "constants/path";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
}

const SubmitButton = ({ type }: SubmitButtonProps) => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext();
  const setEnrollmentForm = useSetRecoilState(enrollmentFormAtom);
  const navigate = useNavigate();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const mapValue = (key: string): string | ItemMapValue => {
    if (ITEM_MAP.has(key)) {
      return ITEM_MAP.get(key) as string | ItemMapValue;
    }
    return "";
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    const requiredFields = Object.entries(data.requiredItemList)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key, 10));

    const monthlyTicketNumbers = extractTicketValues(data.monthlyTicketNumber || []);
    const roundTicketNumbers = extractTicketValues(data.roundTicketNumber || []);

    const requestData: IRequestForm = {
      schoolId: 1,
      adminId: 2,
      formName: null,
      requiredItemList: requiredFields || [],
      priceInfo: data.priceInfo || "",
      ticketType: [mapValue(data.ticketType) as TTicketType],
      roundTicketNumber: roundTicketNumbers,
      openDays: data.openDays || [],
      monthlyTicketNumber: monthlyTicketNumbers,
      ticketInfo: data.ticketInfo || "",
      limitsInfo: data.limitsInfo || "",
      accidentInfo: data.accidentInfo || "",
      abandonmentInfo: data.abandonmentInfo || "",
      pickDropState: mapValue(data.pickDropState) as TPickDropState,
      pickDropInfo: data.pickDropInfo || "",
      pickDropNotice: data.pickDropNotice || ""
    };

    setEnrollmentForm(requestData);
    navigate(PATH.ADMIN_CREATE_FORM + "/submit");
  });

  return (
    <S.Button
      type="submit"
      onClick={onSubmit}
      aria-disabled={isValid ? "true" : undefined}
      aria-label="제출하기"
    >
      {text}
    </S.Button>
  );
};

export default SubmitButton;
