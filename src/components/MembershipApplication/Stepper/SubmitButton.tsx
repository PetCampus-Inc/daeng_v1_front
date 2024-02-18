import { useFormContext } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";

import * as S from "./styles";
import { EnrollmentFormTransformer } from "utils/formTransformer";

const SubmitButton = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useFormContext();

  const enrollMutation = useEnrollMutation();

  // FIXME: schoolFormId, memberId, fileUrl 추가 필요
  const onSubmit = handleSubmit((data) => {
    const transformer = new EnrollmentFormTransformer(data);
    const requestData = transformer.transform();

    console.log(requestData);
    // enrollMutation(requestData);
  });

  return (
    <>
      <S.Button type="submit" onClick={onSubmit} aria-label="제출하기">
        제출하기
      </S.Button>
    </>
  );
};

export default SubmitButton;
