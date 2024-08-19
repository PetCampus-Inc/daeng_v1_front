import { ADMIN_SIGNUP_PATH } from "constants/path";

import { useFunnel } from "hooks/common/useFunnel";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Role } from "types/common/role.types";

import AccountSettingPage from "./AccountSettingPage";
import AdminInfoPage from "./AdminInfoPage";
import EnrollSchoolPage from "./EnrollSchoolPage";
import RoleSelectPage from "./RoleSelectPage";
import SearchSchoolPage from "./SearchSchoolPage";

export interface ITeacherInfo {
  schoolId?: number;
  schoolName?: string;
  role?: Role;
  adminId?: number;
}

const { 역할_선택, 유치원_검색, 유치원_등록, 회원정보_입력, 계정설정 } = ADMIN_SIGNUP_PATH;

const AdminSignUpFunnel = () => {
  const navigate = useNavigate();

  const [Funnel, state, setState] = useFunnel(
    [역할_선택, 유치원_검색, 유치원_등록, 회원정보_입력, 계정설정] as const,
    {
      initialStep: 역할_선택,
      stepQueryKey: "step"
    }
  ).withState<{
    role?: Partial<Role>;
    teacherInfo?: ITeacherInfo;
  }>({});

  // 역할 선택 처리
  const handleRoleSelection = (role: Role) => {
    setState((prev) => ({
      ...prev,
      role: role,
      step: role === Role.ROLE_TEACHER ? 유치원_검색 : 회원정보_입력
    }));
  };

  // 회원 정보 입력 단계 처리
  const handleAdminInfoStep = () => {
    if (state.role === Role.ROLE_TEACHER) {
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
    if (state.role === Role.ROLE_TEACHER) {
      navigate(`/approval?type=admin&schoolName=${data.schoolName}&status=pending`, {
        replace: true
      });
    } else {
      setState((prev) => ({
        ...prev,
        step: 유치원_등록
      }));
    }
  };

  const handleRegisterSchool = (schoolName: string) => {
    console.log(schoolName);
    navigate(`/approval?type=admin&schoolName=${schoolName}&status=register`, {
      replace: true
    });
  };

  useEffect(() => {
    // 새로고침 시 초기 스텝으로 이동
    navigate(`?step=${역할_선택}`, { replace: true });
  }, [navigate]);

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  // 역할 선택 페이지 role: ROLE_TEACHER -> 유치원 검색 페이지 -> 회원정보 입력 페이지 -> 계정 설정 페이지 -> 승인 상태 페이지(최종)
  // 역할 선택 페이지 role: ROLE_OWNER -> 회원정보 입력 페이지 -> 계정 설정 페이지 -> 유치원 등록 페이지 -> 유치원 등록 완료 페아지(최종)

  return (
    <FormProvider {...methods}>
      <Funnel>
        <Funnel.Step name={역할_선택}>
          <RoleSelectPage onNextStep={handleRoleSelection} />
        </Funnel.Step>
        {/* role: TEACHER인 경우 */}
        <Funnel.Step name={유치원_검색}>
          <SearchSchoolPage
            type={Role.ROLE_TEACHER}
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
        {/* role: OWNER인 경우 */}
        <Funnel.Step name={유치원_등록}>
          <EnrollSchoolPage onNextStep={handleRegisterSchool} />
        </Funnel.Step>
      </Funnel>
    </FormProvider>
  );
};

export default AdminSignUpFunnel;
