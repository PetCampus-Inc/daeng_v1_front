export const PATH = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: "/signIn",
  SIGNUP: "/signUp",
  ADMIN: "/admin",
  ADMIN_ATTENDANCE: "/admin/attendance", // 출석부
  ADMIN_ATTEND_CARE: "/admin/attendCare", // 오늘 관리할 강아지 (TODO: 얼마나 바뀌었는지 파악하기)
  ADMIN_DOG_INFO: "/admin/dogInfo", // 강아지 상세정보 (TODO: 어디 사용되는건지 파악하기)
  ADMIN_CHAT: "admin/chat", // 채팅
  ADMIN_SCHOOL_MANAGE: "/admin/schoolManage", // 유치원 운영
  ADMIN_FORMS: "/admin/schoolManage/enrollment/list", // 원장 가입신청서 목록
  ADMIN_FORM: (formId: string) => `/admin/schoolManage/enrollment/list/${formId}`, // 원장 가입신청서 상세 조회
  ADMIN_EDIT_FORM: (formId: string) => `/admin/schoolManage/enrollment/list/${formId}/edit`, // 원장 가입신청서 수정
  ADMIN_CREATE_FORM: "/admin/schoolManage/enrollment/enrollment-new", // 원장 가입신청서 등록
  ADMIN_MY_PAGE: "/admin/myPage", // 마이페이지
  OWNER: "/owner",
  OWNER_MA: "/owner/membershipApplication", // 견주 가입신청서
  REDIRECT: "/auth/:provider"
} as const;
