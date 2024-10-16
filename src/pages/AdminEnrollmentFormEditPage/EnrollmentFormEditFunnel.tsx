import { ADMIN_EDIT_FORM_PATH } from "constants/funnelPath";

import { useFunnel } from "hooks/common/useFunnel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EnrollmentFormEditPage from "./EnrollmentFormEditPage";
import EnrollmentFormSubmitPage from "../AdminEnrollmentFromSubmitPage/EnrollmentFormSubmitPage";

import type { FieldValues } from "react-hook-form";

const EnrollmentFormEditFunnel = () => {
  const { 가입신청서_수정, 가입신청서_제출 } = ADMIN_EDIT_FORM_PATH;
  const funnelSteps = [가입신청서_수정, 가입신청서_제출] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 가입신청서_수정,
    stepQueryKey: "step"
  }).withState<{
    formValue?: FieldValues;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    // 새로고침 시 초기 스텝으로 이동
    navigate(`?step=${가입신청서_수정}`, { replace: true });
  }, []);

  return (
    <Funnel>
      <Funnel.Step name={가입신청서_수정}>
        <EnrollmentFormEditPage
          formValues={state.formValue}
          onNextStep={(formValue) =>
            setState((prev) => ({
              ...prev,
              step: 가입신청서_제출,
              formValue
            }))
          }
        />
      </Funnel.Step>
      <Funnel.Step name={가입신청서_제출}>
        <EnrollmentFormSubmitPage formValue={state.formValue} />
      </Funnel.Step>
    </Funnel>
  );
};

export default EnrollmentFormEditFunnel;
