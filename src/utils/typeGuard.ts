import { Role } from "../types/admin/admin.type";

export function isAdmin(role: unknown): role is Role {
  return role === Role.ROLE_TEACHER || role === Role.ROLE_OWNER;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
