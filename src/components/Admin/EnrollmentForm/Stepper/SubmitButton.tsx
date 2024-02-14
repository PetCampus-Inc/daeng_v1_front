import { useFormContext } from "react-hook-form";
import * as S from "./styles";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
}

const SubmitButton = ({ type }: SubmitButtonProps) => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  return (
    <S.Button type="submit" aria-disabled={isValid ? "true" : undefined} aria-label="제출하기">
      {text}
    </S.Button>
  );
};

export default SubmitButton;
