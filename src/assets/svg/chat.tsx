import { themeConfig } from "styles/themeConfig";

import { IconProps } from "./types";

const Chat = ({ size = 33, color = "primaryColor" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.417 15.292c0 4.28-4.776 7.751-10.667 7.751s-10.667-3.47-10.667-7.75c0-4.281 4.776-7.751 10.667-7.751s10.667 3.47 10.667 7.75"
        fill={themeConfig.colors[color]}
      />
      <path
        d="M12.364 19.568a.6.6 0 0 1 .66-.381l3.954.653a.6.6 0 0 1 .252 1.08l-5.753 4.133c-.482.346-1.12-.143-.912-.698z"
        fill={themeConfig.colors[color]}
      />
      <path
        d="M13.199 15.16a1.524 1.524 0 1 1-3.048 0 1.524 1.524 0 0 1 3.048 0m5.078 0a1.524 1.524 0 1 1-3.048 0 1.524 1.524 0 0 1 3.048 0m5.078 0a1.524 1.524 0 1 1-3.048 0 1.524 1.524 0 0 1 3.048 0"
        fill="#EEE3D9"
      />
    </svg>
  );
};

export default Chat;
