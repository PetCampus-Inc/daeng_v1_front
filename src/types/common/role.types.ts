import { ApprovalStatus } from "types/common/status.types";

/**
 * 유저 타입
 * - ADMIN: 관리자
 * - MEMBER: 견주
 */
export const User = {
  /** 관리자 */
  ADMIN: "ADMIN",
  /** 견주 */
  MEMBER: "MEMBER"
} as const;
export type User = (typeof User)[keyof typeof User];

/**
 * 멤버 역할 타입
 * - ROLE_MEMBER: 회원
 * - ROLE_ANONYMOUS: 비회원
 * - WITHDRAWN: 탈퇴
 */
export const MemberRole = {
  /** 가입이 승인 된 사용자 */
  ROLE_MEMBER: "ROLE_MEMBER",
  /** 가입이 승인되지 않은 최초 사용자 */
  ROLE_ANONYMOUS: "ROLE_ANONYMOUS",
  /** 탈퇴한 사용자 */
  WITHDRAWN: "WITHDRAWN"
} as const;
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];

/**
 * 관리자 역할 타입
 * - ROLE_OWNER: 원장님
 * - ROLE_TEACHER: 선생님
 * - WITHDRAWN: 탈퇴
 */
export const AdminRole = {
  /** 원장님 */
  ROLE_OWNER: "ROLE_OWNER",
  /** 선생님 */
  ROLE_TEACHER: "ROLE_TEACHER",
  /** 탈퇴한 사용자 */
  WITHDRAWN: "WITHDRAWN"
} as const;
export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

/**
 * 사용자 역할 및 승인 상태 타입
 * - MemberRole: 회원 상태
 * - AdminRole: 관리자 상태
 * - ApprovalStatus: 승인 상태
 */
export const Role = {
  ROLE_GUEST: "ROLE_GUEST",
  ...MemberRole,
  ...AdminRole,
  ...ApprovalStatus
} as const;
export type Role = (typeof Role)[keyof typeof Role];
