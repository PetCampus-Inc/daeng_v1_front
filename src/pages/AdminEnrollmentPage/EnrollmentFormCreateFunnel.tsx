import { ADMIN_CREATE_ENROLLMENT_FORM_STEP } from "constants/step";

import { useFunnel } from "hooks/common/useFunnel";

const EnrollmentFormCreateFunnel = () => {
  const { 가입신청서_생성, 가입신청서_제출 } = ADMIN_CREATE_ENROLLMENT_FORM_STEP;
  const funnelSteps = [가입신청서_생성, 가입신청서_제출] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 가입신청서_생성,
    stepQueryKey: "step"
  }).withState<{
    schoolId?: number;
  }>({});

  return <div>EnrollmentFormCreateFunnel</div>;
};

export default EnrollmentFormCreateFunnel;
