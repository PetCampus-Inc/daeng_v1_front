import { themeConfig } from "styles/themeConfig";

import { IconProps } from "./types";

const SubtractBIcon = ({ size = 18, color = "current" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill={themeConfig.colors[color]}
      stroke={themeConfig.colors[color]}
    >
      <path d="M4.25 8.78906H12.3462H4.25Z" />
      <path
        d="M4.25 8.78906H12.3462"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SubtractBIcon;
