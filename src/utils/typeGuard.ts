import { Role } from "../types/admin/admin.type";

export function isTRole(role: unknown): role is Role {
  return role === "ROLE_OWNER" || role === "ROLE_TEACHER";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
