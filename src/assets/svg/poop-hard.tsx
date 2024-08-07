import { themeConfig } from "styles/themeConfig";
import { Poop } from "types/admin/attendance.type";

const PoopHard = ({ poop }: { poop?: Poop }) => {
  const isSelected = poop && poop === Poop.HARD;

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
