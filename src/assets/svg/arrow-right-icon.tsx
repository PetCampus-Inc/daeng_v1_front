import { themeConfig } from "styles/themeConfig";

import type { IconProps } from "./types";

const ArrowRightIcon = ({ size = 24, color = "darkBlack" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill={themeConfig.colors[color]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3661 23.2761C11.8543 23.7643 12.6458 23.7642 13.1339 23.2761L20.198 16.212C20.2004 16.2097 20.2028 16.2073 20.2052 16.2049C20.6933 15.7167 20.6933 14.9253 20.2052 14.4371L13.1341 7.36606C12.646 6.87791 11.8545 6.87791 11.3663 7.36606C10.8782 7.85422 10.8782 8.64567 11.3663 9.13383L17.5535 15.321L11.3662 21.5083C10.878 21.9965 10.878 22.7879 11.3661 23.2761Z"
      />
    </svg>
  );
};

export default ArrowRightIcon;
