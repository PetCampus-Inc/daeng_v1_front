import { ADMIN_SIGN_UP_STEP } from "constants/step";

import { useFunnel } from "hooks/common/useFunnel";
import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import AccountSettingPage from "./AccountSettingPage";
import AdminInfoPage from "./AdminInfoPage";
import ApprovalStatusPage from "./ApprovalStatusPage";
import EnrollSchoolPage from "./EnrollSchoolPage";
import RoleSelectPage from "./RoleSelectPage";
import SchoolRegistrationCompletePage from "./SchoolRegistrationCompletePage";
import SearchSchoolPage from "./SearchSchoolPage";

export enum AdminRole {
  TEACHER = "TEACHER",
  OWNER = "OWNER"
}

const AdminSignUpFunnel = () => {
  const {
    역할_선택,
    유치원_검색,
    유치원_등록,
    회원정보_입력,
    계정설정,
    승인상태,
    유치원_등록완료
  } = ADMIN_SIGN_UP_STEP;
  const [Funnel, setStep] = useFunnel(
    [
      역할_선택,
      유치원_검색,
      유치원_등록,
      회원정보_입력,
      계정설정,
      승인상태,
      유치원_등록완료
    ] as const,
    {
      initialStep: 역할_선택,
      stepQueryKey: "step"
    }
  );

  const [role, setRole] = useState<AdminRole | null>(null);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const handleRoleSelection = (role: AdminRole) => {
    setRole(role);
    if (role === "TEACHER") {
      setStep(유치원_검색);
    } else {
      setStep(회원정보_입력);
    }
  };

  const handleAccountSettingStep = () => {
    if (role === "TEACHER") {
      setStep(승인상태);
    } else {
      setStep(유치원_등록);
    }
  };

  // 역할 선택 페이지 role: TEACHER -> 유치원 검색 페이지 -> 회원정보 입력 페이지 -> 계정 설정 페이지 -> 승인 상태 페이지(최종)
  // 역할 선택 페이지 role: OWNER -> 회원정보 입력 페이지 -> 계정 설정 페이지 -> 유치원 등록 페이지 -> 유치원 등록 완료 페아지(최종)

  return (
    <FormProvider {...methods}>
      <Funnel>
        <Funnel.Step name={역할_선택}>
          <RoleSelectPage onNextStep={handleRoleSelection} />
        </Funnel.Step>
        {/* role: TEACHER인 경우 */}
        <Funnel.Step name={유치원_검색}>
          <SearchSchoolPage type={AdminRole.TEACHER} onNextStep={() => setStep(회원정보_입력)} />
        </Funnel.Step>
        <Funnel.Step name={회원정보_입력}>
          <AdminInfoPage onNextStep={() => setStep(계정설정)} />
        </Funnel.Step>
        <Funnel.Step name={계정설정}>
          <AccountSettingPage type={role as AdminRole} onNextStep={handleAccountSettingStep} />
        </Funnel.Step>
        {/* role: TEACHER인 경우 */}
        <Funnel.Step name={승인상태}>
          <ApprovalStatusPage
            onSearchSchoolClick={() => setStep(유치원_검색)}
            onSelectRoleClick={() => setStep(역할_선택)}
          />
        </Funnel.Step>
        {/* role: OWNER인 경우 */}
        <Funnel.Step name={유치원_등록}>
          <EnrollSchoolPage onNextStep={() => setStep(유치원_등록완료)} />
        </Funnel.Step>
        <Funnel.Step name={유치원_등록완료}>
          <SchoolRegistrationCompletePage />
        </Funnel.Step>
      </Funnel>
    </FormProvider>
  );
};

export default memo(AdminSignUpFunnel);
