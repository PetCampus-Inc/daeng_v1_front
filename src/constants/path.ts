export const PATH = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_SIGNUP: "/admin/signup",
  ADMIN_ATTENDANCE: "/admin/attendance", // 출석부
  ADMIN_ATTENDANCE_INFO: (dogId?: string) => `/admin/attendance/${dogId ?? ":dogId"}`, // 출석부 강아지 상세정보
  ADMIN_ATTENDANCE_INFO_GALLERY: (dogId?: string) =>
    `/admin/attendance/${dogId ?? ":dogId"}/gallery`, // 출석부 강아지 갤러리
  ADMIN_ATTENDANCE_INFO_NEW_TICKET: (dogId?: string) =>
    `/admin/attendance/${dogId ?? ":dogId"}/newTicket`, // 출석부 강아지 상세정보
  ADMIN_CARE: "/admin/care", // 오늘 관리할 강아지
  ADMIN_CHAT: "/admin/chat", // 채팅
  ADMIN_SCHOOL_MANAGE: "/admin/school", // 유치원 운영
  ADMIN_ENROLLMENT: "/admin/school/enrollment", // 원장 신규가입 관리
  ADMIN_FORMS: "/admin/school/enrollment/list", // 원장 가입신청서 목록
  ADMIN_FORM: (formId?: string) => `/admin/school/enrollment/list/${formId ?? ":formId"}`, // 원장 가입신청서 상세 조회
  ADMIN_EDIT_FORM: (formId?: string) => `/admin/school/enrollment/list/${formId ?? ":formId"}/edit`, // 원장 가입신청서 수정
  ADMIN_CREATE_FORM: "/admin/school/enrollment/new-enrollment", // 원장 가입신청서 등록
  ADMIN_SUBMIT_FORM: "/admin/school/enrollment/submit", // 원장 가입신청서 제출
  ADMIN_TEACHER_MANAGE: "/admin/school/teacher", // 선생님 관리
  ADMIN_MY_PAGE: "/admin/mypage",
  ADMIN_MY_PAGE_EDIT: "/admin/mypage/profile/edit",
  ADMIN_MY_SCHOOL_INFO: `/admin/mypage/school`,
  ADMIN_MY_SCHOOL_INFO_EDIT: `/admin/mypage/school/edit`,
  ENROLL: "/enroll", // 견주 가입신청서
  MEMBER_MY_PAGE: "/member/myPage",
  REDIRECT: "/auth/:provider"
} as const;
