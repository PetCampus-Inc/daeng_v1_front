import { themeConfig } from "styles/themeConfig";
import { POOP_STATUS, type PoopStatus } from "types/member/dogs";

const PoopHealthy = ({ poop }: { poop?: PoopStatus }) => {
  const isSelected = poop && poop === POOP_STATUS.HEALTHY;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? themeConfig.colors.yellow_3 : "#F6F6F6"}
      />
      <circle
        cx="31"
        cy="31"
        r="15"
        fill={isSelected ? themeConfig.colors.primaryColor : "#E9E9E9"}
      />
    </svg>
  );
};

export default PoopHealthy;
