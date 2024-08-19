import { themeConfig } from "styles/themeConfig";
import { POOP_STATUS, type PoopStatus } from "types/member/dogs";

const PoopHard = ({ poop }: { poop?: PoopStatus }) => {
  const isSelected = poop === POOP_STATUS.HARD;

  return (
    <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="60"
        height="62"
        rx="8"
        fill={isSelected ? themeConfig.colors.yellow_3 : "#F6F6F6"}
      />
      <path
        d="M30.5 14L44.7894 22.25V38.75L30.5 47L16.2106 38.75V22.25L30.5 14Z"
        fill={isSelected ? themeConfig.colors.primaryColor : "#E9E9E9"}
      />
    </svg>
  );
};

export default PoopHard;
