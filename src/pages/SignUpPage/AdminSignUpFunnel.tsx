import { ADMIN_SIGN_UP_STEP } from "constants/step";

import { useFunnel } from "hooks/common/useFunnel";

import AccountSettingPage from "./AccountSettingPage";
import AdminInfoPage from "./AdminInfoPage";
import EnrollSchoolPage from "./EnrollSchoolPage";
import RoleSelectPage from "./RoleSelectPage";
import SearchSchoolPage from "./SearchSchoolPage";

const AdminSignUpFunnel = () => {
  const { 역할_선택, 유치원_검색, 유치원_등록, 회원정보_입력, 계정설정 } = ADMIN_SIGN_UP_STEP;
  const funnelSteps = [역할_선택, 유치원_검색, 유치원_등록, 회원정보_입력, 계정설정] as const;

  const [Funnel, setStep] = useFunnel(funnelSteps, {
    initialStep: 역할_선택,
    stepQueryKey: "step"
  });

  const handleNextStep = (role: "TEACHER" | "OWNER") => {
    if (role === "TEACHER") {
      setStep(유치원_검색);
    } else {
      setStep(회원정보_입력);
    }
  };

  // 역할 선택 페이지 role: TEACHER -> 유치원 검색 페이지 -> 회원정보 입력 페이지 -> 계정 설정 페이지
  // 역할 선택 페이지 role: OWNER -> 회원정보 입력 페이지 -> 계정 설정 페이지 -> 유치원 등록 페이지

  return (
    <Funnel>
      <Funnel.Step name={역할_선택}>
        <RoleSelectPage onNextStep={handleNextStep} />
      </Funnel.Step>
      <Funnel.Step name={유치원_검색}>
        <SearchSchoolPage type="TEACHER" onNextStep={() => setStep(회원정보_입력)} />
      </Funnel.Step>
      <Funnel.Step name={회원정보_입력}>
        <AdminInfoPage onNextStep={() => setStep(계정설정)} />
      </Funnel.Step>
      <Funnel.Step name={계정설정}>
        <AccountSettingPage onNextStep={() => setStep(유치원_등록)} />
      </Funnel.Step>
      <Funnel.Step name={유치원_등록}>
        <EnrollSchoolPage />
      </Funnel.Step>
    </Funnel>
  );
};

export default AdminSignUpFunnel;
