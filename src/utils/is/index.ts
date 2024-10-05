import { Role } from "types/common/role.types";
import { ApprovalStatus } from "types/common/status.types";
import { ApiErrorResponse } from "types/Response.type";

type ValidatorFunction<T> = (v: unknown) => v is T;

export const isNumber: ValidatorFunction<number> = (v): v is number => typeof v === "number";

export const isAdmin: ValidatorFunction<Role> = (v): v is Role => {
  return v === Role.ROLE_TEACHER || v === Role.ROLE_OWNER;
};

export const isMember: ValidatorFunction<Role> = (v): v is Role => {
  return v === Role.ROLE_MEMBER;
};

export const isApproval: ValidatorFunction<ApprovalStatus> = (
  value: unknown
): value is ApprovalStatus => {
  return Object.values(ApprovalStatus).includes(value as ApprovalStatus);
};

/**
 * 오브젝트가 비어있는지 확인합니다.
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * 두 객체가 같은지 확인합니다.
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const isEqual = (obj1: object, obj2: object): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * 오브젝트의 모든 값이 null또는 ""이 아닌지 확인합니다.
 * @param obj 검사할 오브젝트
 * @returns {boolean} 모든 값이 null이 아니면 true, 하나라도 null이면 false
 */
export const isNotEmptyValues = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => value !== null && value !== "");
};

/**
 * `ApiErrorResponse` 객체인지 확인합니다.
 * @param error
 * @returns {boolean}
 */
export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    "code" in error
  );
}
