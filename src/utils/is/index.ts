/* eslint-disable @typescript-eslint/no-explicit-any */

import { Role } from "types/common/role.types";
import { ApprovalStatus } from "types/common/status.types";

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

interface CustomError {
  status: number;
  data: {
    status: number;
    message: string;
    code: string;
  };
}

export function isCustomError(error: any): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.status === "number" &&
    typeof error.data === "object" &&
    error.data !== null &&
    typeof error.data.status === "number" &&
    typeof error.data.message === "string" &&
    typeof error.data.code === "string"
  );
}
