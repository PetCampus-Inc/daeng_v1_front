import { PATH } from "constants/path";

import { TextInput } from "components/common";
import { useCreateAdminEnrollment } from "hooks/api/admin/enroll";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { enrollmentFormAtom } from "store/form";
import { getCurrentDate } from "utils/date";

import * as S from "./styles";

const SubmitForm = () => {
  const { handleSubmit, register } = useForm();

  const formData = useRecoilValue(enrollmentFormAtom);
  const { mutateForm } = useCreateAdminEnrollment();
  const navigate = useNavigate();

  const defaultFormName = `가입신청서_${getCurrentDate()}`;

  const onSubmit = handleSubmit((data) => {
    const formName = data.formName || defaultFormName;

    const requestData = {
      ...formData,
      formName
    };

    // FIXME: 에러 핸들링 필요
    mutateForm(requestData, {
      onSuccess: (res) => {
        navigate(PATH.ADMIN_ENROLLMENT);
      }
    });
  });

  // FIXME: floating button으로 변경해야함
  return (
    <form>
      <S.TopWrapper>
        <S.Title>가입신청서의 이름을 작성해주세요</S.Title>
        <TextInput name="formName" register={register} placeholder={defaultFormName} />
      </S.TopWrapper>
      <S.Button type="submit" onClick={onSubmit} aria-label="제출하기">
        완료
      </S.Button>
    </form>
  );
};

export default SubmitForm;
