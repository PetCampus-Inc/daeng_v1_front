import type { Nullable } from "./helper.type";

export type TAdminLoginInfo = {
  adminId: number;
  adminName: string;
  schoolId: number;
  role: "ROLE_OWNER" | "ROLE_TEACHER";
  schoolName: Nullable<string>;
};
