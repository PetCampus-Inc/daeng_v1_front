/**
 * 견주 마이페이지에서 사용되는 localStorage key를 관리합니다.
 */
export const STORAGE_KEY = {
  VISIT_MYPAGE: "VISIT-MYPAGE"
};

/**
 * 견주 마이페이지 강아지 상태를 표시합니다.
 */
export const DOG_STATUS = {
  ENROLLED: "ENROLLED", // 등록
  APPROVAL_PENDING: "APPROVAL_PENDING", // 승인 대기
  APPROVAL_CANCEL: "APPROVAL_CANCEL", // 승인 취소
  APPROVAL_DENIED: "APPROVAL_DENIED", // 승인 거부
  DIS_CONNECTED: "DIS_CONNECTED", // 유치원 연결 끊김(견주가 끊을 경우)
  DROP_OUT: "DROP_OUT" // 유치원 연결 끊김(관리자가 끊을 경우)
};
