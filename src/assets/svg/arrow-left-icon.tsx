import { themeConfig } from "styles/themeConfig";

import type { IconProps } from "./types";

const ArrowLeftIcon = ({ size = 24, color = "darkBlack" }: IconProps) => {
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
        d="M18.2051 7.36612C17.717 6.87796 16.9255 6.87796 16.4374 7.36612L9.37329 14.4302C9.37089 14.4326 9.3685 14.4349 9.36612 14.4373C8.87796 14.9255 8.87796 15.7169 9.36612 16.2051L16.4372 23.2761C16.9253 23.7643 17.7168 23.7643 18.205 23.2761C18.6931 22.788 18.6931 21.9965 18.205 21.5084L12.0178 15.3212L18.2051 9.13388C18.6933 8.64573 18.6933 7.85427 18.2051 7.36612Z"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
