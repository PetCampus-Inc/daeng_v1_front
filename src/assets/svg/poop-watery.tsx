import { ThemeConfig } from "styles/ThemeConfig";
import { PoopType } from "types/admin/attendance.type";

const PoopWatery = ({ poop }: { poop?: PoopType }) => {
  const isSelected = poop && poop === PoopType.WATERY;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? ThemeConfig.colors.yellow_3 : "#E9E9E9"}
      />
      <path
        d="M42.7594 34.8095C42.7594 41.5421 37.4949 47 31.0008 47C24.5067 47 19.2422 41.5421 19.2422 34.8095C19.2422 28.0769 28.0612 17.2857 31.0008 15C33.9405 17.2857 42.7594 28.0769 42.7594 34.8095Z"
        fill={isSelected ? ThemeConfig.colors.primaryColor : "#B5B5B5"}
      />
    </svg>
  );
};

export default PoopWatery;
