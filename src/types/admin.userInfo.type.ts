import type { Nullable } from "./helper.type";

export type TRole = "ROLE_OWNER" | "ROLE_TEACHER";

export type TAdminLoginInfo = {
  adminId: number;
  adminName: string;
  schoolId: number;
  role: TRole;
  schoolName: Nullable<string>;
};
