import { IMemberProfileInfo } from "./member/home.types";

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
