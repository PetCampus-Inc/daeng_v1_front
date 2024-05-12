import { SIGN_UP_STEP } from "constants/step";

import { useFunnel } from "hooks/common/useFunnel";
import EnrollmentPage from "pages/SignUpPage/EnrollmentPage";
import { Suspense } from "react";

import SearchSchoolPage from "./SearchSchoolPage";

const SignUpFunnel = () => {
  const { 유치원_검색, 가입신청서_작성 } = SIGN_UP_STEP;
  const funnelSteps = [유치원_검색, 가입신청서_작성] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 유치원_검색,
    stepQueryKey: "step"
  }).withState<{
    schoolId?: number;
  }>({});

  return (
    <Funnel>
      <Funnel.Step name={유치원_검색}>
        <SearchSchoolPage
          type="MEMBER"
          onNextStep={(schoolId) =>
            setState((prev) => ({ ...prev, step: 가입신청서_작성, schoolId }))
          }
        />
      </Funnel.Step>
      <Funnel.Step name={가입신청서_작성}>
        <Suspense>
          <EnrollmentPage schoolId={state.schoolId} />
        </Suspense>
      </Funnel.Step>
    </Funnel>
  );
};

export default SignUpFunnel;
