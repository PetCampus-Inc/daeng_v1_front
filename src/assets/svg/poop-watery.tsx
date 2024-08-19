import { themeConfig } from "styles/themeConfig";
import { POOP_STATUS, type PoopStatus } from "types/member/dogs";

const PoopWatery = ({ poop }: { poop?: PoopStatus }) => {
  const isSelected = poop && poop === POOP_STATUS.WATERY;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? themeConfig.colors.yellow_3 : "#F6F6F6"}
      />
      <path
        d="M42.7594 34.8095C42.7594 41.5421 37.4949 47 31.0008 47C24.5067 47 19.2422 41.5421 19.2422 34.8095C19.2422 28.0769 28.0612 17.2857 31.0008 15C33.9405 17.2857 42.7594 28.0769 42.7594 34.8095Z"
        fill={isSelected ? themeConfig.colors.primaryColor : "#E9E9E9"}
      />
    </svg>
  );
};

export default PoopWatery;
