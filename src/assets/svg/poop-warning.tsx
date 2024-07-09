import { ThemeConfig } from "styles/ThemeConfig";
import { PoopType } from "types/admin/attendance.type";

const PoopWarning = ({ poop }: { poop?: PoopType }) => {
  const isSelected = poop && poop === PoopType.WARNING;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? ThemeConfig.colors.yellow_3 : "#E9E9E9"}
      />
      <rect
        x="46.5"
        y="26.2852"
        width="9.42857"
        height="31"
        rx="2"
        transform="rotate(90 46.5 26.2852)"
        fill={isSelected ? ThemeConfig.colors.red_1 : "#B5B5B5"}
      />
      <rect
        x="35.8672"
        y="46"
        width="9.74286"
        height="30"
        rx="2"
        transform="rotate(-180 35.8672 46)"
        fill={isSelected ? ThemeConfig.colors.red_1 : "#B5B5B5"}
      />
    </svg>
  );
};

export default PoopWarning;
