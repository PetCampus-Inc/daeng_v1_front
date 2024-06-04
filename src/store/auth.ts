import type { AdminAuthType } from "types/admin/admin.type";

export const LOCAL_STORAGE_KEY = "KNOCK-DOG-STORAGE";
export const ACCESS_TOKEN_KEY = "KNOCK-DOG-AUTH-TOKEN";
export const AUTH_KEY = "KNOCK-DOG-AUTH";
export const AUTH_MEMBER_ID = "KNOCK-DOG-MEMBER-ID";
export const AUTH_DOG_IDS = "KNOCK-DOG-DOG-IDS";

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const hasToken = () => {
  return getAccessToken() !== null;
};

export const getUserInfo = (): AdminAuthType | null => {
  const token = getAccessToken();
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const parsedJson = JSON.parse(jsonPayload);
    return {
      adminId: parsedJson.adminId,
      adminName: parsedJson.adminName,
      schoolId: parsedJson.schoolId,
      schoolName: parsedJson.schoolName,
      role: parsedJson.role
    };
  }
  return null;
};
