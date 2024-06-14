import { ThemeConfig } from "styles/ThemeConfig";
import { IPoop } from "types/admin/attendance.type";

const PoopWarning = ({ poop }: { poop?: IPoop }) => {
  const isSelected = poop && poop === "WARNING" ? true : false;

  return (
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="62"
        height="62"
        rx="8"
        fill={isSelected ? ThemeConfig.colors.yellow_3 : "#E9E9E9"}
      />
      <path
        d="M18.1307 24.0279C18.8413 23.4244 33.2635 17.049 32.8056 19.5995C32.1214 23.41 22.2081 29.1758 19.4291 31.6664C18.7201 32.3019 16.8767 34.4446 18.9673 34.0591C27.0834 32.5626 33.815 26.7839 40.2384 24.667C41.9272 24.1104 44.5826 24.3764 43.6028 25.8603C42.4347 27.6294 38.8788 30.3432 35.4833 32.5495C32.0627 34.7721 27.1242 38.8577 26.3056 41.351C25.4869 43.8443 37.5 38.4509 39.6667 37.0009"
        stroke={isSelected ? ThemeConfig.colors.red_1 : "#B5B5B5"}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PoopWarning;
