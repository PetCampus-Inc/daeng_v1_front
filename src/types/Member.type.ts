import { IMemberProfileInfo } from "./member/main.types";

export interface ILoginInfo {
  id: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  userId: number;
}

export interface IMemberInfoEdite {
  memberData: IMemberProfileInfo;
  requiredItems?: Map<number, boolean>;
  handleFocus?: () => void;
  handleBlur?: () => void;
  isFocusing?: boolean;
}
