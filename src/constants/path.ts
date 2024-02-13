export const PATH = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: "/signIn",
  SIGNUP: "/signUp",
  ADMIN: "/admin",
  ADMIN_ATTENDANCE: "/admin/attendance",
  ADMIN_ATTEND_CARE: "/admin/attendCare",
  ADMIN_DOG_INFO: "/admin/dogInfo",
  ADMIN_SCHOOL_MANAGE: "/admin/schoolManage",
  ADMIN_SCHOOL_MANAGE_ENROLLMENT: "/admin/schoolManage/enrollment",
  OWNER: "/owner",
  OWNER_MA: "/owner/membershipApplication",
  REDIRECT: "/auth/:provider"
} as const;
