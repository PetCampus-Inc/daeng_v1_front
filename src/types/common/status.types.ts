/**
 * 승인 상태 타입
 * - APPROVAL_CANCEL: 승인 취소
 * - APPROVAL_DENIED: 승인 거부
 * - APPROVAL_PENDING: 승인 대기
 */
export const ApprovalStatus = {
  /** 승인 */
  APPROVED: "APPROVED",
  /** 승인 취소 */
  APPROVAL_CANCEL: "APPROVAL_CANCEL",
  /** 승인 거부 */
  APPROVAL_DENIED: "APPROVAL_DENIED",
  /** 승인 대기 */
  APPROVAL_PENDING: "APPROVAL_PENDING"
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

/**
 * 출석 상태 타입
 * - ATTENDED: 출석
 * - NOT_ATTENDED: 미출석
 */
export const AttendanceStatus = {
  /** 출석 */
  ATTENDED: "ATTENDED",
  /** 미출석 */
  NOT_ATTENDED: "NOT_ATTENDED"
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

/**
 * 유치원 가입 상태 타입
 * - ENROLLED: 등록
 * - DROP_OUT: 탈퇴
 */
export const EnrollmentStatus = {
  /** 유치원 등록된 상태 */
  ENROLLED: "ENROLLED",
  /** 유치원 탈퇴한 상태 */
  DROP_OUT: "DROP_OUT"
} as const;
export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];

/**
 * 알림장 상태 타입
 * - NOT_YET: 알림장 작성전
 * - COMPLETE: 알림장 전송 완료
 * - WRITING: 알림장 작성중
 */
export const AgendaStatus = {
  /** 알림장 작성전 */
  NOT_YET: "NOT_YET",
  /** 알림장 전송 완료 */
  COMPLETE: "COMPLETE",
  /** 알림장 작성중 */
  WRITING: "WRITING"
} as const;
export type AgendaStatus = (typeof AgendaStatus)[keyof typeof AgendaStatus];

/**
 * 상태 타입
 * - ApprovalStatus: 승인 상태 타입
 * - AttendanceStatus: 출석 상태 타입
 * - EnrollmentStatus: 유치원 가입 상태 타입
 * - AgendaStatus: 알림장 상태 타입
 */
export const Status = {
  ...ApprovalStatus,
  ...AttendanceStatus,
  ...EnrollmentStatus,
  ...AgendaStatus
} as const;
export type Status = (typeof Status)[keyof typeof Status];
