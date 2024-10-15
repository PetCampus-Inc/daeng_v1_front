import { themeConfig } from "styles/themeConfig";

import type { IconProps } from "./types";

const ArrowDownIcon = ({ size = 16, color = "darkBlack" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={themeConfig.colors[color]}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M12.422 5.805c.26.26.26.683 0 .943l-3.768 3.768-.003.004a.667.667 0 0 1-.943 0L3.937 6.748a.667.667 0 1 1 .942-.942l3.3 3.3 3.3-3.3c.26-.26.683-.26.943 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ArrowDownIcon;
