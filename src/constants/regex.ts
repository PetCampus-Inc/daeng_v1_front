//아이디
export const ID_REGEX = /^[a-z0-9]{6,20}$/;

// 비밀번호
export const PW_REGEX =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

// 휴대폰 번호
export const PHONE_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;

//일반 전화번호
export const SCHOOL_PHONE_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;

// 사업자 등록 번호
export const REGISTRATION_REGEX = /^\d{3}-\d{2}-\d{5}$/;

// 한글 입력
export const NAME_REGEX = /^[가-힣]{1,10}$/;
