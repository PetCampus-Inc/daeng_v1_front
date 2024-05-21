const ADMIN = "admin";
const LOGIN = "login";
const SIGNUP = "signup";

export const SIGNUP_PATH = {
  유치원_검색: "search" as const,
  가입신청서_작성: "form" as const,
  승인상태: "approval" as const
};

export const ADMIN_SIGNUP_PATH = {
  역할_선택: "role" as const,
  유치원_검색: "search" as const,
  유치원_등록: "enroll" as const,
  회원정보_입력: "info" as const,
  계정설정: "setup" as const,
  승인상태: "approval" as const,
  유치원_등록완료: "complete" as const
};

export const ADMIN_CREATE_FORM_PATH = {
  가입신청서_생성: "form" as const,
  가입신청서_제출: "submit" as const
};

export const ADMIN_EDIT_FORM_PATH = {
  가입신청서_수정: "edit" as const,
  가입신청서_제출: "submit" as const
};

const PRIVATE_PATH = {
  ADMIN: `${ADMIN}`,
  ADMIN_LOGIN: `/${ADMIN}/${LOGIN}`,
  ADMIN_SIGNUP: `/${ADMIN}/${SIGNUP}`,
  ADMIN_SIGNUP_APPROVAL_STATUS: `/${ADMIN}/${SIGNUP}?step=${ADMIN_SIGNUP_PATH.승인상태}`,
  ADMIN_ATTENDANCE: `/${ADMIN}/attendance`, // 출석부
  ADMIN_ATTENDANCE_INFO: (dogId?: string) => `/${ADMIN}/attendance/${dogId ?? ":dogId"}`, // 출석부 강아지 상세정보
  ADMIN_ATTENDANCE_INFO_GALLERY: (dogId?: string) =>
    `/${ADMIN}/attendance/${dogId ?? ":dogId"}/gallery`, // 출석부 강아지 갤러리
  ADMIN_ATTENDANCE_INFO_NEW_TICKET: (dogId?: string) =>
    `/${ADMIN}/attendance/${dogId ?? ":dogId"}/new-ticket`, // 출석부 강아지 상세정보
  ADMIN_CARE: `/${ADMIN}/care`, // 오늘 관리할 강아지
  ADMIN_CARE_NOTICE: (dogId?: string) => `/${ADMIN}/care/notice/${dogId ?? ":dogId"}`, // 관리 강아지 알림장
  ADMIN_CARE_GALLERY: `/${ADMIN}/care/gallery`, // 오늘 관리할 강아지 사진앨범 전송
  ADMIN_CARE_GALLERY_SELECT: `/${ADMIN}/care/gallery/select`,
  ADMIN_CARE_INFO: (dogId?: number) => `/${ADMIN}/care/${dogId ?? ":dogId"}`, // 오늘 관리할 강아지 상세정보
  ADMIN_CARE_INFO_GALLERY: (dogId?: number) => `/${ADMIN}/care/${dogId ?? ":dogId"}/gallery`, // 오늘 관리할 강아지 사진앨범 전송
  ADMIN_CHAT: `/${ADMIN}/chat`, // 채팅

  ADMIN_SCHOOL_MANAGE: `/${ADMIN}/school`, // 유치원 운영
  ADMIN_TEACHER_MANAGE: `/${ADMIN}/school/teacher`, // 선생님 관리

  ADMIN_ENROLLMENT: `/${ADMIN}/school/enrollment`, // 원장 신규가입 관리
  ADMIN_MEMBER_FORM: (formId?: string) =>
    `/${ADMIN}/school/enrollment/member-forms/${formId ?? ":formId"}`, // 견주 가입신청서 상세 조회
  ADMIN_FORMS: `/${ADMIN}/school/enrollment/owner-forms`, // 원장 가입신청서 목록
  ADMIN_FORM: (formId?: number) => `/${ADMIN}/school/enrollment/owner-forms/${formId ?? ":formId"}`, // 원장 가입신청서 상세 조회
  ADMIN_EDIT_FORM: (formId?: string) =>
    `/${ADMIN}/school/enrollment/owner-forms/${formId ?? ":formId"}/edit`, // 원장 가입신청서 수정
  ADMIN_CREATE_FORM: `/${ADMIN}/school/enrollment/new`, // 원장 가입신청서 등록
  ADMIN_SUBMIT_FORM: `/${ADMIN}/school/enrollment/submit`, // 견주 가입신청서 제출

  ADMIN_MY_PAGE: `/${ADMIN}/mypage`,
  ADMIN_MY_PAGE_EDIT: `/${ADMIN}/mypage/profile/edit`,
  ADMIN_MY_SCHOOL_INFO: `/${ADMIN}/mypage/school`,
  ADMIN_MY_SCHOOL_INFO_EDIT: `/${ADMIN}/mypage/school/edit`
};

const PUBLIC_PATH = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: `/${LOGIN}`,
  SIGNUP: `/${SIGNUP}`,
  REDIRECT: "/login/oauth2/code/:provider", // 소셜 로그인 리다이렉트
  UNREGISTER: "/unregister", // 회원탈퇴 페이지
  UNREGISTER_SUCCESS: "/unregister/success", // 회원탈퇴 성공 페이지
  SETTING: "/setting", // 설정 페이지
  SETTING_NOTIFICATION: "/setting/notification", // 알림 설정 페이지
  POLICY: "/policy", // 정책 페이지
  ENROLL: "/enrollment", // 견주 가입신청서

  MEMBER_MY_PAGE: (memberId?: string) => `/mypage/${memberId ?? ":memberId"}`,
  MEMBER_MY_INFO_PAGE: (memberId?: string) => `/mypage/${memberId ?? ":memberId"}/profile`,
  MEMBER_MY_INFO_EDIT_PAGE: (memberId?: string) =>
    `/mypage/${memberId ?? ":memberId"}/profile/edit`,
  MEMBER_MY_SCHOOL_INFO: (dogId?: string) => `/mypage/${dogId ?? ":dogId"}/school`,
  MEMBER_MY_SCHOOL_SEARCH: (memberId?: string) =>
    `/mypage/${memberId ?? ":memberId"}/dog/school/search`, // 견주 유치원 검색
  MEMBER_MY_ENROLLMENT: (memberId?: string) => `/mypage/${memberId ?? ":memberId"}/dog/enrollment`, // 강아지 추가
  MEMBER_DOG_INFO_PAGE: (dogId?: string) => `/dogInfo/${dogId ?? ":dogId"}`, // 강아지 상세정보
  MEMBER_DOG_INFO_EDITE_PAGE: (dogId?: string) => `/dogInfo/${dogId ?? ":dogId"}/edite`, // 강아지 가입정보 수정
  MEMBER_DOG_ENROLLMENT_INFO_PAGE: (dogId?: string) =>
    `/dogInfo/${dogId ?? ":dogId"}/enrollment/detail` // 강아지 가입신청서 보기 (read only)
};

export const PATH = {
  ...PRIVATE_PATH,
  ...PUBLIC_PATH
} as const;
