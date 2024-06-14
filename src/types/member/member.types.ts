import { type IMemberProfileInfo } from "./main.types";

export interface IMemberInfoEdite {
  memberData: IMemberProfileInfo;
  requiredItems?: Map<number, boolean>;
  handleFocus?: () => void;
  handleBlur?: () => void;
  isFocusing?: boolean;
}
