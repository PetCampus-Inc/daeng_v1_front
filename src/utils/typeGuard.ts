import { TRole } from "types/admin.userInfo.type";

export function isTRole(role: any): role is TRole {
  return role === "ROLE_OWNER" || role === "ROLE_TEACHER";
}

export function isNumber(value: any): value is number {
  return typeof value === "number";
}
