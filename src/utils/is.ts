import { Role } from "../types/admin/admin.types";

export function isAdmin(role: unknown): role is Role {
  return role === Role.ROLE_TEACHER || role === Role.ROLE_OWNER;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

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

/**
 * @description Check if the object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};
