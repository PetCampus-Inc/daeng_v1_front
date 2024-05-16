import { ADMIN_SIGN_UP_STEP } from "constants/step";

import { useFunnel } from "hooks/common/useFunnel";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import AccountSettingPage from "./AccountSettingPage";
import AdminInfoPage from "./AdminInfoPage";
import ApprovalStatusPage from "./ApprovalStatusPage";
import EnrollSchoolPage from "./EnrollSchoolPage";
import RoleSelectPage from "./RoleSelectPage";
import SchoolRegistrationCompletePage from "./SchoolRegistrationCompletePage";
import SearchSchoolPage from "./SearchSchoolPage";

import type { Role } from "types/admin/admin.type";

export enum AdminRole {
  TEACHER = "TEACHER",
  OWNER = "OWNER"
}

export interface ITeacherInfo {
  schoolId?: number;
  schoolName?: string;
  role?: Role;
  adminId?: number;
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

  const [Funnel, state, setState] = useFunnel(
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
  ).withState<{
    role?: Partial<AdminRole>;
    teacherInfo?: ITeacherInfo;
  }>({});

  // 역할 선택 처리
  const handleRoleSelection = (role: AdminRole) => {
    setState((prev) => ({
      ...prev,
      role: role,
      step: role === AdminRole.TEACHER ? 유치원_검색 : 회원정보_입력
    }));
  };

  // 회원 정보 입력 단계 처리
  const handleAdminInfoStep = () => {
    if (state.role === AdminRole.TEACHER) {
      setState((prev) => ({
        ...prev,
        step: 계정설정
      }));
    } else {
      setState((prev) => ({
        ...prev,
        step: 계정설정
      }));
    }
  };

  // 계정 설정 단계 처리
  const handleAccountSettingStep = (data: ITeacherInfo) => {
    if (state.role === AdminRole.TEACHER) {
      setState((prev) => ({
        ...prev,
        teacherInfo: {
          ...prev.teacherInfo,
          role: data.role,
          adminId: data.adminId,
          schoolName: data.schoolName
        },
        step: 승인상태
      }));
    } else {
      setState((prev) => ({
        ...prev,
        step: 유치원_등록
      }));
    }
  };

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

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
          <SearchSchoolPage
            type={AdminRole.TEACHER}
            onNextStep={(schoolId) =>
              setState((prev) => ({
                ...prev,
                step: 회원정보_입력,
                teacherInfo: { ...prev.teacherInfo, schoolId: schoolId }
              }))
            }
          />
        </Funnel.Step>
        <Funnel.Step name={회원정보_입력}>
          <AdminInfoPage onNextStep={handleAdminInfoStep} />
        </Funnel.Step>
        <Funnel.Step name={계정설정}>
          <AccountSettingPage
            type={state.role}
            info={state.teacherInfo}
            onNextStep={handleAccountSettingStep}
          />
        </Funnel.Step>
        {/* role: TEACHER인 경우 */}
        <Funnel.Step name={승인상태}>
          <ApprovalStatusPage
            info={state.teacherInfo}
            onSearchSchoolClick={() => setState((prev) => ({ ...prev, step: 유치원_검색 }))}
            onSelectRoleClick={() => setState((prev) => ({ ...prev, step: 역할_선택 }))}
          />
        </Funnel.Step>
        {/* role: OWNER인 경우 */}
        <Funnel.Step name={유치원_등록}>
          <EnrollSchoolPage
            onNextStep={() => setState((prev) => ({ ...prev, step: 유치원_등록완료 }))}
          />
        </Funnel.Step>
        <Funnel.Step name={유치원_등록완료}>
          <SchoolRegistrationCompletePage />
        </Funnel.Step>
      </Funnel>
    </FormProvider>
  );
};

export default memo(AdminSignUpFunnel);
