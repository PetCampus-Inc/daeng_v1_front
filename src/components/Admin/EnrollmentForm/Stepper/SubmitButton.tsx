import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { enrollmentFormAtom } from "store/form";
import { Adapter } from "libs/Adapter";
import { FormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import ButtonModal from "components/common/ButtonModal";
import { PATH } from "constants/path";

import type { IRequestAdminEnrollment } from "types/School.type";
import * as S from "./styles";
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
    if (!isValid) setIsModalOpen(true);

    const requestData = Adapter.from(data).to<FieldValues, IRequestAdminEnrollment>((item) =>
      new FormToServerAdapter(item).adapt()
    );

    console.log(requestData);

    setEnrollmentForm(requestData);
    navigate(PATH.ADMIN_SUBMIT_FORM);
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
