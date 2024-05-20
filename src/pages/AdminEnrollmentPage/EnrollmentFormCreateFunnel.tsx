import { ADMIN_CREATE_FORM_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";

import EnrollmentFormCreatePage from "./EnrollmentFormCreatePage";
import EnrollmentFormSubmitPage from "./EnrollmentFormSubmitPage";

import type { AdminFormSaveType } from "types/admin/enrollment.types";

const EnrollmentFormCreateFunnel = () => {
  const { 가입신청서_생성, 가입신청서_제출 } = ADMIN_CREATE_FORM_PATH;
  const funnelSteps = [가입신청서_생성, 가입신청서_제출] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 가입신청서_생성,
    stepQueryKey: "step"
  }).withState<{
    formInfo?: AdminFormSaveType;
  }>({});

  return (
    <Funnel>
      <Funnel.Step name={가입신청서_생성}>
        <EnrollmentFormCreatePage
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

export default EnrollmentFormCreateFunnel;
