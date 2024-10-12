import { IconProps } from "assets/svg/types";
import { themeConfig } from "styles/themeConfig";
import { ColorKeys } from "styles/types";

interface PlayIconProps extends IconProps {
  circle?: boolean;
}

const PlayIcon = ({ w = 20, h = 20, color = "gray_2", circle = true }: PlayIconProps) => {
  const themeColor = themeConfig.colors[color as ColorKeys] || color;

  return (
    <svg width={w} height={h} viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        {circle && <circle cx="40" cy="40.5" r="40" fill="#f7f7f7" />}
        <path
          d="M54 37.0359C56.6667 38.5755 56.6667 42.4245 54 43.9641L36 54.3564C33.3333 55.896 30 53.9715 30 50.8923L30 30.1077C30 27.0285 33.3333 25.104 36 26.6436L54 37.0359Z"
          fill={themeColor}
        />
      </g>
    </svg>
  );
};

export default PlayIcon;
