import { SIGNUP_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";
import { Suspense } from "react";

import ApprovalStatusPage from "./ApprovalStatusPage";
import SearchSchoolPage from "./SearchSchoolPage";
import EnrollmentPage from "../EnrollmentPage/NewEnrollmentPage";

// TODO: schoolId를 로컬스토리지에 저장하고 EnrollmentPage에서 사용하도록 수정하기
const SignUpFunnel = () => {
  const { 유치원_검색, 가입신청서_작성, 승인상태 } = SIGNUP_PATH;
  const funnelSteps = [유치원_검색, 가입신청서_작성, 승인상태] as const;

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
      <Funnel.Step name={승인상태}>
        <Suspense>
          <ApprovalStatusPage />
        </Suspense>
      </Funnel.Step>
    </Funnel>
  );
};

export default SignUpFunnel;
