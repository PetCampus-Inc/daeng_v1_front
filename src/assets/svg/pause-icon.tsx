import { IconProps } from "assets/svg/types";

const PauseIcon = ({ w = 20, h = 20 }: IconProps) => {
  return (
    <svg width={w} height={h} viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        <circle cx="40" cy="40.5" r="40" fill="#F7F7F7" />
        <rect x="27" y="26.5" width="10" height="27" rx="2" fill="#858585" />
        <rect x="44" y="26.5" width="10" height="27" rx="2" fill="#858585" />
      </g>
    </svg>
  );
};

export default PauseIcon;
