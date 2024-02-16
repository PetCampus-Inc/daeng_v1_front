import { useFormContext } from "react-hook-form";

import { useSetRecoilState } from "recoil";
import { enrollmentFormAtom } from "store/form";

import { extractTicketValues, getMapValue } from "utils/formatter";
import { useNavigate } from "react-router-dom";
import { PATH } from "constants/path";

import type { IRequestForm, TPickDropState, TTicketType } from "types/School.type";
import * as S from "./styles";
import ButtonModal from "components/common/ButtonModal";
import { useState } from "react";
interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
}

const SubmitButton = ({ type }: SubmitButtonProps) => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext();
  const setEnrollmentForm = useSetRecoilState(enrollmentFormAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const onSubmit = handleSubmit((data) => {
    console.log(isValid);
    if (!isValid) setIsModalOpen(true);

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
      ticketType: [getMapValue(data.ticketType) as TTicketType],
      roundTicketNumber: roundTicketNumbers,
      openDays: data.openDays || [],
      monthlyTicketNumber: monthlyTicketNumbers,
      ticketInfo: data.ticketInfo || "",
      limitsInfo: data.limitsInfo || "",
      accidentInfo: data.accidentInfo || "",
      abandonmentInfo: data.abandonmentInfo || "",
      pickDropState: getMapValue(data.pickDropState) as TPickDropState,
      pickDropInfo: data.pickDropInfo || "",
      pickDropNotice: data.pickDropNotice || ""
    };

    setEnrollmentForm(requestData);
    navigate(PATH.ADMIN_CREATE_FORM + "/submit");
  });

  return (
    <>
      {isModalOpen && (
        <ButtonModal
          maintext="가입신청서를 완성해 주세요"
          subtext="선택 입력으로 변경하거나 내용을 입력해 주세요"
          closebutton="닫기"
          actionbutton="돌아가기"
          closefunc={() => setIsModalOpen(false)}
          actionfunc={() => setIsModalOpen(false)}
        />
      )}
      <S.Button type="submit" onClick={onSubmit} aria-label="제출하기" disabled={!isValid}>
        {text}
      </S.Button>
    </>
  );
};

export default SubmitButton;
