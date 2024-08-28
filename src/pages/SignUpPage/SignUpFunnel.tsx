import { SIGNUP_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MemberRole } from "types/common/role.types";

import SearchSchoolPage from "./SearchSchoolPage";
import EnrollmentPage from "../EnrollmentPage/NewEnrollmentPage";

const SignUpFunnel = () => {
  const { 유치원_검색, 가입신청서_작성 } = SIGNUP_PATH;
  const funnelSteps = [유치원_검색, 가입신청서_작성] as const;

  const [Funnel, state, setState] = useFunnel(funnelSteps, {
    initialStep: 유치원_검색,
    stepQueryKey: "step"
  }).withState<{
    schoolId?: number;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    // 새로고침 시 초기 스텝으로 이동
    navigate(`?step=${유치원_검색}`, { replace: true });
  }, [navigate]);

  return (
    <Funnel>
      <Funnel.Step name={유치원_검색}>
        <SearchSchoolPage
          type={MemberRole.ROLE_MEMBER}
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
