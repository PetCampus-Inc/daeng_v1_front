import { ADMIN_EDIT_FORM_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";

import EnrollmentFormEditPage from "./EnrollmentFormEditPage";
import EnrollmentFormSubmitPage from "./EnrollmentFormSubmitPage";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

const EnrollmentFormEditFunnel = () => {
  const { 가입신청서_수정, 가입신청서_제출 } = ADMIN_EDIT_FORM_PATH;
  const funnelSteps = [가입신청서_수정, 가입신청서_제출] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 가입신청서_수정,
    stepQueryKey: "step"
  }).withState<{
    formInfo?: AdminEnrollmentInfoType;
  }>({});

  return (
    <Funnel>
      <Funnel.Step name={가입신청서_수정}>
        <EnrollmentFormEditPage
          onNextStep={(formInfo) =>
            setState((prev) => ({
              ...prev,
              step: 가입신청서_제출,
              formInfo
            }))
          }
        />
      </Funnel.Step>
      <Funnel.Step name={가입신청서_제출}>
        <EnrollmentFormSubmitPage formInfo={state.formInfo} />
      </Funnel.Step>
    </Funnel>
  );
};

export default EnrollmentFormEditFunnel;
