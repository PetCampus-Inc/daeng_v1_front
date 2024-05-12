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
  ADMIN_CARE_GALLERY: `/admin/care/gallery`, // 오늘 관리할 강아지 사진앨범 전송
  ADMIN_CARE_INFO: (dogId?: number) => `/admin/care/${dogId ?? ":dogId"}`, // 오늘 관리할 강아지 상세정보
  ADMIN_CARE_INFO_GALLERY: (dogId?: number) => `/admin/care/${dogId ?? ":dogId"}/gallery`, // 오늘 관리할 강아지 사진앨범 전송
  ADMIN_CHAT: "/admin/chat", // 채팅
  ADMIN_SCHOOL_MANAGE: "/admin/school", // 유치원 운영
  ADMIN_ENROLLMENT: "/admin/school/enrollment", // 원장 신규가입 관리
  ADMIN_FORMS: "/admin/school/enrollment/list", // 원장 가입신청서 목록
  ADMIN_MEMBER_FORM: (formId?: string) => `/admin/school/enrollment/${formId ?? ":formId"}`, // 견주 가입신청서 상세 조회
  ADMIN_FORM: (formId?: string) => `/admin/school/enrollment/list/${formId ?? ":formId"}`, // 원장 가입신청서 상세 조회
  ADMIN_EDIT_FORM: (formId?: string) => `/admin/school/enrollment/list/${formId ?? ":formId"}/edit`, // 원장 가입신청서 수정
  ADMIN_CREATE_FORM: "/admin/school/enrollment/new-enrollment", // 원장 가입신청서 등록
  ADMIN_SUBMIT_FORM: "/admin/school/enrollment/submit", // 원장 가입신청서 제출
  ADMIN_TEACHER_MANAGE: "/admin/school/teacher", // 선생님 관리
  ADMIN_MY_PAGE: "/admin/mypage",
  ADMIN_MY_PAGE_EDIT: "/admin/mypage/profile/edit",
  ADMIN_MY_SCHOOL_INFO: `/admin/mypage/school`,
  ADMIN_MY_SCHOOL_INFO_EDIT: `/admin/mypage/school/edit`,
  MEMBER: "/member",
  UNREGISTER: "/unregister", // 회원탈퇴 페이지
  UNREGISTER_SUCCESS: "/unregister/success", // 회원탈퇴 성공 페이지
  SETTING: "/setting", // 설정 페이지
  SETTING_NOTIFICATION: "/setting/notification", // 알림 설정 페이지
  POLICY: "/policy", // 정책 페이지
  ENROLL: "/enrollment", // 견주 가입신청서
  MEMBER_MY_PAGE: (memberId?: string) => `/mypage/${memberId ?? ":memberId"}`,
  REDIRECT: "/auth/:provider",
  MEMBER_MY_INFO_PAGE: (memberId?: string) => `/mypage/${memberId ?? ":memberId"}/profile`,
  MEMBER_MY_INFO_EDITE_PAGE: "/mypage/profile/edite",
  MEMBER_MY_SCHOOL_INFO: (dogId?: string) => `/mypage/${dogId ?? ":dogId"}/school`,
  MEMBER_MY_SCHOOL_SEARCH: "/school/search" // 견주 유치원 검색
} as const;
