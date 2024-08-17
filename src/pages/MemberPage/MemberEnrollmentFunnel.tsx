import { MEMBER_ENROLLMENT_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";
import MemberDogCreateEnrollmentPage from "pages/EnrollmentPage/MemberDogCreateEnrollmentPage";
import MemberSchoolReEnrollmentPage from "pages/EnrollmentPage/MemberSchoolReEnrollmentPage";
import SearchSchoolPage from "pages/SignUpPage/SearchSchoolPage";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dogIdState } from "store/member";

const MemberEnrollmentFunnel = () => {
  const dogId = useRecoilValue(dogIdState);
  const { 유치원_검색, 가입신청서_작성 } = MEMBER_ENROLLMENT_PATH;
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
          type="MEMBER"
          onNextStep={(schoolId) =>
            setState((prev) => ({ ...prev, step: 가입신청서_작성, schoolId }))
          }
        />
      </Funnel.Step>
      <Funnel.Step name={가입신청서_작성}>
        <Suspense>
          {dogId ? (
            // 유치원 재가입
            <MemberSchoolReEnrollmentPage schoolId={state.schoolId} dogId={dogId} />
          ) : (
            // 강아지 추가
            <MemberDogCreateEnrollmentPage schoolId={state.schoolId} />
          )}
        </Suspense>
      </Funnel.Step>
    </Funnel>
  );
};

export default MemberEnrollmentFunnel;
