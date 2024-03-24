export const PATH = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: "/signIn",
  SIGNUP: "/signUp",
  ADMIN: "/admin",
  ADMIN_ATTENDANCE: "/admin/attendance", // 출석부
  ADMIN_ATTENDANCE_INFO: (dogId?: string) => `/admin/attendance/${dogId ?? ":dogId"}`, // 출석부 강아지 상세정보
  ADMIN_CARE_DOG: "/admin/attendCare", // 오늘 관리할 강아지
  ADMIN_CHAT: "/admin/chat", // 채팅
  ADMIN_SCHOOL_MANAGE: "/admin/schoolManage", // 유치원 운영
  ADMIN_ENROLLMENT: "/admin/schoolManage/enrollment", // 원장 신규가입 관리
  ADMIN_FORMS: "/admin/schoolManage/enrollment/list", // 원장 가입신청서 목록
  ADMIN_FORM: (formId?: string) => `/admin/schoolManage/enrollment/list/${formId ?? ":formId"}`, // 원장 가입신청서 상세 조회
  ADMIN_EDIT_FORM: (formId?: string) =>
    `/admin/schoolManage/enrollment/list/${formId ?? ":formId"}/edit`, // 원장 가입신청서 수정
  ADMIN_CREATE_FORM: "/admin/schoolManage/enrollment/enrollment-new", // 원장 가입신청서 등록
  ADMIN_SUBMIT_FORM: "/admin/schoolManage/enrollment/submit", // 원장 가입신청서 제출
  ADMIN_TEACHER_MANAGE: "/admin/schoolManage/teacher", // 선생님 관리
  ADMIN_MY_PAGE: "/admin/myPage", // 마이페이지
  OWNER: "/owner",
  OWNER_MA: "/owner/membershipApplication", // 견주 가입신청서
  REDIRECT: "/auth/:provider"
} as const;
