export const SIGNUP_PATH = {
  유치원_검색: "search" as const,
  가입신청서_작성: "form" as const
};

export const MEMBER_ENROLLMENT_PATH = {
  유치원_검색: "search" as const,
  가입신청서_작성: "form" as const
};

export const ADMIN_SIGNUP_PATH = {
  역할_선택: "role" as const,
  유치원_검색: "search" as const,
  유치원_등록: "enroll" as const,
  회원정보_입력: "info" as const,
  계정설정: "setup" as const,
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
