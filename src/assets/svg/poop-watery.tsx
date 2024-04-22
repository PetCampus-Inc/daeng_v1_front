import { ThemeConfig } from "styles/ThemeConfig";
import { IPoop } from "types/admin.attendance.type";

const PoopWatery = ({ poop }: { poop?: IPoop }) => {
  const isSelected = poop && poop === "WATERY" ? true : false;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? ThemeConfig.colors.yellow_3 : "#E9E9E9"}
      />
      <circle
        cx="31"
        cy="31"
        r="15"
        fill={isSelected ? ThemeConfig.colors.primaryColor : "#B5B5B5"}
      />
    </svg>
  );
};

export default PoopWatery;
