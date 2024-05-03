export interface ILoginInfo {
  id: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  userId: number;
}

export interface IMemberInfoEdite {
  requiredItems?: Map<number, boolean>;
  handleFocus?: () => void;
  handleBlur?: () => void;
  isFocusing?: boolean;
}
